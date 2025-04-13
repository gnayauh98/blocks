import { html, LitElement, nothing, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksRectangleOverlay extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sx: 0, sy: 0, sc: 'green', sd: false }

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sd } = this.attrs

        if (w - 2 <= 0 || h - 2 <= 0) {
            return html``
        }

        return html`<div data-blocks-type="blocks-rect" class="" style="border: 1px dashed blue;width: ${w + 8}px;height: ${h + 8}px;transform: translate(${x - 5}px, ${y - 5}px);display:${sd ? 'block' : 'none'}">
            <svg class="blocks-shape-svg-container" style="cursor:move;" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <circle class="nw-resize" cx="12" cy="12" r="4" fill="blue" />
                <circle class="ne-resize" cx="${w - 4}" cy="12" r="4" fill="blue" />
                <circle class="se-resize" cx="${w - 4}" cy="${h - 4}" r="4" fill="blue" />
                <circle class="sw-resize" cx="12" cy="${h - 4}" r="4" fill="blue" />
                <circle style="cursor:ns-resize;" cx="${w / 2 + 3}" cy="12" r="4" fill="blue" />
                <circle style="cursor:ew-resize;" cx="${w - 4}" cy="${h / 2 + 3}" r="4" fill="blue" />
                <circle style="cursor:ns-resize;" cx="${w / 2 + 3}" cy="${h - 4}" r="4" fill="blue" />
                <circle style="cursor:ew-resize;" cx="12" cy="${h / 2 + 3}" r="4" fill="blue" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-overlay-rectangle': BlocksRectangleOverlay
    }
}