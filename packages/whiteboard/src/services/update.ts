import { WhiteBoard } from "..";
import { pointInShape } from "../common/function";
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
                if(this.app.selectedShapeType === 'link')return
                if (!ev.shiftKey) {
                    for (const shape of this.app.shapes) {
                        shape.attrs.sd = false
                    }
                    reset()
                }
                const shape = pointInShape({ x: ev.offsetX, y: ev.offsetY },this.app.shapes)
                if (!shape) {
                    reset()
                    return
                }
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

                if(this.app.selectedShapeType === 'link')return

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