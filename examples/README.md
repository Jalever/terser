# Terser AST 操作与转换系统示例

本目录包含了一系列示例，帮助理解和学习 Terser 的 AST 操作与转换系统。

## 快速开始

```bash
# 运行基础示例
node examples/01-basic-ast/parse-simple.js

# 运行转换示例
node examples/02-ast-transformation/simple-transform.js
```

## 示例分类

### 01-basic-ast - 基础 AST 操作

-   学习如何解析 JavaScript 代码为 AST
-   了解各种 AST 节点类型
-   掌握基本的 AST 遍历方法

### 02-ast-transformation - AST 转换

-   学习如何修改 AST 结构
-   使用 TreeWalker 和 TreeTransformer
-   实现自定义转换逻辑

### 03-advanced-features - 高级特性

-   双向 AST 遍历
-   作用域分析和变量追踪
-   复杂的代码分析技术

### 04-compression-examples - 压缩优化

-   死代码消除算法
-   常量折叠优化
-   变量名压缩技术

### 05-debugging-tools - 调试工具

-   AST 结构可视化
-   调试友好的遍历器
-   性能分析工具
