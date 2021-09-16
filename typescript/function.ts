// 重载
function padding(all: number)

function padding(topAndBottom: number, leftAndRight: number)

function padding(top: number, right: number, bottom: number, left: number)

function padding(a: number, b?: number, c?: number, d?: number) {
    if (!b && !c && !d) {
        b = c = d = a
    } else if (!c && !d) {
        c = a
        d = b
    }
    return {
        top: a,
        right: b,
        bottom: c,
        left: d
    }
}

padding(1)
padding(1, 1)
// padding(1, 1, 1)
padding(1, 1, 1, 1)

// 可调用
interface ReturnString {
    (): string
}

declare const foo: ReturnString
const bar = foo()

// 可实例化
interface CallMeWithNewToGetString {
    new(): string
}

declare const FooClass: CallMeWithNewToGetString
const fooInstance = new FooClass()

// 函数能够选择性的忽略一些多余的参数，但是得保证有足够的参数可以使用
const iTakeSomethingAndPassItAnErr = (x: (err: Error, data: any) => void) => {

}
iTakeSomethingAndPassItAnErr(() => null)
iTakeSomethingAndPassItAnErr(err => null)
iTakeSomethingAndPassItAnErr((err, data) => null)
// 执行的时候并不会传入more，所以方法无法执行
iTakeSomethingAndPassItAnErr((err, data, more) => null)

// 双向协变
interface Events {
    timestamp: number
}

interface MouseEvent extends Events {
    readonly x: number
    readonly y: number
}

interface KeyEvent extends Events {
    keyCode: number
}

enum EventType {
    Mouse,
    Keyboard
}

function addEventListener(eventType: EventType, handler: (n: Events) => void) {
    handler({timestamp:1})
}

// 不安全
addEventListener(EventType.Mouse, (e: MouseEvent) => console.log(e.x + ',' + e.y))

// 安全
addEventListener(EventType.Mouse, (e: Events) => console.log((<MouseEvent>e).x) + ',' + (<MouseEvent>e).y)
addEventListener(EventType.Mouse, <(e: Events) => void>((e: MouseEvent) => console.log(e.x + ',' + e.y)))



// addEventListener(EventType.Mouse, (e: number) => console.log(e))

interface Point2D {
    x: number,
    y: number
}

interface Point3D {
    x: number,
    y: number,
    z: number
}

let iTakePoint2D = (point: Point2D) => {
};

let iTakePoint3D = (point: Point3D) => {
}

iTakePoint2D = iTakePoint3D
