
function component() {
  const element = document.createElement('h3');
  element.innerHTML = "hello indexedDB";

  return element;
}
const a = 1;
document.body.appendChild(component());
let promise = new Promise((resolve, reject) => {
  throw new Error()
})
window.addEventListener('unhandledrejection', function(target){
  
  console.log("err",target.reason)
})

const createBtn = document.querySelector("#initDB")
const addDataBtn = document.querySelector("#addData")
const boundIndex = document.querySelector("#boundIndex")

console.log(createBtn);

createBtn.addEventListener("click", () =>{
  console.log("点击",Dexie)
  var db = new Dexie("alicexDB");
  db.version(2).stores({
    taskListSchema: 'id,name,status,round,score,updateTime'
  });
  // 升级
  // db.version(2).stores({
  //   taskListSchema: 'id,name,status,round,score,updateTime,remark'
  // });
  db.taskListSchema.put({ id: 1, name:"樊家村一期1标段",status: 0 })
})

addDataBtn.addEventListener("click", async ()=>{
  // 打开已经存在 db 方式一
  // 对于已经存在的数据库 需要主动open()
  let db = await new Dexie("alicexDB").open()
  db.table("testSort").bulkPut([{md5:"biubiubiu",path:"../../../../../999"}])

  // 打开已经存在的 db 方式二
  // var db = new Dexie("alicexDB");
  // db.version(3).stores({
  //   taskListSchema: 'id,name,status,round,score,updateTime',
  //   testSort:"md5,path"
  // });
  // db.testSort.bulkPut([{md5:"djinglgsjgkd",path:"../../../../../123"},{md5:"abcding",path:"../../../../../456"},{md5:"dxdlgsjgkd",path:"../../../../../123"}])
})

boundIndex.addEventListener("click",async ()=>{
  let db = await new Dexie("alicexDB")
  // 下面的返回值为版本
  db.version(4).stores({
    compoundIndex: "id,[firstName+lastName],["
  })
  db.open()
  db.compoundIndex.bulkPut([{id: 1,firstName:"foo",lastName:"bar"},{id: 2,firstName:"lee",lastName:"dachui"},{id: 3,firstName:"foo",lastName:"dachui"}])
  db.compoundIndex.where({
    firstName:"foo",lastName:"bar"
  }).toArray(res=>{
    console.log("联合查询结果",res)
  })
})


