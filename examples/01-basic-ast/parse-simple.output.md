=== Terser AST 解析示例 ===

1. 解析简单表达式:
   源代码: const x = 42;
   AST 结构:

```json
{
    "body": [
        {
            "definitions": [
                {
                    "name": {
                        "name": "x",
                        "start": {
                            "flags": 0,
                            "type": "name",
                            "value": "x",
                            "line": 1,
                            "col": 6,
                            "pos": 6,
                            "comments_before": [],
                            "comments_after": [],
                            "file": null
                        },
                        "end": {
                            "flags": 0,
                            "type": "name",
                            "value": "x",
                            "line": 1,
                            "col": 6,
                            "pos": 6,
                            "comments_before": [],
                            "comments_after": [],
                            "file": null
                        },
                        "flags": 0
                    },
                    "value": {
                        "value": 42,
                        "raw": "42",
                        "start": {
                            "flags": 0,
                            "type": "num",
                            "value": 42,
                            "line": 1,
                            "col": 10,
                            "pos": 10,
                            "comments_before": [],
                            "comments_after": [],
                            "file": null
                        },
                        "end": {
                            "flags": 0,
                            "type": "num",
                            "value": 42,
                            "line": 1,
                            "col": 10,
                            "pos": 10,
                            "comments_before": [],
                            "comments_after": [],
                            "file": null
                        },
                        "flags": 0
                    },
                    "start": {
                        "flags": 0,
                        "type": "name",
                        "value": "x",
                        "line": 1,
                        "col": 6,
                        "pos": 6,
                        "comments_before": [],
                        "comments_after": [],
                        "file": null
                    },
                    "end": {
                        "flags": 0,
                        "type": "num",
                        "value": 42,
                        "line": 1,
                        "col": 10,
                        "pos": 10,
                        "comments_before": [],
                        "comments_after": [],
                        "file": null
                    },
                    "flags": 0
                }
            ],
            "start": {
                "flags": 0,
                "type": "keyword",
                "value": "const",
                "line": 1,
                "col": 0,
                "pos": 0,
                "comments_before": [],
                "comments_after": [],
                "file": null
            },
            "end": {
                "flags": 0,
                "type": "punc",
                "value": ";",
                "line": 1,
                "col": 12,
                "pos": 12,
                "comments_before": [],
                "comments_after": [],
                "file": null
            },
            "flags": 0
        }
    ],
    "start": {
        "flags": 0,
        "type": "keyword",
        "value": "const",
        "line": 1,
        "col": 0,
        "pos": 0,
        "comments_before": [],
        "comments_after": [],
        "file": null
    },
    "end": {
        "flags": 0,
        "type": "punc",
        "value": ";",
        "line": 1,
        "col": 12,
        "pos": 12,
        "comments_before": [],
        "comments_after": [],
        "file": null
    },
    "flags": 0
}
```

根节点类型: Toplevel
语句数量: 1

2. 解析函数声明:
   源代码:
   function greet(name) {
   return "Hello, " + name + "!";
   }

函数节点类型: Defun
函数名: greet
参数数量: 1
函数体语句数: 1

3. 解析 ES6 特性:
   源代码:
   const [a, b] = [1, 2];
   const obj = { x: a, y: b };
   const arrow = (x) => x \* 2;

ES6 特性解析成功!
语句 1: Const
语句 2: Const
语句 3: Const

4. AST 节点位置信息:
   源代码: let result = x + y;
   位置信息:
   变量名位置: 行 1, 列 4
   表达式位置: 行 1, 列 13

=== 示例完成 ===
