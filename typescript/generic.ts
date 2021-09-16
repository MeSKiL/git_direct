function returnSelf<T>(self: T): T {
    return self
}

function outerReturnSelf<U>(outer: U): U {
    return returnSelf(outer)
}
