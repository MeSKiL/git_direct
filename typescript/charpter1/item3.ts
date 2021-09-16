interface Square {
    width: number
}

interface Rectangle extends Square {
    height: number
}

type Shape = Square | Rectangle

function calculateAreaFalse(shape: Shape) {
    if (shape instanceof Rectangle) {
        return shape.width * shape.height
    } else {
        return shape.width * shape.width
    }
}

function calculateAreaTrue(shape: Shape) {
    if ('height' in shape) {
        return shape.width * shape.height
    } else {
        return shape.width * shape.width
    }
}

// 标记联合
interface Square2 {
    kind: 'square'
    width: number
}

interface Rectangle2 {
    kind: 'rectangle'
    height: number
    width: number
}

type Shape2 = Square2 | Rectangle2

function calculateArea2(shape: Shape2) {
    if (shape.kind === 'rectangle') {
        return shape.width * shape.height
    } else {
        return shape.width * shape.width
    }
}

// class声明了类型和值。而接口只声明了类型。所以无法instanceof interface。而且instanceof是运行时语法，interface是typescript语法，不可用在runtime
// 类型是无法影响运行时的。
class Square3 {
    constructor(public width: number) {
    }
}

class Rectangle3 extends Square3 {
    constructor(public width: number, public height: number) {
        super(width);
    }
}

type Shape3 = Square3 | Rectangle3

function calculateArea3(shape: Shape3) {
    if (shape instanceof Rectangle3) {
        return shape.width * shape.height
    } else {
        return shape.width * shape.width
    }
}

// 类型操作不会改变运行时的值
function asNumberFalse(val: number | string): number {
    return val as number;
}

function asNumberTrue(val: number | string): number {
    return typeof val === 'string' ? Number(val) : val
}

// 无法使用函数重载
function addFalse(a: number, b: number) {
    return a + b
}

function addFalse(a: string, b: string) {
    return a + b
}

// 可以通过多个函数的类型声明，但是实现只能有一个
function addTrue(a: number, b: number): number
function addTrue(a: string, b: string): string
function addTrue(a, b) {
    return a + b
}

const three = addTrue(1, 2)
const twelve = addTrue('1', '2')

// remember
// 代码生成不依赖类型系统，也就意味着typescript不会影响代码运行时的表现和执行。
// 存在类型错误的程序也可能编译完成
// typescript的类型在运行时是不生效的，在运行时使用类型需要修复他，比如通过标记联合,属性检查，或者类似class这种既有类型又有值的构造器。
