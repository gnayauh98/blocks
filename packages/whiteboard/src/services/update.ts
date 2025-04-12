import { WhiteBoard } from "..";
import { Service } from "../common/service";
import { Point, Shape } from "../common/shape";

export class UpdateShapeService extends Service {

    disposes: (() => void)[] = []

    constructor(app: WhiteBoard) {
        super(app)
    }

    run() {

        let startPoint: Point | undefined
        let shape: Shape | undefined

        const reset = () => {
            startPoint = undefined
            shape = undefined
        }

        return [
            (ev: MouseEvent) => {
                for (const shape of this.app.shapes) {
                    shape.attrs.sd = false
                }
                const shapes = this.app.shapes.filter(shape => shape.pointInShape({ x: ev.offsetX, y: ev.offsetY }))
                if (!shapes.length) {
                    reset()
                    return
                }
                shape = shapes[shapes.length - 1]
                shape.attrs.sd = true
                startPoint = { x: ev.offsetX, y: ev.offsetY }
                this.app.requestUpdate()
            },
            (ev: MouseEvent) => {

                if (!shape || ev.buttons !== 1 || !startPoint) {
                    reset()
                    return
                }
                const { offsetX: x2, offsetY: y2 } = ev

                const dx = x2 - startPoint.x
                const dy = y2 - startPoint.y

                shape.attrs.x += dx
                shape.attrs.y += dy

                startPoint = { x: x2, y: y2 }

                this.app.requestUpdate()
            }
        ]
    }

    mount(): void {
        const [down, move] = this.run()
        this.disposes.push(this.app.mouseService.on('update-shape', (ev: MouseEvent) => {
            if (!ev.ctrlKey) {
                down(ev)
            }
        }, { down: true }))

        this.disposes.push(this.app.mouseService.on('update-shape', (ev: MouseEvent) => {
            if (!ev.ctrlKey && ev.buttons === 1) {
                move(ev)
            }
        }, { move: true }))
    }

    unmount(): void {
        this.disposes.forEach(dispose => dispose())
    }
}