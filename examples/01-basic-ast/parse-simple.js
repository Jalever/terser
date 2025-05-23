#!/usr/bin/env node

/**
 * 基础AST解析示例
 * 演示如何将JavaScript代码解析为AST，并探索AST结构
 */

import { parse } from "../../lib/parse.js";

console.log("=== Terser AST解析示例 ===\n");

// 示例1: 解析简单表达式
console.log("1. 解析简单表达式:");
const simpleCode = "const x = 42;";
console.log(`源代码: ${simpleCode}`);

try {
    const ast = parse(simpleCode);
    console.log("AST结构:");
    console.log(JSON.stringify(ast, null, 2));
    console.log(`根节点类型: ${ast.TYPE}`);
    console.log(`语句数量: ${ast.body.length}\n`);
} catch (error) {
    console.error("解析错误:", error.message);
}

// 示例2: 解析函数声明
console.log("2. 解析函数声明:");
const functionCode = `
function greet(name) {
    return "Hello, " + name + "!";
}
`;
console.log(`源代码: ${functionCode}`);

try {
    const ast = parse(functionCode);
    const funcNode = ast.body[0];
    console.log(`函数节点类型: ${funcNode.TYPE}`);
    console.log(`函数名: ${funcNode.name.name}`);
    console.log(`参数数量: ${funcNode.argnames.length}`);
    console.log(`函数体语句数: ${funcNode.body.length}\n`);
} catch (error) {
    console.error("解析错误:", error.message);
}

// 示例3: 解析ES6特性
console.log("3. 解析ES6特性:");
const es6Code = `
const [a, b] = [1, 2];
const obj = { x: a, y: b };
const arrow = (x) => x * 2;
`;
console.log(`源代码: ${es6Code}`);

try {
    const ast = parse(es6Code);
    console.log("ES6特性解析成功!");
    ast.body.forEach((stmt, index) => {
        console.log(`语句${index + 1}: ${stmt.TYPE}`);
    });
    console.log();
} catch (error) {
    console.error("解析错误:", error.message);
}

// 示例4: 位置信息展示
console.log("4. AST节点位置信息:");
const positionCode = "let result = x + y;";
console.log(`源代码: ${positionCode}`);

try {
    const ast = parse(positionCode, { filename: "example.js" });
    const stmt = ast.body[0];
    const assignment = stmt.definitions[0];

    console.log("位置信息:");
    console.log(
        `变量名位置: 行${assignment.name.start.line}, 列${assignment.name.start.col}`
    );
    console.log(
        `表达式位置: 行${assignment.value.start.line}, 列${assignment.value.start.col}`
    );
    console.log();
} catch (error) {
    console.error("解析错误:", error.message);
}

console.log("=== 示例完成 ===");
