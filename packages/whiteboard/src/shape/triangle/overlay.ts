import { html, LitElement, nothing, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksTriangleOverlay extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sx: 0, sy: 0, sc: 'green', sd: false }

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sc, sd } = this.attrs

        if (w - 2 <= 0 || h - 2 <= 0) {
            return html``
        }

        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w}px;height: ${h}px;transform: translate(${x}px, ${y}px);display:${sd?'none':'block'}">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle cx="8" cy="8" r="8" fill="blue" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-overlay-triangle': BlocksTriangleOverlay
    }
}