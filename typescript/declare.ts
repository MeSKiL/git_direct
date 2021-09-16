// 声明foo
interface ReturnString {
    ():string
}
declare const foo:ReturnString
const bar = foo()

// 编译后
// declare的用于声明类型,declare后开发时就默认存在实现。
// var bar = foo()
