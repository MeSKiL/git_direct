import RenderContext from '../RenderContext'

export class Model {
    constructor(mesh) {
        this.mesh = mesh
        this.gl = RenderContext.getGL()
        this.program = RenderContext.getProgram()
        this.gl.useProgram(this.program)
    }

    setVectorUniform(name, value) {
        const position = this.gl.getUniformLocation(this.program, name)
        if (value.length === 2) {
            this.gl.uniform2fv(position, value)
        } else if (value.length === 3) {
            this.gl.uniform3fv(position, value)
        } else if (value.length === 4) {
            this.gl.uniform4fv(position, value)
        }
    }

    setMatrixUniform(name, value) {
        const position = this.gl.getUniformLocation(this.program, name)
        if (Math.sqrt(value.length) === 2) {
            this.gl.uniformMatrix2fv(position, false, value)
        } else if (Math.sqrt(value.length) === 3) {
            this.gl.uniformMatrix3fv(position, false, value)
        } else if (Math.sqrt(value.length) === 4) {
            this.gl.uniformMatrix4fv(position, false, value)
        }
    }

    setUnitMatrix(unitMatrix) {
        this.unitMatrix = unitMatrix
    }

    setWorldMatrix(worldMatrix) {
        this.worldMatrix = worldMatrix
    }

    draw() {
        const gl = this.gl
        this.unitMatrix&&this.setMatrixUniform('u_unit', this.unitMatrix)
        this.worldMatrix&&this.setMatrixUniform('u_world', this.worldMatrix)
        gl.enable(gl.DEPTH_TEST)
        gl.depthFunc(gl.LEQUAL)
        gl.clearDepth(1.0)
        // 视野大小
        gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)
        // 清除当前颜色
        gl.clear(gl.COLOR_BUFFER_BIT | gl.DEPTH_BUFFER_BIT)
        this.mesh.draw()
    }
}
