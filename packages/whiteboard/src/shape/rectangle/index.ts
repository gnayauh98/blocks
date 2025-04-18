import { html, LitElement, nothing, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksRectangle extends LitElement {

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

        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w}px;height: ${h}px;transform: translate(${x}px, ${y}px);">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <rect x="${1}" y="${1}" width="${w - 2}" height="${h - 2}" stroke="${sd ? 'blue': sc}"
                stroke-width="2" fill="transparent" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-shape-rectangle': BlocksRectangle
    }
}