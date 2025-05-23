import { parse } from "../lib/parse.js";
import { TreeWalker, walk, walk_parent } from "../lib/ast.js";

// 解析一些示例代码生成AST
const ast = parse(`
function example(a, b) {
  const result = a + b;
  return result;
}
example(1, 2);
`);

// 实现一个简单的自定义TreeWalker
const walker = new TreeWalker(function (node, descend) {
	console.log(`Node type: ${node.TYPE}`);

	// 可以通过返回true来跳过子节点遍历
	// 或者不返回值让遍历继续
});

// 执行遍历
ast.walk(walker);