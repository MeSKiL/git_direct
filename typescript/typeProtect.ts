// 类型保护
interface Foo {
    foo: number
    common: string
}

interface Bar {
    bar: number
    common: string
}

function isFoo(arg: Foo | Bar): arg is Foo {
    return (arg as Foo).foo !== undefined
}

function doStuff(arg: Foo | Bar) {
    if (isFoo(arg)) {
        console.log(arg.foo)
    } else {
        console.log(arg.bar)
    }
}
