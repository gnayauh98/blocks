import { html, LitElement, TemplateResult } from "lit";
import { property } from "lit/decorators.js";


export class BlocksTritangle extends LitElement {

    @property({ attribute: true, type: Object })
    attrs = { x: 0, y: 0, w: 0, h: 0 , dx:0,dy:0,sx:0,sy:0, sd:false}

    constructor() {
        super()
    }

    protected createRenderRoot(): HTMLElement | DocumentFragment {
        return this
    }

    protected render(): TemplateResult {

        let { x, y, w, h, sd } = this.attrs

        if(w - 2 <= 0 || h-1 <= 0){
            return html``
        }

        const points = `${w/2},1 1,${h-1} ${w-2},${h-1}`

        return html`<div data-blocks-type="blocks-rect" class="" style="width: ${w}px;height: ${h}px;transform: translate(${x}px, ${y}px);">
            <svg class="blocks-shape-svg-container" xmlns="http://www.w3.org/2000/svg" version="1.1">
                <polygon points="${points}" stroke="${sd?'blue':'green'}"
                stroke-width="2" fill="transparent" />
            </svg>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-shape-triangle': BlocksTritangle
    }
}