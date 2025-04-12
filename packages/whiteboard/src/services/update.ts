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
        let shapes: Shape[]

        const reset = () => {
            startPoint = undefined
            shapes = []
        }

        return [
            (ev: MouseEvent) => {
                if (!ev.shiftKey) {
                    for (const shape of this.app.shapes) {
                        shape.attrs.sd = false
                    }
                    reset()
                }
                const _shapes = this.app.shapes.filter(shape => shape.pointInShape({ x: ev.offsetX, y: ev.offsetY }))
                if (!_shapes.length) {
                    reset()
                    return
                }
                const shape = _shapes[_shapes.length - 1]
                const isExist = shapes.some(sh => sh.id === shape.id)
                if (isExist) {
                    return
                }
                shape.attrs.sd = true
                startPoint = { x: ev.offsetX, y: ev.offsetY }
                shapes.push(shape)
                this.app.requestUpdate()
            },
            (ev: MouseEvent) => {

                if (!shapes.length || ev.buttons !== 1 || !startPoint) {
                    reset()
                    return
                }
                const { offsetX: x2, offsetY: y2 } = ev

                const dx = x2 - startPoint.x
                const dy = y2 - startPoint.y

                for (const shape of shapes) {
                    shape.attrs.x += dx
                    shape.attrs.y += dy
                }

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