const person = {
  name: "jsonlee",
  age: 20
}

// 监听对象属性的访问和设置
const personProxy = new Proxy(person,{
  get(target,property){
    console.log(target,property)
    // { name: 'jsonlee', age: 20 } name
    return property in target?target[property]: undefined
  },
  set(target,property,value){
    // value 为设置的值
    if(!Number.isInteger(value)){
      throw new TypeError(`${value} is not an int`)
    }
    target[property] = value
  }
})

personProxy.age = 123


// proxy 内部使用 Reflect的API
const proxy = new Proxy(obj,{
  get(target, property){
    console.log(target,property)
    return Reflect.get(target, property)
  }
})

const s = new Set()
s.add(1).add(2) // 可链式调用
s.forEach((i)=>console.log(i))
s.has(1)
s.clear()
s.size // 集合的长度


// 实现对象迭代器

const obj = { 
  foo:"1",
  bar:"2",
  baz: "3",
  [Symbol.iterator](){
    let index = 0
    let arr = Object.keys(this)
    const self = this
    return {
      next(){
        const result = {
          value: arr[index],
          done: index >= arr.length
        }
        index++
        return result
      }
      
    }
  }
}