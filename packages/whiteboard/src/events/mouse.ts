// 定义鼠标相关事件

import { Slot, SlotHandle } from "./slot"

export class MouseEventService<T> extends Slot<T> {
    private _down: any = () => { }

    private _move: any = () => { }

    private _up: any = () => { }

    private _container: HTMLElement | undefined

    constructor(container: HTMLElement) {
        super()

        this._container = container
    }

    override on(name: string, handler: SlotHandle<T>, options: { move?: boolean, down?: boolean, up?: boolean } = { down: true }) {

        const disposes: (() => void)[] = []

        if (options.move) {
            const dispose = super.on(`${name}-move`, handler)
            disposes.push(dispose)
        }

        if (options.down) {
            const dispose = super.on(`${name}-down`, handler)
            disposes.push(dispose)
        }

        if (options.up) {
            const dispose = super.on(`${name}-up`, handler)
            disposes.push(dispose)
        }



        return () => {
            disposes.forEach(dispose => dispose())
        }
    }

    mount() {

        const that = this

        this._down = (event: MouseEvent) => {
            for (const name of that.slot.keys()) {
                if (name.endsWith('-down')) {
                    that.dispatch(name, event)
                }
            }
        }

        this._move = (event: MouseEvent) => {
            for (const name of that.slot.keys()) {
                if (name.endsWith("-move")) {
                    that.dispatch(name, event)
                }
            }
        }

        this._up = (event: MouseEvent) => {
            for (const name of that.slot.keys()) {
                if (name.endsWith("-up")) {
                    that.dispatch(name, event)
                }
            }
        }

        this._container?.addEventListener('mousedown', this._down)
        this._container?.addEventListener('mousemove', this._move)
        this._container?.addEventListener('mouseup', this._up)
    }

    unmount() {
        this._container?.addEventListener('mousedown', this._down)
        this._container?.addEventListener('mousemove', this._move)
        this._container?.addEventListener('mouseup', this._up)
    }
}