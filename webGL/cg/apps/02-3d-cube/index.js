import {Model, shape, matrix} from '../../lib'
import RenderContext from '../../lib/RenderContext'

function main() {
    const gl = RenderContext.getGL()
    const mesh = shape.d3_cube()
    const model = new Model(mesh)
    gl.enable(gl.DEPTH_TEST)
    gl.depthFunc(gl.LEQUAL)
    gl.clearDepth(1.0)
    gl.viewport(0, 0, gl.canvas.width, gl.canvas.height)

    const mPerspect = matrix.perspective(Math.PI * 0.6, gl.canvas.width / gl.canvas.height, 1, 100.0)
    let angle = 0.0

    function draw() {
        const rotateYMatrix = matrix.rotateY(angle)
        const rotateZMatrix = matrix.rotateZ(angle)
        model.setMatrixUniform('u_rotatey', rotateYMatrix)
        model.setMatrixUniform('u_rotatez', rotateZMatrix)
        model.setMatrixUniform('u_project', mPerspect)

        model.draw()
        angle += 0.01
        requestAnimationFrame(draw)
    }

    draw()
}

main()
