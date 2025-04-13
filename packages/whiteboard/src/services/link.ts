import { WhiteBoard } from "..";
import { Service } from "../common/service";


export class InsertLinkService extends Service {

    private disposes: (() => void)[] = []

    constructor(app: WhiteBoard) {
        super(app)
    }

    run() {
        let isStart = false
        let startEvent: MouseEvent | undefined
        let endEvent: MouseEvent | undefined

        const reset = () => {
            isStart = false
        }

        return [
            (ev: MouseEvent) => {
                isStart = true
                startEvent = ev
                // 判断是否在Shape上点击的，是则创建连接，否则取消
                
            },
            (ev: MouseEvent) => { },
            (ev: MouseEvent) => { },
        ]
    }

    mount(): void {
        const [down, move, up] = this.run()

        this.disposes.push(this.app.mouseService.on('link', down, { down: true }))
        this.disposes.push(this.app.mouseService.on('link', move, { move: true }))
        this.disposes.push(this.app.mouseService.on('link', up, { up: true }))
    }

    unmount(): void {
        this.disposes.forEach((dispose) => dispose())
    }

}