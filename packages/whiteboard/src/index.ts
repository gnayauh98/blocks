import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { MouseEventService } from './events/mouse'
import { Slot } from './events/slot'
import { BlocksEllipse } from './shape/ellipse'
import { BlocksRectangle } from './shape/rectangle'
import { BlocksTritangle } from './shape/triangle'
import { BlocksLine } from './shape/line'

type Shape = 'ellipse' | 'rectangle' | 'triangle' | 'line'

export class WhiteBoard extends LitElement {

    static styles: CSSResultGroup = css`
    :host{
        display: block;
    }
    
    .blocks-root {
        width: 100%;
        height: 100%;
        position: relative;
    }

    .blocks-html-layer, .blocks-overlays-layer {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
    }

    .blocks-overlays-layer {
        user-select: none;
    }

    [data-blocks-type]{
        position: absolute;
        top: 0;
        left: 0;
    }

    .blocks-shape-svg-container {
        position: absolute;
        top: 0;
        right: 0;
        bottom: 0;
        left: 0;
        width:100%;
        height:100%;
    }

    .blocks-tools {
        position: absolute;
        right:0;
    }
    `

    @property({ attribute: false })
    size: { width: number, height: number } = { width: 100, height: 100 }

    @state()
    mouseService!: MouseEventService<MouseEvent>

    @query(".blocks-html-layer")
    blocksHtmlContainer!: HTMLDivElement

    @state()
    create_shape_type: Shape = 'rectangle'

    constructor() {
        super()

        this.mouseService = new MouseEventService(this)

        const down = (() => {

            let startEvent: MouseEvent | undefined
            let endEvent: MouseEvent | undefined

            return [(ev: MouseEvent) => {
                startEvent = ev
            }, (ev: MouseEvent) => {
                endEvent = ev

                // 处理
                if (!startEvent || !endEvent) {
                    startEvent = undefined
                    endEvent = undefined
                    return
                }

                const { offsetX: startX, offsetY: startY } = startEvent
                const { offsetX: endX, offsetY: endY } = endEvent

                if (startX === endX || startY === endY) {
                    startEvent = undefined
                    endEvent = undefined
                    return
                }

                const offsetX = endX - startX
                const offsetY = endY - startY

                console.log(offsetX, offsetY)

                // 绘图
                const rectSvg = document.createElement(`blocks-shape-${this.create_shape_type}`)
                rectSvg.attrs = {
                    x: offsetX < 0 ? endX : startX,
                    y: offsetY < 0 ? endY : startY,
                    w: offsetX < 0 ? -offsetX : offsetX,
                    h: offsetY < 0 ? -offsetY : offsetY,
                    dx: offsetX,
                    dy: offsetY,
                    sx: offsetX < 0 ? -offsetX: 0,
                    sy: offsetY < 0 ? -offsetY: 0,
                }
                this.blocksHtmlContainer.appendChild(rectSvg)

                startEvent = undefined
                endEvent = undefined
            }]
        })()
        this.mouseService.on("tets", down[0], { down: true })
        this.mouseService.on("tets", down[1], { up: true })

        this.mouseService
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.size = {
            width: this.clientWidth,
            height: this.clientHeight
        }

        this.mouseService.mount()

        this.draw()
    }

    async draw() {
        await this.updateComplete
    }

    protected firstUpdated(_changedProperties: PropertyValues): void {
        console.log("first update")
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()

        this.mouseService.unmount()
    }

    switchShape(shape: Shape) {
        this.create_shape_type = shape
    }

    protected override render(): TemplateResult {
        return html`<div data-type="blocks-root" class="blocks-root">
            <div class="blocks-html-layer">
            </div>
            <div class="blocks-overlays-layer">svg</div>
            <div class="blocks-tools">
                <button @click="${() => this.switchShape('ellipse')}">ellipse</botton>
                <button @click="${() => this.switchShape('rectangle')}">rectangle</botton>
                <button @click="${() => this.switchShape('triangle')}">triangle</botton>
                <button @click="${() => this.switchShape('line')}">line</botton>
            </div>
        </div>`
    }
}

declare global {
    interface HTMLElementTagNameMap {
        'blocks-whiteboard': WhiteBoard
    }
}

export function effects() {
    customElements.define('blocks-whiteboard', WhiteBoard)
    customElements.define('blocks-shape-ellipse', BlocksEllipse)
    customElements.define('blocks-shape-rectangle', BlocksRectangle)
    customElements.define('blocks-shape-triangle', BlocksTritangle)
    customElements.define('blocks-shape-line', BlocksLine)
}
