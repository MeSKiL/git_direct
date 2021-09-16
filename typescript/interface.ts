// interface旨在声明js里所有可能的数据结构，也就意味着不是所有的都那么容易implements的
interface CrazyConstructor {
    new (): Crazy
}
interface Crazy{
    hello:number
}
declare const Crazy:CrazyConstructor
class CrazyClass implements CrazyConstructor{
    constructor() {
        return {
            hello:123
        }
    }
}
let a = new Crazy()

// 接口是开放的
interface Window {
    helloWorld(): void
}

window.helloWorld()
