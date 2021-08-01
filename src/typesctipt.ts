export {} // 以模块的方式导出 {} 是语法糖
const a: string = "foo"
const b: number = 100 // NaN Infinity

// 严格模式下 所有类型不允许为空
// const b: string = null

const e: void = undefined
const f: null = null
const g: undefined = undefined

// es6新增
const h: symbol = Symbol()

// -----------------------------------------------------------------

// object 标识除 基础类型 string, number, null, undefined, symbol, boolean, void, symbol的以外的其他类型
// 包括 funciton, object, map, set 等引用类型的变量
const fn1: object = function (){}

const str: object = {}

const obj: { foo: number; bar: string} = { foo: 100, bar: "foo" }

const arr1: Array<number> = [1, 2, 3]

const sum = (...args:number[])=>{
  return args.reduce((prev,current)=>{
    return prev + current
  }, 0)
}

// 元组类型
const arr2: [number, string] = [1, "32"]

// 枚举类型 如果第一个指定初始值 会从这个初始值开始累加，
// 编译为一个双向的对象
enum PostStatus {
  // 使用 =, 也可以不指定 从0开始累加
  Draft = 1,
  Unpublished,
  Publiced,
}
// 可双向访问
PostStatus.Draft // => 1
PostStatus[1] // => Draft

// 常量枚举, 枚举的类型会被移除，并添加相应注释
const enum PostStatus1 {
  // 使用 =, 也可以不指定 从0开始累加
  Draft = 1,
  Unpublished,
  Publiced,
}

PostStatus1.Draft
PostStatus1.Unpublished

// --------------------------------------------------------------------

// 函数中的类型
function fun1(a: number, b: number): string{
  return "123"
}
// 必须传入同等个数的参数
fun1(12,1)

// 如果要传入多余的参数,可以使用剩余参数
function fun2(a: number, b: number,...res:number[]): string{
  return "123"
}

// -------------------------------------------------------------------

// 任意类型 any, 兼容无 ts 版本的js 
function stringify(value: any){
  return JSON.stringify(value)
}

// 隐式类型推断 
// 此时推断为 number
let age = 14

const nums = [1,2,3]
const res = nums.find(i=>i>0) // 推断为 number | string
// 断言
// 断言 方式1 as （推荐）
const num1 = res as number
// 断言 方式 2 <...>
const num2 = <number>res // <...> 可能和 一些语法有冲突

// ----------------------------------------------------------------------

// 接口 运行时会剔除
// 约定成员

// 必要要有 title 和 content
interface Post {
  title: string // 标准以；结束，也可以
  content: string
  subtitle?: string // 标记 string | undefined, 可以没有此属性
  readonly summary: string // 初始化后不能再次修改
}

const hello: Post = { title:"hello",content: "hahhaha", summary: "hen hao"}

// 动态接口
interface Cache {
  [key: string]: string // key 可以为任务代表键
}

const cache1: Cache = {}

cache1.qq = "124"
cache1.weixin = "321"

// ---------------------------------------------------------

// 类

class Person {
  public name: string // 可以在 = 号 赋值, 默认为public
  private age: number // 私有属性,只能父类中访问的属性
  protected gender: boolean // 受保护属性
  readonly salary: number // 内部和外部都不能 修改，如果已经有 修饰符 应该放在 修饰符的 后面
  constructor (name: string, age: number){
    this.name = name
    this.age = age
  }

  sayHi(msg: string){
    console.log(`hello ${msg}`)
  }
}

class Student extends Person {
  // constructor 被标识 private 后 只能在内部别使用了，不能被继承，protected 标识的 可以被继承
  private constructor(name: string, age:number){
    super(name, age)
    // console.log(this.age)
  }
  // 如果 构造函数被 保护，可以在内部 通过静态方法访问到
  static create (name: string, age: number){
    return new Student(name, age)
  }
}

const tom = new Person("tom", 18)

// --------------------------------------------------------------------------------------------

// 类 与 接口 之间的关联和区别
// 一些相同的特性，不适合抽象成公共的父类，eat,run 方式不同
// 接口的定义应该尽量 简单，方便组合接口
// interface EatAndRun{
//   eat (food: string): void
//   run (distance: number): void
// }

interface Eat {
  eat (food: string): void
}

interface Run {
  run (distance: number): void
}

class Person1 implements Eat, Run{
  eat(food: string): void {
    console.log(`优雅的吃${food}`)
  }

  run(distance: number){
    console.log(`直立行走${distance}`)
  }
}

class Animal implements Eat, Run{
  eat(food: string){
    console.log(`呼噜呼噜的吃${food}`)
  }

  run(distance: number){
    console.log(`各种走${distance}`)
  }
}

// -------------------------------------------------------------

// 抽象类（比较概括的事物对象）抽象类可以实现一些方法能被继承, 不能new 
abstract class AnimalNew {
  eat (food: string): void{
    console.log(`呼噜呼噜的吃${food}`)
  }
  // 抽象中的方法 相当于定义了 一个接口,在继承的子类中必须被实现
  abstract run(distance: number): void
}

class Dog extends AnimalNew {
  // 必须被实现
  run(distance: number): void {
    console.log()
  }
}

// --------------------------------------------------------

// 泛型 （调用时指定类型）
// 下面的函数只能创建函数类型的参数
function createNumberArray(length: number,value:number):number[] {
  const arr = Array<number>(length).fill(value)
  return arr
}
// 下面的 可以创建任务类型的数组
function createArray<T>(length: number,value:T):T[] {
  const arr = Array<T>(length).fill(value)
  return arr
}

// ----------------------------------------------------------------

import { camelCase } from "lodash"
// declare function camelCase(input: string): string
// 不申明 不会提示，可以 手动申明, 可以install 对应的类型申明，一些 npm 可能会包含类型申明模块
// lodash 可以 npm i --save-dev @types/lodash
camelCase("hello_world")









