import { html, TemplateResult } from "lit"
import { BlocksEllipse } from "../shape/ellipse"
import { BlocksLine } from "../shape/line"
import { BlocksRectangle } from "../shape/rectangle"
import { BlocksTritangle } from "../shape/triangle"
import { BlocksRectangleOverlay } from "../shape/rectangle/overlay"
import { BlocksEllipseOverlay } from "../shape/ellipse/overlay"
import { BlocksLineOverlay } from "../shape/line/overlay"
import { BlocksTriangleOverlay } from "../shape/triangle/overlay"

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
}

export type ShapeType = 'ellipse' | 'rectangle' | 'triangle' | 'line'

export type ShapeElement = BlocksEllipse | BlocksLine | BlocksRectangle | BlocksTritangle | BlocksRectangleOverlay | BlocksEllipseOverlay | BlocksLineOverlay | BlocksTriangleOverlay

export type Point = { x: number, y: number }

export class Shape {
    id: string

    attrs = { x: 0, y: 0, w: 0, h: 0, dx: 0, dy: 0, sx: 0, sy: 0, sc: 'green', sd: false }

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