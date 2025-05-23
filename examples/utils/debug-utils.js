/**
 * 调试工具函数
 * 提供AST调试和分析的辅助功能
 */

const { TreeWalker } = require("../../lib/ast");

/**
 * 打印AST节点的详细信息
 */
function printNodeInfo(node, depth = 0) {
    const indent = "  ".repeat(depth);
    const position = node.start
        ? `[${node.start.line}:${node.start.col}]`
        : "[no-pos]";
    const nodeInfo = `${node.TYPE}${node.name ? `(${node.name})` : ""}`;

    console.log(`${indent}${position} ${nodeInfo}`);

    // 显示节点的关键属性
    if (node.value !== undefined) {
        console.log(`${indent}  value: ${JSON.stringify(node.value)}`);
    }
    if (node.operator) {
        console.log(`${indent}  operator: ${node.operator}`);
    }
}

/**
 * 统计AST中各种节点类型的数量
 */
function getNodeStatistics(ast) {
    const stats = {};

    ast.walk(
        new TreeWalker(function (node) {
            const type = node.TYPE;
            stats[type] = (stats[type] || 0) + 1;
        })
    );

    return stats;
}

/**
 * 查找特定类型的所有节点
 */
function findNodesByType(ast, nodeType) {
    const nodes = [];

    ast.walk(
        new TreeWalker(function (node) {
            if (node.TYPE === nodeType) {
                nodes.push(node);
            }
        })
    );

    return nodes;
}

/**
 * 创建调试友好的AST遍历器
 */
function createDebugWalker(options = {}) {
    const {
        logNodes = false,
        logDepth = false,
        maxDepth = Infinity,
        filter = null,
    } = options;

    let currentDepth = 0;

    return new TreeWalker(function (node, descend) {
        currentDepth++;

        if (currentDepth > maxDepth) {
            currentDepth--;
            return;
        }

        if (filter && !filter(node)) {
            descend();
            currentDepth--;
            return;
        }

        if (logNodes) {
            const depthInfo = logDepth ? `[depth:${currentDepth}] ` : "";
            console.log(`${depthInfo}Visiting: ${node.TYPE}`);
        }

        descend();
        currentDepth--;
    });
}

/**
 * 生成AST的简化文本表示
 */
function astToText(node, depth = 0, maxDepth = 3) {
    if (depth > maxDepth) return "...";

    const indent = "  ".repeat(depth);
    let result = `${indent}${node.TYPE}`;

    if (node.name) result += `(${node.name})`;
    if (node.value !== undefined) result += ` = ${JSON.stringify(node.value)}`;
    if (node.operator) result += ` [${node.operator}]`;

    result += "\n";

    // 递归处理子节点
    if (node._children && depth < maxDepth) {
        const children = node._children();
        children.forEach((child) => {
            if (child) {
                result += astToText(child, depth + 1, maxDepth);
            }
        });
    }

    return result;
}

module.exports = {
    printNodeInfo,
    getNodeStatistics,
    findNodesByType,
    createDebugWalker,
    astToText,
};
