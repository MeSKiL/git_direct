export function perspective(fov, aspect, zNear, zFar) {
    const f = 1 / Math.tan(fov * 0.5)
    const inv = 1 / (zNear - zFar)
    return [
        f / aspect, 0, 0, 0,
        0, f, 0, 0,
        0, 0, (zNear + zFar) * inv, -1,
        0, 0, 2 * zNear * zFar * inv, 0
    ]
}

export function rotateY(angle) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        c, 0, s, 0,
        0, 1, 0, 0,
        -s, 0, c, 0,
        0, 0, 0, 1
    ]
}

export function rotateZ(angle) {
    const c = Math.cos(angle)
    const s = Math.sin(angle)
    return [
        c, s, 0, 0,
        -s, c, 0, 0,
        0, 0, 1, 0,
        0, 0, 0, 1
    ]
}
