// 双重断言
function handler1(event: Event) {
    const mouseEvent = event as MouseEvent
}

function handler2(event: Event) {
    const element = (event as any) as HTMLElement
}
