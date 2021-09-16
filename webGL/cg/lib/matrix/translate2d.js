// webgl的矩阵都会转置
export function translate2d(x, y) {
    return [
        1, 0, 0,
        0, 1, 0,
        x, y, 1
    ]
}
