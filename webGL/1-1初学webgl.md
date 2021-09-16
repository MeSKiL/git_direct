# 1-1初学webgl
## 图形系统是如何绘图的
光栅(Raster):几乎所有的现代图形系统都是基于光栅来绘制图形的，光栅就是指构成图像的像素阵列。
像素(Pixel):一个像素对应图像上的一个点，它通常保存图像上的某个具体位置的颜色等信息。
帧缓存(Frame Buffer):在绘图过程中，像素信息被存放在帧缓存中，帧缓存是一块内存地址。
CPU(Central Processing Unit):中央处理单元，负责逻辑计算。
GPU(Graphics Processing Unit):图形处理单元，负责图像计算。

现代计算机图形系统处理图形的通用过程基本是这样的
1. 对给定的数据结合绘图的场景要素(相机、光源、遮挡物体等)进行计算，最终将图形变为屏幕空间的2D坐标。
2. 为屏幕空间的每个像素点进行着色，把最终完成的图形输出到显示设备上。这整个过程是一步一步进行的，前一步的输出就是后一步的输入，这个过程也叫做渲染总线。

## 如何用WebGL绘制三角形
###  创建WebGL上下文
```js
const canvas = document.querySelector('canvas');
const gl = canvas.getContext('webgl');
```
### 创建WebGL程序(WebGL Program)
WebGL程序是一个WebGLProgram对象，它是给GPU最终运行着色器的程序。

- 顶点: 顶点就是几何图形的顶点。比如，三角形有三个顶点，四边形有四个顶点。
- 图元: 是WebGL可直接处理的图形单元，由WebGL的绘图模式决定，有点、线、三角形等等。(三点必定成面)
图元是WebGL可以直接处理的图形单元，所以其他非图元的图形最终必须要转化为图元才可以被WebGL处理。
    1. 点 gl.POINTS
    2. 线段 gl.LINES
    3. 线条 gl.LINE_STRIP
    4. 回路线条 gl.LINE_LOOP
    5. 三角形 gl.TRIANGLES
    6. 三角带 gl.TRIANGLE_STRIP
    7. 三角扇 gl.TRIANGLE_FAN
- 顶点着色器(Vertex Shader): 负责处理图形的顶点信息。算位置
处理顶点的GPU程序代码。它可以改变顶点的信息(顶点的坐标、法线方向、材质等)。
如果有多个顶点，每个顶点都会执行main。并且是并行的。
    1. 通过 gl_Position 设置顶点 前三个参数是x y z，最后一个参数是浮点数。
    2. 向片元着色器传递数据 顶点着色器可以将数据通过varying变量传给片元着色器。这些值会根据片元着色器的像素坐标与顶点的像素坐标的相对位置做线性插值。
```js
const vertex = `
attribute vec2 position;
varying vec3 color;

void main() {
  gl_PointSize = 1.0;
  color = vec3(0.5 + position * 0.5, 0.0);
  gl_Position = vec4(position * 0.5, 1.0, 1.0);
}
`
const fragment = `
precision mediump float;
varying vec3 color;

void main()
{
  gl_FragColor = vec4(color, 1.0);
}  
`
```
- 片元着色器(Fragment Shader): 负责处理图形的像素信息。上颜色。
顶点处理完成之后，WebGL就会根据顶点和绘图模式指定图元，计算出需要着色的像素，然后对它们执行片元着色程序。
片元着色器的作用就是处理光栅化后的像素信息。
无论有多少个像素点，片元着色器都可以同时处理。
通过设置 gl_FragColor 的值来定义和改变图形的颜色,只改一个值可以让整个图形变色，也说明了所有像素点同时运行片元着色器。
- 光栅化过程: WebGL从顶点着色器和图元提取像素点给片元着色器执行代码的过程，就是我们前面说的生成光栅信息的过程。

