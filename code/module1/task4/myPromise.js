const { xor } = require("lodash")

// 使用常量 管理promise 状态
const PENDING = "pending"
const FULLFILLED = "fullfilled"
const REJECTED = "rejected"

function resolvePromise(curPromise,res,resolve,reject){
  // 当回调返回的 promise 和 .then 返回的promise 是同一个 promise时 会形成循环调用promise then方法
  if(curPromise == res){
    // 抛出错误 不执行后面的代码
    return reject(new TypeError("Chaining cycle detected for promise #<Promise>"))
  }

  // 需要判断是否返回的也是一个 Promise
  if(res instanceof MyPromise){
    // 根据回调返回的promise状态 传入 resolve,reject 改变返回的promise 状态
    res.then(resolve,reject)
  }else{
    // 改变当前promise 状态
    resolve(res)
  }
}

class MyPromise {
  // 传入执行器 并立即执行
  constructor(executor){
    // 执行器中的错误需要被 reject捕获
    try {
      // 接收当前promise的 resolve 和 reject 回到
      executor(this.resolve,this.reject)
    }catch(err){
      this.reject(err)
    }
  }

  // 默认 promise 状态 pending
  status = PENDING
  // 保存resolve 返回的值,方便保存和返回给 下一个promise
  value = undefined
  // 保存错误信息
  reason = undefined

  // 同一个promise .then() 可能被调用多次，需要存储每次的 回调函数
  successCallback = []
  failCallback = []

  // 使用箭头函数方便传递 this 改变promise状态和结果
  resolve = value=>{
    // 保证promise 状态不可逆
    if(this.status !== PENDING) return
    // 改变promise 状态
    this.status = FULLFILLED
    // 保存resolve 回调返回的值
    this.value = value

    // 执行成功回调
    while(this.successCallback.length) this.successCallback.shift()()
  }

  reject = reason=>{
    if(this.status !== PENDING) return
    this.status = REJECTED
    // 保留 err, 方便链式传递
    this.reason = reason

    // 执行失败回调
    while(this.failCallback.length) this.failCallback.shift()()
  }

  // then 方法链式调用
  then(successCallback,failCallback){
    // 需要返回一个新的 promise 对象 方便链式调用
    // 如果then() 方法内未传入promise 需要传递promise 结果
    successCallback = successCallback?successCallback:(value)=>value;
    // .catch 或者 未传入 failCallback 需要传递上个promise 的错误
    failCallback = failCallback?failCallback:(reason)=>{throw reason};

    // 创建新的promise 对象
    let curPromise = new MyPromise((resolve,reject)=>{
      // 根据状态执行 不同回调
      // 因为 new MyPromsie 的时候 内部的执行器已经执行，无法获取到 当前的promise,所以需要借助 异步实现
      setTimeout(()=>{
        try{
          // 调用成功回调
          if(this.status === FULLFILLED){
            // 此时传入 上个promise 的处理结果 如果回调函数 有返回值，需要再次做出判断，传递promsie 结果
            let res =  successCallback(this.value)
            // 对回调函数的 结果进行 处理并传递结果
            resolvePromise(curPromise,res,resolve,reject)
          }else if(this.status === REJECTED){
            // 调用失败回调
            let res = failCallback(this.reason)
            resolvePromise(curPromise,res,resolve,reject)
          }else{
            // 如果是异步代码，需要将回调存储起来
            // 使用函数包裹起来，方便执行 判断逻辑
            this.successCallback.push(()=>{
              let res = successCallback(this.value)
              resolvePromise(curPromise,res,resolve,reject)
            })

            this.failCallback.push(()=>{
              let res = failCallback(this.reason)
              resolvePromise(curPromise,res,resolve,reject)
            })

          }

        }catch(err){
          reject(err)
        }
        
      },0)
      
    })

    return curPromise
  }

  // catch 使用then 方法传入回调
  catch(failCallback){
    this.then(undefined,failCallback)
  }
  finally(callback){
    // 调用 then 无论成功或者失败 均执行回调 返回上个 promise的结果 和错误 方便传递
    return this.then(value=>{
      return MyPromise.resolve(callback()).then(()=>value)
    },reason=>{
      return MyPromise.resolve(callback()).then(()=>{throw reason})
    })
  }

  static resolve(value){
    if(value instanceof MyPromise) return value
    return new MyPromise(resolve=>resolve(value))
  }

  static all(array){
    // result 记录每次的结果
    let result = [];
    // 使用 index 记录完成的次数
    let index = 0;
    return new MyPromise((resolve, reject) => {
      // 添加结果 并在 所有promise 完成后 resolve
      function addData (key, value) {
        result[key] = value;
        index++;
        if (index === array.length) {
          resolve(result);
        }
      }
      for (let i = 0; i < array.length; i++) {
        let current = array[i];
        if (current instanceof MyPromise) {
          // 如果有一次失败 就reject
          current.then(value => addData(i, value), reason => reject(reason))
        }else {
          // 普通值
          addData(i, array[i]);
        }
      }
    })
  }
}