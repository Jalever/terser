#!/usr/bin/env node

/**
 * AST遍历示例
 * 演示如何遍历AST树结构，访问各种节点
 */

import { parse } from "../../lib/parse.js";
import { TreeWalker } from "../../lib/ast.js";

console.log("=== AST遍历示例 ===\n");

const code = `
function fibonacci(n) {
    if (n <= 1) return n;
    return fibonacci(n - 1) + fibonacci(n - 2);
}

const result = fibonacci(10);
console.log("Result:", result);
`;

console.log("源代码:");
console.log(code);
console.log("\n=== 遍历结果 ===\n");

try {
    const ast = parse(code);

    // 示例1: 基本遍历 - 统计节点类型
    console.log("1. 节点类型统计:");
    const nodeStats = {};

    ast.walk(
        new TreeWalker(function (node) {
            const type = node.TYPE;
            nodeStats[type] = (nodeStats[type] || 0) + 1;
        })
    );

    Object.entries(nodeStats)
        .sort(([, a], [, b]) => b - a)
        .forEach(([type, count]) => {
            console.log(`  ${type}: ${count}`);
        });
    console.log();

    // 示例2: 查找特定节点 - 函数调用
    console.log("2. 查找函数调用:");
    const functionCalls = [];

    ast.walk(
        new TreeWalker(function (node) {
            if (node.TYPE === "Call") {
                const funcName =
                    node.expression.name ||
                    (node.expression.property && node.expression.property) ||
                    "[复杂表达式]";
                functionCalls.push({
                    name: funcName,
                    args: node.args.length,
                    line: node.start.line,
                });
            }
        })
    );

    functionCalls.forEach((call) => {
        console.log(`  ${call.name}(${call.args}个参数) - 第${call.line}行`);
    });
    console.log();

    // 示例3: 变量声明分析
    console.log("3. 变量声明分析:");
    const variables = [];

    ast.walk(
        new TreeWalker(function (node) {
            if (node.TYPE === "VarDef") {
                variables.push({
                    name: node.name.name,
                    hasInitializer: !!node.value,
                    line: node.start.line,
                });
            }
        })
    );

    variables.forEach((variable) => {
        const init = variable.hasInitializer ? "有初始值" : "无初始值";
        console.log(`  ${variable.name} (${init}) - 第${variable.line}行`);
    });
    console.log();

    // 示例4: 深度优先遍历展示
    console.log("4. AST结构层次展示 (前5层):");
    let depth = 0;
    const maxDepth = 5;

    function showStructure(node, currentDepth = 0) {
        if (currentDepth > maxDepth) return;

        const indent = "  ".repeat(currentDepth);
        const nodeInfo = `${node.TYPE}${node.name ? `(${node.name})` : ""}`;
        console.log(`${indent}${nodeInfo}`);

        // 遍历子节点
        if (node._children) {
            node._children().forEach((child) => {
                if (child) showStructure(child, currentDepth + 1);
            });
        }
    }

    showStructure(ast);
} catch (error) {
    console.error("处理错误:", error.message);
}

console.log("\n=== 遍历完成 ===");
