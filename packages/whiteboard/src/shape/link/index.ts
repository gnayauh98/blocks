
import { html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";
import { Point, ShapeAttrs } from "../../common/shape";


export class BlocksLink extends LitElement {

    @property({ attribute: true, type: Object })
    attrs: ShapeAttrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sc: 'green', sx: 0, sy: 0, sd: false }

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { from: startShape, to: endShape } = this.attrs

        if (!startShape || !endShape) {
            return html``
        }

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
            return html``
        }

        const { x, y, w, h, sx, sy, dy, dx, sd } = {
            x: offsetX < 0 ? endPoint.x : startPoint.x,
            y: offsetY < 0 ? endPoint.y : startPoint.y,
            w: offsetX < 0 ? -offsetX : offsetX,
            h: offsetY < 0 ? -offsetY : offsetY,
            dx: offsetX,
            dy: offsetY,
            sx: offsetX < 0 ? -offsetX : 0,
            sy: offsetY < 0 ? -offsetY : 0,
            sd: false,
        }

        const dw = [startShape.attrs.w / 2, endShape.attrs.w / 2]
        if (dx < 0) {
            dw[0] *= -1
        } else {
            dw[1] *= -1
        }



        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w + 8}px;height: ${h + 8}px;transform: translate(${x - 4}px, ${y - 4}px);">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <path d="M ${startPoint.x - x + 4 + dw[0]} ${startPoint.y - y + 4} C ${endPoint.x - x + 4 + dw[1]} ${startPoint.y - y + 4} ${startPoint.x - x + 4 + dw[0]} ${endPoint.y - y + 4} ${endPoint.x - x + dw[1] + 4} ${endPoint.y - y + 4}" stroke="${sd ? 'blue' : 'green'}"
                stroke-width="2" fill="transparent" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-shape-link': BlocksLink
    }
}