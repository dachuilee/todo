### 异步编程
#### 起源：
  javaScript 为了方便dom稳定有序地渲染就被设计为单线程方式，不会存在性能消耗，更安全, 如果有比较耗时的任务存在，就会表现为假死状态，所以需要异步编程去执行一些任务，例如：ajax请求，也可以需要多线程任务环境执行 如：web worker
#### 异步编程的工作机制
  js 和webApi 按执行机制分为 宏任务和微任务
1. 宏任务：
  script(整体代码)
  setTimeout setInterval 
  I/O 
  UI交互事件 
  postMessage 
  MessageChannel 
  setImmediate(Node.js 环境)
2. 微任务
  Promise 
  Object.observe 
  MutaionObserver 
  process.nextTick(Node.js 环境)

  宏任务：可以理解为当前执行堆栈中运行的任务
  微任务：需要等待执行结果的任务

  代码执行过程中 遇到需要等待执行的任务 将其放入消息队列中， 等当前执行堆栈任务执行完毕，event loop 开始起作用，执行微任务中的消息队列，直到消息队列清空，开始执行宏任务消息队列中的任务，直至清空，等待下一任务

  放入消息队列中的任务，通过回调函数的方式执行，回调函数因为作用域中保留相关的作用域链，从而能找到相关的执行上下文，从而保证任务能够顺利进行


