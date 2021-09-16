# 渲染管道
## Application(javascript)
写的代码，产生数据
Buffers,Variable,Uniforms
## Vertex Shader
- 控制反转，在pipeline中取出来给程序员处理
- 每次调用产生一个顶点数据
- Attributes/Uniforms 变换计算成顶点数据
Varying
## 图元组装(Primitives Assembly)
- 形成自己的图元描述
- 将位置、索引等信息组成三角形
## 栅格化(Rasterization)
- 图元的到三角形，栅格化是将三角形映射到一个个像素。每个像素都称为Fragment
- 选择(Culling) 去掉一些图元
- 剪裁(Cliping) 剪裁去掉图元的某些部分
- 将图元数据转换成为一个一个像素的数据，每个数据称作一个片段(Fragment)
## Fragment Shader
- 控制反转，充分利用显卡资源
- 通过Varying数据/图元数据 计算图元每个像素的颜色
## Fragment Operation(着色操作)
- 深度探测
    - 遍历所有图元中的像素，计算深度
    - 如果存在深度更小(离用户更近的点)，那么可以采取一些策略
## Frame Buffer
驱动显示器工作
存储发送给显示器的位图
## 内存

## GPU


