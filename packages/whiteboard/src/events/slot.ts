export type SlotHandle<T> = (params:T)=>void

export class Slot<T extends any> {
    slot: Map<string, SlotHandle<T>[]> = new Map()

    on(name: string, handler: SlotHandle<T>) {
        let handlers = this.slot.get(name)

        const _handler = (event: T) => {
            handler(event)
        }

        if (handlers) {
            handlers.push(_handler)
        }else {
            handlers = [_handler]
        }

        this.slot.set(name, handlers)

        return ()=>{
            let handlers = this.slot.get(name)!

            handlers = handlers.filter(h=> h !== _handler)

            this.slot.set(name, handlers)
        }
    }
    dispatch(name:string, event: any){
        const callbacks = this.slot.get(name)
        callbacks?.forEach((handler)=>handler(event))
    }

    // off(name: string, dispose: Function) {
    //     let handlers = this.slot.get(name)

    //     if (handlers) {
    //         handlers = handlers.filter((h) => dispose !== h)
    //         this.slot.set(name, handlers)
    //     }
    // }
}