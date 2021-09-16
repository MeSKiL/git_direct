// readonly可以确保属性不被直接使用者修改，但是可以被没有保证的使用者修改
interface Foo {
    readonly bar:number
}
const foo:Foo = {
    bar:123
}
function iMutateFoo(foo:{bar:number}) {
    foo.bar = 456
}
iMutateFoo(foo)

function iTakenFoo(foo:Foo) {
    foo.bar = 456
}
iTakenFoo(foo2)
