import { css, CSSResultGroup, html, LitElement, PropertyValues, TemplateResult } from 'lit'
import { property, query, state } from 'lit/decorators.js'
import { repeat } from 'lit/directives/repeat.js'
import { MouseEventService } from './events/mouse'
import { Slot } from './events/slot'
import { BlocksEllipse } from './shape/ellipse'
import { BlocksRectangle } from './shape/rectangle'
import { BlocksTritangle } from './shape/triangle'
import { BlocksLine } from './shape/line'
import { InsertShapeService, UpdateShapeService } from './services'
import { Shape, ShapeType } from './common/shape'
import { BlocksRectangleOverlay } from './shape/rectangle/overlay'
import { BlocksEllipseOverlay } from './shape/ellipse/overlay'
import { BlocksTriangleOverlay } from './shape/triangle/overlay'
import { BlocksLineOverlay } from './shape/line/overlay'

export class WhiteBoard extends LitElement {

    static styles: CSSResultGroup = css`
    :host{
        display: block;
        overflow: hidden;
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

    .nw-resize {
        cursor: nw-resize;
    }

    .ne-resize {
        cursor: ne-resize;
    }

    .sw-resize {
        cursor: sw-resize;
    }

    .se-resize {
        cursor: se-resize;
    }
    `

    @property({ attribute: false })
    size: { width: number, height: number } = { width: 100, height: 100 }

    @state()
    mouseService!: MouseEventService<MouseEvent>

    insertShapeService!: InsertShapeService
    updateShapeService!: UpdateShapeService

    @query(".blocks-html-layer")
    blocksHtmlContainer!: HTMLDivElement

    @state()
    selectedShapeType: ShapeType = 'rectangle'

    @state()
    shapes: Shape[] = []

    constructor() {
        super()

        this.mouseService = new MouseEventService(this)
        this.insertShapeService = new InsertShapeService(this)
        this.updateShapeService = new UpdateShapeService(this)

        this.mouseService
    }

    connectedCallback(): void {
        super.connectedCallback()

        this.size = {
            width: this.clientWidth,
            height: this.clientHeight
        }

        this.mouseService.mount()
        this.insertShapeService.mount()
        this.updateShapeService.mount()

        this.draw()
    }

    async draw() {
        await this.updateComplete
    }

    disconnectedCallback(): void {
        super.disconnectedCallback()

        this.mouseService.unmount()
        this.insertShapeService.unmount()
        this.updateShapeService.unmount()
    }

    switchShape(shape: ShapeType) {
        this.selectedShapeType = shape
    }

    createElement(shape: Shape) {
        return Shape.createElement(shape.blocksType, shape.attrs)
    }

    createOverlayElement(shape:Shape){
        return Shape.createOverlayElement(shape.blocksType, shape.attrs)
    }

    protected override render(): TemplateResult {
        return html`<div data-type="blocks-root" class="blocks-root">
            <div class="blocks-html-layer">
                ${repeat(this.shapes, (shape) => shape.id, this.createElement)}
            </div>
            <div class="blocks-overlays-layer">
                ${repeat(this.shapes, (shape) => shape.id, this.createOverlayElement)}</div>
            <div class="blocks-tools">
                <button @click="${() => this.switchShape('ellipse')}">ellipse</botton>
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
    
    customElements.define('blocks-overlay-rectangle', BlocksRectangleOverlay)
    customElements.define('blocks-overlay-ellipse', BlocksEllipseOverlay)
    customElements.define('blocks-overlay-triangle', BlocksTriangleOverlay)
    customElements.define('blocks-overlay-line', BlocksLineOverlay)
}
