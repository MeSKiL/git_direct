#GLSL
##OpenGL着色器语言
- 计算顶点位置(Vertex Shader)
    - 平移、旋转、缩放
    - 投影
- 为每个像素上色(Fragment Shader)
    - 颜色
    - 材质
    - 光照
##传递数据给GLSL
- Uniforms -- 直接传递
- Attributes -- 通过Buffer

## 传递向量到着色器
- gl.uniform[1234][uif][v](location,data)
    - [1234] 几维向量
    - [uif] 
        - ui:unsigned integer 无符号整数
        - i:integer
        - f:float
    - location 着色器语言对应变量的位置
    - data uniform的变量,必须和维度一致
- gl.uniform2fv(location,data)

## 传递矩阵到着色器
- gl.uniformMatrix[234]x[234]fv(location,false,data)
- 例如
    - gl.uniformMatrix2fv(location,false,data) data为4个
    - gl.uniformMatrix2x3fv(location,false,data) data 6个
    - gl.uniformMatrix3fv(location,false,data) data 9个

## Buffer(缓冲区)
- 分配的一块内存空间
- WebGL中用于存储数据
- 类型
    - Vertex Buffer 顶点的信息
    - Index Buffer 顶点的索引
    - Frame Buffer 驱动显示器工作

## 缓冲区相关操作
- gl.createBuffer()
- gl.bindBuffer(target,buffer)
- gl.bufferData(target,data,usage)

## Buffer的target/usage
- target(描述buffer被绑定在哪里)
    - gl.ARRAY_BUFFER 存顶点属性
    - gl.ELEMENT_ARRAY_BUFFER 存索引
- usage(提示webgl数据将如何被使用)
    - gl.STATIC_DRAW 数据不会变化，可以缓存
    - gl.DYNAMIC_DRAW 经常检测变化
    - ...
    
## 着色器
- Attribute(属性)
    - 表示数据(顶点、索引、颜色、法向量等)
    - 只在顶点着色器中使用
- Uniform(统一的)
    - 通常是一个全局的向量(如颜色、光照参数等),或者全局的矩阵(如世界矩阵、观察矩阵等待)
    - 可以再顶点着色器和片段着色器中使用
- Varying(变化的)
    - 通常用来将数据从顶点着色器传递到片段着色器
    
## 属性示例(Attribute)
```js 
const colors = [...]
// 创建缓冲区，并将数据绑定到webgl的ARRAY_BUFFER
const buffer = gl.createBuffer()
// 设置buffer类型
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
gl.bufferData(gl.ARRAY_BUFFER,new Float32Array(colors),gl.STATIC_DRAW)
// 将数据和顶点着色器的属性关联
const a_color = gl.getAttribLocation(program,'a_color')
// buffer切换到现在的buffer
gl.bindBuffer(gl.ARRAY_BUFFER,buffer)
// a_color 对应着色器的位置
// 4 每次传4个过去 4维向量
// gl.FLOAT 类型
// false 是否归约
// 0 0 从0开始读间隔是0
gl.vertexAttribPointer(a_color,4,gl.FLOAT,false,0,0)
// 开启后才可以使用，任何时候都可以开启
gl.enableVertexAttribArray(a_color)
```
