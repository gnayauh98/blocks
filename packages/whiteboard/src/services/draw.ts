import { type WhiteBoard } from "..";
import { pointInShape } from "../common/function";
import { Service } from "../common/service";
import { Point, Shape } from "../common/shape";

export class InsertShapeService extends Service {

    private disposes: (() => void)[] = []

    constructor(app: WhiteBoard) {
        super(app)
    }

    draw() {
        let startEvent: MouseEvent | undefined
        let endEvent: MouseEvent | undefined
        let shape: Shape | undefined
        let startShape: Shape | undefined
        let endShape: Shape | undefined

        const reset = () => {
            startEvent = undefined
            endEvent = undefined
            shape = undefined
            startShape = undefined
            endShape = undefined
        }

        return [(ev: MouseEvent) => {
            startEvent = ev
            // 判断是否是link
            if (this.app.selectedShapeType === 'link') {
                startShape = pointInShape({ x: ev.offsetX, y: ev.offsetY }, this.app.shapes)
            }
        }, (ev: MouseEvent) => {
            endEvent = ev

            if (this.app.selectedShapeType === 'link') return

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
                sd: false,
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

            if (this.app.selectedShapeType === 'link' && startShape) {
                endShape = pointInShape({ x: ev.offsetX, y: ev.offsetY }, this.app.shapes)
                if (endShape && (startShape !== endShape)) {

                    const startPoint: Point = {
                        x: startShape.attrs.x + startShape.attrs.w / 2,
                        y: startShape.attrs.y + startShape.attrs.h / 2,
                    }

                    const endPoint: Point = {
                        x: endShape.attrs.x + endShape.attrs.w / 2,
                        y: endShape.attrs.y + endShape.attrs.h / 2,
                    }

                    const offsetX = endPoint.x - startPoint.x
                    const offsetY = endPoint.y - startPoint.y

                    if (offsetX === 0 || offsetY === 0) {
                        return
                    }

                    const attrs = {
                        x: offsetX < 0 ? endPoint.x : startPoint.x,
                        y: offsetY < 0 ? endPoint.y : startPoint.y,
                        w: offsetX < 0 ? -offsetX : offsetX,
                        h: offsetY < 0 ? -offsetY : offsetY,
                        dx: offsetX,
                        dy: offsetY,
                        sx: offsetX < 0 ? -offsetX : 0,
                        sy: offsetY < 0 ? -offsetY : 0,
                        sc: 'green',
                        sd: false,
                        from: startShape,
                        to: endShape
                    }

                    const link = new Shape(
                        attrs,
                        this.app.selectedShapeType,
                    )

                    this.app.shapes.push(link)

                    this.app.requestUpdate()
                }
            }

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