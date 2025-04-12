// 服务插件通用

import { type WhiteBoard } from "..";

export class Service {

    app!: WhiteBoard

    constructor(app: WhiteBoard){
        this.app = app
    }

    mount(){}

    unmount(){}
}