"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
var a = "foo";
var b = 100; // NaN Infinity
// 严格模式下 所有类型不允许为空
// const b: string = null
var e = undefined;
var f = null;
var g = undefined;
// es6新增
var h = Symbol();
var fn = function () {
    console.log("fn");
};
// object 标识除 基础类型 string, number, null, undefined, symbol, boolean, void, symbol的以外的其他类型
// 包括 funciton, object, map, set 等引用类型的变量
var fn1 = function () { };
var str = {};
var obj = { foo: 100, bar: "foo" };
var arr1 = [1, 2, 3];
var sum = function () {
    var args = [];
    for (var _i = 0; _i < arguments.length; _i++) {
        args[_i] = arguments[_i];
    }
    return args.reduce(function (prev, current) {
        return prev + current;
    }, 0);
};
// 元组类型
var arr2 = [1, "32"];
// 枚举类型 如果第一个指定初始值 会从这个初始值开始累加，
// 编译为一个双向的对象
var PostStatus;
(function (PostStatus) {
    // 使用 =, 也可以不指定 从0开始累加
    PostStatus[PostStatus["Draft"] = 1] = "Draft";
    PostStatus[PostStatus["Unpublished"] = 2] = "Unpublished";
    PostStatus[PostStatus["Publiced"] = 3] = "Publiced";
})(PostStatus || (PostStatus = {}));
// 可双向访问
PostStatus.Draft; // => 1
PostStatus[1]; // => Draft
1 /* Draft */;
2 /* Unpublished */;
//# sourceMappingURL=typesctipt.js.map