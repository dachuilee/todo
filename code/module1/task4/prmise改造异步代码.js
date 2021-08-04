// 源代码
setTimeout(()=>{
  var a = "hello"
  setTimeout(()=>{
    var b = "lagou"
    setTimeout(()=>{
      var c = "I love you"
      console.log(a+b+c)
    },10)
  },10)
},10)

// 改造
new Promise((resolve)=>{
  setTimeout(()=>{
    resolve("hello")
  },10)
}).then((res)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(res+"lagou")
    },10)
  })
  
}).then((res)=>{
  return new Promise((resolve)=>{
    setTimeout(()=>{
      resolve(res+"I love you")
    })
  })
}).then(res=>{
  console.log(res)
})