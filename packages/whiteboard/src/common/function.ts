import { Point, Shape } from "./shape";

// 判断一个点是否在某个Shape中，并返回最上层的Shape
export function pointInShape(point: Point, shapes: Shape[]) {
    for (const shape of shapes.reverse()) {
        let isIn = false
        switch (shape.blocksType) {
            case 'rectangle':
                isIn = pointInRectangle(point, shape)
                break;
            case 'triangle':
                isIn = pointInTriangle(point, shape)
                break
            case 'ellipse':
                isIn = pointInEllipse(point, shape)
                break
            case 'line':
                isIn = pointInLine(point, shape)
                break
            default:
                isIn = false
                break;
        }
        if (isIn) return shape
    }

    return undefined
}

export function pointInRectangle(point: Point, shape: Shape) {
    const { x, y, w, h } = shape.attrs
    const { x: x1, y: y2 } = point
    if (x1 < x || x1 > x + w || y2 < y || y2 > y + h) {
        return false
    }
    return true
}

export function pointInTriangle(point: Point, shape: Shape) {
    const { x, y, w, h } = shape.attrs
    const p1: Point = { x: x + w / 2, y }
    const p2: Point = { x: x + w, y: y + h }
    const p3: Point = { x, y: y + h }

    const f1 = (p2.y - p3.y) * (point.x - p3.x) + (p3.x - p2.x) * (point.y - p3.y)
    const f2 = (p3.y - p1.y) * (point.x - p3.x) + (p1.x - p3.x) * (point.y - p3.y)
    const f3 = (p2.y - p3.y) * (p1.x - p3.x) + (p3.x - p2.x) * (p1.y - p3.y)

    const u = f1 / f3
    const v = f2 / f3
    const w1 = 1 - u - v

    if (u < 0 || v < 0 || w1 < 0) {
        return false
    }

    return true
}

export function pointInEllipse(point: Point, shape: Shape) {
    // 计算椭圆方程
    const { x, y, w, h } = shape.attrs
    const [a, b] = [w / 2, h / 2]
    const c: Point = { x: x + w / 2, y: y + h / 2 }
    const d = Math.pow(point.x - c.x, 2) / Math.pow(a, 2) + Math.pow(point.y - c.y, 2) / Math.pow(b, 2)

    if (d <= 1) {
        return true
    }
    return false
}

export function pointInLine(point: Point, shape: Shape) {
    const { x, y,w,h, sx, sy, dx, dy } = shape.attrs

    const p1: Point = { x: x + sx, y: y + sy }
    const p2: Point = { x: x + sx + dx, y: y + sy + dy }

    const tx = (point.x - p1.x) / (p2.x - p1.x)
    const ty = (point.y - p1.y) / (p2.y - p1.y)

    if (tx < 0 || tx > 1 || ty < 0 || ty > 1) {
        return false
    }

    const k = (p2.y - p1.y) / (p2.x - p1.x)

    const _y = p1.y + k * (point.x - p1.x)

    const z = Math.sqrt(w*w + h * h)

    const fy = 10 / w * z

    if (Math.abs(_y - point.y) <= fy) {
        return true
    }

    return false
}