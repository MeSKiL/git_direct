enum TITLE_TYPE {
    NONE = 0,
    TEXT = 1 << 0,
    IMG = 1 << 1,
    AUDIO = 1 << 2
}

let titleType: number = TITLE_TYPE.NONE
titleType |= TITLE_TYPE.TEXT
// titleType |= TITLE_TYPE.AUDIO
