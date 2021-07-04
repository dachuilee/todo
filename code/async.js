// async function asyFn(){
//   return await new Promise( async(resolve, reject) =>{
//     resolve(5)
//   }).then(async(res)=>{
//     await Promise.resolve(res)
//   })
// }

// let a = asyFn()
// setTimeout(()=>{console.log(a)})

// new Promise((resolve, reject)=>{
//   resolve(5)
// }).then(()=>{
//   console.log("aaa")
// }).then().then(res=>console.log(res))

new Promise((resolve, reject)=>{
  console.log("aaa")
  setTimeout(()=>{console.log("bbbb")},2000)
  console.log("cccc")
}).then((res)=>console.log(res))

console.log(Promise.resolve("ddd"))
setTimeout(()=>{console.log("eeee")},1000)


