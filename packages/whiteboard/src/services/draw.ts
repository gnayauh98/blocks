import { type WhiteBoard } from "..";
import { Service } from "../common/service";
import { Shape } from "../common/shape";

export class InsertShapeService extends Service {

    private disposes: (() => void)[] = []

    constructor(app: WhiteBoard) {
        super(app)
    }

    draw() {
        let startEvent: MouseEvent | undefined
        let endEvent: MouseEvent | undefined
        let shape: Shape | undefined

        const reset = () => {
            startEvent = undefined
            endEvent = undefined
            shape = undefined
        }

        return [(ev: MouseEvent) => {
            startEvent = ev
        }, (ev: MouseEvent) => {
            endEvent = ev


            // 处理
            if (!startEvent || !endEvent) {
                reset()
                return
            }

            const { offsetX: startX, offsetY: startY } = startEvent
            const { offsetX: endX, offsetY: endY } = endEvent



            if (startX === endX && startY === endY) {
                return
            }

            const offsetX = endX - startX
            const offsetY = endY - startY

            if (offsetX === 0 || offsetY === 0) {
                return
            }

            // console.log(offsetX, offsetY, this.app.selectedShapeType)

            const attrs = {
                x: offsetX < 0 ? endX : startX,
                y: offsetY < 0 ? endY : startY,
                w: offsetX < 0 ? -offsetX : offsetX,
                h: offsetY < 0 ? -offsetY : offsetY,
                dx: offsetX,
                dy: offsetY,
                sx: offsetX < 0 ? -offsetX : 0,
                sy: offsetY < 0 ? -offsetY : 0,
                sc: 'green',
                sd: false
            }

            if (!shape) {
                shape = new Shape(attrs, this.app.selectedShapeType)
                this.app.shapes.push(shape)
            } else {
                shape.attrs = attrs
            }

            this.app.requestUpdate()

            // reset()
        }, (ev: MouseEvent) => {
            reset()
        }]
    }

    override mount(): void {
        const [down, move, up] = this.draw()
        const withModify = (fn: (ev: MouseEvent) => void) => {
            return (ev: MouseEvent) => {
                if (ev.ctrlKey) { fn(ev) }
            }
        }
        this.disposes.push(this.app.mouseService.on("draw", withModify(down), { down: true }))
        this.disposes.push(this.app.mouseService.on("draw", withModify(move), { move: true }))
        this.disposes.push(this.app.mouseService.on("draw", withModify(up), { up: true }))
    }

    unmount(): void {
        this.disposes.forEach(dispose => dispose())
    }
}