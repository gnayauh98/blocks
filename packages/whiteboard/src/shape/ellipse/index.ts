import { html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksEllipse extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0 , dx:0,dy:0,sx:0,sy:0, sd: false}

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sd } = this.attrs

        const mx = w / 2
        const my = h / 2

        const r = mx < my ? mx : my

        if(my - 1 <= 0 || mx - 1 <= 0) {
            return html``
        }

        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w}px;height: ${h}px;transform: translate(${x}px, ${y}px);">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <ellipse cx="${mx}" cy="${my}" rx="${mx - 1}" ry="${my - 1}" stroke="${sd?'blue':'green'}"
                stroke-width="2" fill="transparent" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-shape-ellipse': BlocksEllipse
    }
}