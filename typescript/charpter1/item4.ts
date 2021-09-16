// typescript模拟了javascript的鸭子类型的特性
interface Vector2D {
    x: number
    y: number
}

function calculateLength(v: Vector2D) {
    return Math.sqrt(v.x * v.x + v.y * v.y)
}

interface NamedVector {
    name: string
    x: number
    y: number
}

const v: NamedVector = {x: 3, y: 4, name: 'Zee'}
// 接收到的类型是NamedVector而不是Vector2D但由于存在number类型的x和y，所以没有报错,这也是ts模拟js运行时的体现
calculateLength(v)

// 由于鸭子类型导致遍历对象属性时，会使属性值的类型不符合预期，所以在一些情况下，避免勋章遍历属性更好
interface Vector3D {
    x: number,
    y: number,
    z: number
}

function calculateLengthL1False(v: Vector3D) {
    let length = 0
    for (const axis of Object.keys(v)) {
        const coord = v[axis]
        length += Math.abs(coord)
    }
    return length
}

const vec3D = {x: 3, y: 4, z: 1, address: '123 Broadway'}
// vec3D可以被推断成Vector3D
calculateLengthL1False(vec3D)
calculateLengthL1False({x: 3, y: 4, z: 1, address: '123 Broadway'})

function calculateLengthL1True(v: Vector3D) {
    return Math.abs(v.x) + Math.abs(v.y) + Math.abs(v.z)
}


// 在class方面也是出人意料的结果
class C {
    foo: string

    constructor(foo: string) {
        this.foo = foo
    }
}

const c = new C('instance of C')
const d: C = {foo: 'object literal'}

// 这种结构类型有助于写测试代码，比如
interface Author {
    first: string
    last: string
}

function getAuthors1(database: PostgresDB): Author[] {
    const authorRows = database.runQuery(`SELECT FIRST,LAST FROM AUTHORS`)
    return authorRows.map(row => ({first: row[0], last: row[1]}))
}

// 使用结构类型将PostgresDB改写成DB,写测试的时候就可以不用模拟真实的数据库了
interface DB {
    runQuery: (sql: string) => any[]
}

function getAuthors2(database: DB): Author[] {
    const authorRow = database.runQuery(`SELECT FIRST,LAST FROM AUTHORS`)
    return authorRow.map(row => ({first: row[0], last: row[1]}))
}

function test(name: string, func: any) {
}

function expect(arg: any): expectRes {
    return {
        toEqual: (arg) => {
        }
    }
}

interface expectRes {
    toEqual: (arg: any) => void
}

test('getAuthors', () => {
    const authors = getAuthors2({
        runQuery(sql) {
            return [['Toni', 'Morrison'], ['Maya', 'Angelou']]
        }
    })

    expect(authors).toEqual([
        {first: 'Toni', last: 'Morrison'},
        {first: 'Maya', last: 'Angelou'}
    ])
})

// remember
// 理解javascript的鸭子类型以及ts用于模拟鸭子类型的结构类型，可以赋值的属性可以不在接口显式定义里。类型不是封闭的。(值类型的对象字面量不满足这一条)
// class同样遵循类型结构规则，在instanceof class方面可能会存在不符合预期的结果
// 可以使用结构类型促进单元测试
