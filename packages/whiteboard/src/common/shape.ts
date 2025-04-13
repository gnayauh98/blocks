import { BlocksEllipse } from "../shape/ellipse"
import { BlocksLine } from "../shape/line"
import { BlocksRectangle } from "../shape/rectangle"
import { BlocksTritangle } from "../shape/triangle"
import { BlocksRectangleOverlay } from "../shape/rectangle/overlay"
import { BlocksEllipseOverlay } from "../shape/ellipse/overlay"
import { BlocksLineOverlay } from "../shape/line/overlay"
import { BlocksTriangleOverlay } from "../shape/triangle/overlay"
import { BlocksLink } from "../shape/link"
import { BlocksLinkOverlay } from "../shape/link/overlay"

export interface ShapeAttrs {
    x: number
    y: number
    w: number
    h: number
    dx: number
    dy: number
    sx: number
    sy: number
    sc: string
    sd: boolean
    from?: Shape
    to?: Shape
}

export type ShapeType = 'ellipse' | 'rectangle' | 'triangle' | 'line' | 'link'

export type ShapeElement = BlocksEllipse | BlocksLine | BlocksRectangle | BlocksTritangle | BlocksLink
| BlocksRectangleOverlay | BlocksEllipseOverlay | BlocksLineOverlay | BlocksTriangleOverlay | BlocksLinkOverlay

export type Point = { x: number, y: number }

export class Shape {
    id: string

    attrs: ShapeAttrs

    blocksType: ShapeType

    static createElement: (blocksType: ShapeType, attrs: ShapeAttrs) => ShapeElement
    static createOverlayElement: (blocksType: ShapeType, attrs: ShapeAttrs) => ShapeElement

    constructor(attrs: ShapeAttrs, blocksType: ShapeType) {
        // 获取当前时间作为id
        const date = new Date()

        this.id = `${date.getFullYear()}-${date.getMonth()}-${date.getDay()}-${date.getHours()}-${date.getMinutes()}-${date.getSeconds()}-${date.getTime()}`

        this.attrs = attrs
        this.blocksType = blocksType
    }

    pointInShape(point: Point) {
        const { x, y, w, h } = this.attrs
        const x2 = x + w
        const y2 = y + h

        if (x > point.x || point.x > x2 || y > point.y || point.y > y2) {
            return false
        }

        return true
    }
}

Shape.createElement = (blocksType: ShapeType, attrs: ShapeAttrs) => {
    const shape = document.createElement(`blocks-shape-${blocksType}`)
    shape.attrs = attrs

    return shape
}

Shape.createOverlayElement = (blocksType: ShapeType, attrs: ShapeAttrs) => {
    const shape = document.createElement(`blocks-overlay-${blocksType}`)
    shape.attrs = attrs

    return shape
}