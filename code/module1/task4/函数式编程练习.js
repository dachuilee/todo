const fp = require("lodash/fp")
const cars = [
  {name:"A",horsepower: 660,dollars_value:70000,in_stock: true},
  {name:"B",horsepower: 800,dollars_value:13000,in_stock: true},
  {name:"C",horsepower: 300,dollars_value:5000,in_stock: false},
  {name:"D",horsepower: 1000,dollars_value:20000,in_stock: false}
]

// 源代码
let isLastInstock = function (cars){
  let last_car = fp.last(cars)
  return fp.prop("in_stock",last_car)
}

// 使用flowRight改造
let isLastInstock2 = fp.flowRight(fp.prop("in_stock"),fp.last)
console.log(isLastInstock2(cars))

// 获取第一个cars 的name 属性
let getCarName = fp.flowRight(fp.prop("name"),fp.first)
console.log(getCarName(cars))

// averageDollarValue 源码
let _average = function(xs){
  return fp.reduce(fp.add,0,xs)/xs.length
}

let averageDollarValue = function(cars){
  let dollars_values = fp.map(function(car){
    return car.dollars_value
  })
  return _average(dollars_values)
}

// 改造计算过程
let averageDollarValue2 = fp.flowRight(_average,fp.map(fp.prop("dollars_value")))
console.log(averageDollarValue2(cars))

// 下划线 Hello World =》hello_world
let _underscore = fp.replace(/\W+/g,"_")
console.log(_underscore("Hello World"))

let handleUnderLine = fp.map(fp.flowRight(fp.toLower,_underscore))
console.log(handleUnderLine(["Hello World"]))


// 函子类编程练习
let {Container,Maybe} = require("./support.js")
let maybe = Maybe.of([5,6,1])

// 让 funtor 增值的 函数 ex1
let ex1 = (num)=>{
  return fp.map(fp.add(num))
}
console.log(maybe.map(ex1(4)))


let xs = Container.of(["do","ray","me"])
// 练习2
let ex2 = ()=>{
  return fp.first
}
console.log(xs.map(ex2()))

// 练习3
let safeProp = fp.curry(function(x,o){
  return Maybe.of(o[x])
})

let user = {id: 2,name: "Alert"}

let ex3 =()=>{
  return safeProp("name")(user).map(x=>x[0])
}

console.log(ex3())

let ex4 = function(n){
  if(n){
    return parseInt(n)
  }
}

let ext5 = Maybe.of(n).map(x=>parseInt(x))



