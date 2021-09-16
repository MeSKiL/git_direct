// 枚举可以重复声明但是内容不可重复
enum Color {
    Red,
    Green,
    Blur
}

enum Color {
    Yellow = 3
}

// 枚举配合位运算
enum AnimalFlags {
    None = 0,
    HasClaws = 1 << 0,
    CanFly = 1 << 1
}

interface Animal {
    flags: AnimalFlags

    [key: string]: any
}

function printAnimalAbilities(animal: Animal) {
    let animalFlags = animal.flags
    if (animalFlags & AnimalFlags.HasClaws) {
        console.log('animal has claws')
    }
    if (animalFlags & AnimalFlags.CanFly) {
        console.log('animal can fly')
    }
    if (animalFlags === AnimalFlags.None) {
        console.log('nothing')
    }
}

let animal: Animal = {
    flags: AnimalFlags.None
}
printAnimalAbilities(animal)
animal.flags |= AnimalFlags.HasClaws
printAnimalAbilities(animal)
animal.flags &= ~AnimalFlags.HasClaws
printAnimalAbilities(animal)
animal.flags |= AnimalFlags.HasClaws | AnimalFlags.CanFly
printAnimalAbilities(animal)

// 给枚举增加静态方法
enum Weekday {
    Monday = 1,
    Tuesday,
    Wednesday,
    Thursday,
    Friday,
    Saturday,
    Sunday
}

namespace Weekday {
    export function isBusinessDay(day: Weekday) {
        switch (day) {
            case Weekday.Saturday:
            case Weekday.Sunday:
                return false
            default:
                return true
        }
    }
}

const mon = Weekday.Monday
const sun = Weekday.Sunday
console.log(Weekday.isBusinessDay(mon))
console.log(Weekday.isBusinessDay(sun))

// 基于字符串的枚举
function strEnum<T extends string>(o: Array<T>): { [K in T]: K } {
    return o.reduce((res, key) => {
        res[key] = key
        return res
    }, Object.create(null))
}
const Direction = strEnum(['North','South','East','West'])
type Direction = keyof typeof Direction
let sample:Direction

// 枚举与number兼容，不同枚举的变量是不兼容的
enum Status {
    Ready,
    Waiting
}
