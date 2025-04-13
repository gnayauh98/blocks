
import { html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksLine extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sx: 0, sy: 0, sd:false }

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sx, sy, dy, dx, sd } = this.attrs

        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w}px;height: ${h}px;transform: translate(${x}px, ${y}px);">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <line x1="${dx < 0 ? sx - 1 : sx + 1}" y1="${dy < 0 ? sy - 1 : sy + 1}" x2="${dx < 0 ? sx + dx + 1 : sx + dx - 1}" y2="${dy < 0 ? sy + dy + 1 : sy + dy - 1}" stroke="${sd?'blue':'green'}"
                stroke-width="2" fill="transparent" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-shape-line': BlocksLine
    }
}