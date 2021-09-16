import { initGL } from './boot/initGL'
import { initProgram } from './boot/initProgram'
export default class RenderContext {

  static gl = null
  static program = null

  static init(){
    if(RenderContext.gl){return}
    // 创建gl上下文
    const gl = initGL()
    // 创建着色程序
    const program = initProgram(gl)
    gl.canvas.width = gl.canvas.clientWidth
    gl.canvas.height = gl.canvas.clientHeight
    RenderContext.program = program
    RenderContext.gl = gl
  }

  static getGL(){
    RenderContext.init()
    return RenderContext.gl
  }

  static getProgram(){
    RenderContext.init()
    return RenderContext.program
  }

}
