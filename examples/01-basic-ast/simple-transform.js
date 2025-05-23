#!/usr/bin/env node

/**
 * 简单AST转换示例
 * 演示如何修改AST结构，实现代码转换
 */

import { parse } from "../../lib/parse.js";
import { TreeTransformer, AST_Number, AST_String } from "../../lib/ast.js";
import "../../lib/transform.js";
import "../../lib/output.js";
import "../../lib/scope.js";

console.log("=== AST转换示例 ===\n");

// 示例代码
const originalCode = `
const PI = 3.14159;
const message = "Hello World";
const doubled = 2 * 5;
const greeting = "Hi, " + "there!";
`;

console.log("原始代码:");
console.log(originalCode);

try {
    // 转换1: 数字精度调整
    // console.log("\n1. 数字精度调整转换:");
    // const ast1 = parse(originalCode);
    // ast1.figure_out_scope();

    // const numberTransformer = new TreeTransformer(function before(node) {
    //     if (node instanceof AST_Number) {
    //         // 将浮点数保留2位小数
    //         if (node.value % 1 !== 0) {
    //             console.log(
    //                 `转换数字: ${node.value} → ${
    //                     Math.round(node.value * 100) / 100
    //                 }`
    //             );
    //             return new AST_Number({
    //                 start: node.start,
    //                 end: node.end,
    //                 value: Math.round(node.value * 100) / 100,
    //             });
    //         }
    //     }
    //     // 返回 undefined 表示继续遍历子节点
    // });

    // const transformedAst1 = ast1.transform(numberTransformer);
    // transformedAst1.figure_out_scope();
    // console.log("转换后代码:");
    // console.log(transformedAst1.print_to_string());

    // 转换2: 字符串大写转换
    // console.log("\n2. 字符串大写转换:");
    // /**
    //  * @type {import('./lib/ast.js').AST_Scope}
    //  */
    // const ast2 = parse(originalCode);
    // ast2.figure_out_scope();

    // const stringTransformer = new TreeTransformer(function before(node) {
    //     if (node instanceof AST_String) {
    //         console.log(
    //             `转换字符串: ${node.value} → ${node.value.toUpperCase()}`
    //         );
    //         return new AST_String({
    //             start: node.start,
    //             end: node.end,
    //             value: node.value.toUpperCase(),
    //             quote: node.quote,
    //         });
    //     }
    // });

    // const transformedAst2 = ast2.transform(stringTransformer);
    // transformedAst2.figure_out_scope();
    // console.log("转换后代码:");
    // console.log(transformedAst2.print_to_string());

    // 转换3: 组合转换
    console.log("\n3. 组合转换 (数字+字符串):");
    const ast3 = parse(originalCode);
    ast3.figure_out_scope();

    const combinedTransformer = new TreeTransformer(function before(node) {
        if (node instanceof AST_Number && node.value % 1 !== 0) {
            console.log(
                `转换数字: ${node.value} → ${
                    Math.round(node.value * 100) / 100
                }`
            );
            return new AST_Number({
                start: node.start,
                end: node.end,
                value: Math.round(node.value * 100) / 100,
            });
        }
        if (node instanceof AST_String) {
            console.log(
                `转换字符串: ${node.value} → ${node.value.toUpperCase()}`
            );
            return new AST_String({
                start: node.start,
                end: node.end,
                value: node.value.toUpperCase(),
                quote: node.quote,
            });
        }
    });

    const transformedAst3 = ast3.transform(combinedTransformer);
    transformedAst3.figure_out_scope();
    console.log("转换后代码:");
    console.log(transformedAst3.print_to_string());
} catch (error) {
    console.error("转换错误:", error.message);
    console.error(error.stack);
}

console.log("\n=== 转换完成 ===");
