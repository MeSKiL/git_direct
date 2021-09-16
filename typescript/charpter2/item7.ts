// 每个ts类型都对应一个set放着该类型所有的可能值，最小的set是never的set。是空set
const x: never = 12
// 第二小的集合是包含单个属性的集合，对应于ts中的文本类型，也被叫做单元类型
type A = 'A'
type B = 'B'
type Twelve = 12
// 或者有两三个值
type AB = 'A' | 'B'
type AB12 = 'A' | 'B' | 12

// 交叉类型类型 & 是取两个对象的并集而不是交集，又要是Person，也要是Lifespan，就是两个相交的圆。ps就满足这个要求。
// 所以对象和字符串这交叉类型方面的表现会不一样。其实是符合直觉的。
// ps满足又是Person又是Lifespan。但是 只有name才满足 'name' & ('name' |'test')
// 所以&作用域对象是取对象的并集，作用域字符串这类的，就是取交集了，但是本质上都是取公共特性。
interface Person {
    name: string
}

interface Lifespan {
    birth: Date
    death: Date
}

type PersonSpan = Person & Lifespan
const ps: PersonSpan = {
    name: 'Alan Turing',
    birth: new Date('1912/06/23'),
    death: new Date('1954/06/07'),
}

// ts不能保证Person|Lifespan的key会是什么，所以是never。
type Key1 = keyof (Person | Lifespan)
type Key2 = keyof Person & keyof Lifespan

type Key3 = keyof (Person & Lifespan)
type Key4 = keyof Person | keyof Lifespan

interface Point {
    x: number
    y: number
}

type PointKeys = keyof Point

function sortBy<K extends keyof T, T>(vals: T[], key: K) {
    // ...
}

const pts: Point[] = [{x: 1, y: 1}, {x: 2, y: 0}]
sortBy(pts, 'x')
sortBy(pts, 'y')
sortBy(pts, Math.random() < 0.5 ? 'x' : 'y')
sortBy(pts, 'z')

// number[]不是[number,number]的子集，但是[number,number]是number[]的子集。
const list = [1, 2];
const tuple: [number, number] = list


type T = Exclude<string | Date, string | number>

type NonZeroNums = Exclude<number, 0>
let num: NonZeroNums = 0

// remember
// 把类型当做值的集合，这个集合可能是有限的也可能是无限的
// typescript类型形成相交集而不是严格的层次结构，两个类型可以重叠而不是成为对方的子集
// 一个对象如果有一个类型声明里不存在的属性，他也可以属于这个类型
// 类型操作作用于集合域，A和B的交叉等于A的域和B的域的交叉。对于对象类型的话，A&B就意味着A和B的属性都需要有
// 像思考子集一样思考'extends'、'assignable to'、'subtype of'