如果将图元设为线段，那么片元着色器就会处理顶点之间的线段上的像素点信息，画出来的图形就是空心的。
如果把图形设为三角形，那么片元着色器就会处理三角形内部的所有像素点，画出来的图形就是实心的。
我们要绘制实心的四边形，我们就需要将四边形分成两个三角形，再交给WebGL分别绘制出来。
```js
// 创建着色器 
// 顶点着色器，处理顶点的gpu程序代码，可以改变顶点的信息(坐标，法线，材质)
const vertex = `
  // attribute声明变量
  // vec2是变量类型，表示一个二维向量
  // position是变量名
  attribute vec2 position;

  void main() {
    gl_PointSize = 1.0;
    gl_Position = vec4(position, 1.0, 1.0);
  }
`;

// 片元着色器，处理图形的像素信息。
// 顶点处理完以后，会根据顶点和绘图模式指定的图元，计算出需要着色的像素点，然后对它们执行片元着色器程序，对指定图元中的像素点着色
// 红色
const fragment = `
  precision mediump float;

  void main()
  {
    gl_FragColor = vec4(1.0, 0.0, 0.0, 1.0);
  }    
`;
// 创建WebGL程序
// 顶点着色器和片元着色器只是一段代码片段，要分别创建成shader对象

const vertexShader = gl.createShader(gl.VERTEX_SHADER);
gl.shaderSource(vertexShader, vertex);
gl.compileShader(vertexShader);

const fragmentShader = gl.createShader(gl.FRAGMENT_SHADER);
gl.shaderSource(fragmentShader, fragment);
gl.compileShader(fragmentShader);

// 创建WebGLProgram对象，并将这两个shader关联到这个WebGL程序上。
// WebGLProgram对象的创建过程主要是添加vertexShader和framentShader。
// 然后将这个WebGLProgram对象链接到WebGL上下文对象上。
const program = gl.createProgram();
gl.attachShader(program, vertexShader);
gl.attachShader(program, fragmentShader);
gl.linkProgram(program);

// 最后通过useProgram选择启用这个WebGLProgram对象
gl.useProgram(program)
```
### 将数据存入缓冲区

- 首先要定义三角形的三个顶点。
WebGL坐标系是一个三维空间坐标系，坐标原点是(0,0,0)。是一个右手坐标系。
WebGL使用的数据需要用类型数组定义，默认格式是Float32Array。
- 将定义好的数据写入WebGL的缓冲区
    1.  创建一个缓存对象 createBuffer
    2. 将它绑定为当前操作对象 bindBuffer
    3. 把当前的数据写入缓存对象 bufferData
```js
const points = new Float32Array([
    -1,-1,
    0,1,
    1,-1,
])
const bufferId = gl.createBuffer();
gl.bindBuffer(gl.ARRAY_BUFFER,bufferId);
gl.bufferData(gl.ARRAY_BUFFER,points,gl.STATIC_DRAW);
```
### 将缓冲区数据读取到GPU
把数据绑定给顶点着色器中的position变量。
```js
// 获取顶点着色器中的position变量的地址
const vPosition = gl.getAttribLocation(program, 'position');
// 给变量设置长度和类型,从缓存中读取数据给vPosition
gl.vertexAttribPointer(vPosition, 2, gl.FLOAT, false, 0, 0);
// 激活这个变量
gl.enableVertexAttribArray(vPosition)
```
在顶点着色器中，我们定义的points类型数组中对应的值，就能通过变量position读到了
###GPU执行WebGL程序，输出结果
GPU可以读到绑定的数据到着色器变量了，接下来，只需要调用绘图指令，就可以执行着色器程序来完成绘制了。

```js
// 先调用gl.clear将当前画布的内容清除
gl.clear(gl.COLOR_BUFFER_BIT);
// 调用gl.drawArrays传入绘制模式，顶点偏移量，顶点数量，WebGL会将对应的buffer数组传给顶点着色器
gl.drawArrays(gl.TRIANGLES, 0, points.length / 2);
```
## 流程

1. 创建WebGL上下文
2. 创建着色程序 (顶点着色器 片元着色器)
3. 将数据放入缓存 bufferData
4. 从缓存中读取数据 vertexAttribPointer
5. 运行着色程序 drawArrays
6. 执行顶点着色器 => 执行片元着色器
