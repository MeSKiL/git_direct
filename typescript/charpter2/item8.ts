// 一个标签可以作为类型和值声明两次，这会导致使用instanceof的时候出问题。因为instanceof是运行时操作符，instanceof的是值而不是类型。
interface Cylinder {
    radius: number
    height: number
}

const Cylinder = (radius: number, height: number) => ({radius, height})
function calculateVolume(shape:unknown) {
    if(shape instanceof  Cylinder){
        shape.radius
    }
}
