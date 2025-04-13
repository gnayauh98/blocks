import { html, LitElement, nothing, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksLinkOverlay extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sx: 0, sy: 0, sc: 'green', sd: false }

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sx, sy, dx, dy, sc, sd } = this.attrs

        if (w - 2 <= 0 || h - 2 <= 0) {
            return html``
        }

        const dfx = w * 8 / Math.sqrt(w * w + h * h) * (dx < 0 ? -1 : 1)
        const dfy = h * 8 / Math.sqrt(w * w + h * h) * (dy < 0 ? -1 : 1)

        return html`<div data-blocks-type="blocks-rect" class="" style="border: 1px dashed blue;width: ${w + 8}px;height: ${h + 8}px;transform: translate(${x - 4}px, ${y - 4}px);display:${sd ? 'block' : 'none'}">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle style="cursor:move;" cx="${sx + 4 + dfx}" cy="${sy + 4 + dfy}" r="4" fill="blue" />
                <circle style="cursor:move;" class="move-resize" cx="${sx + 4 + dx - dfx}" cy="${sy + 4 + dy - dfy}" r="4" fill="blue" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-overlay-link': BlocksLinkOverlay
    }
}