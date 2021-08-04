function myDebounce(handle,wait,immediate){
    // 处理传参
    if(typeof handle === "function") throw new TypeError("事件处理不是一个函数")
    if(typeof wait === 'undefined') wait = 300
    if(typeof wait === "boolean") immediate = wait
    if(typeof immediate !== "boolean") immediate = false

    // 通过timer 记录计时器，并且判断 计时器是否在启动过程中（null 没有计时器）
    let timer = null

    // 需要返回一个函数 这里需要一个普通函数保留 this
    return function proxy(...args){
        let self = this
        clearTimeout(timer)
        timer = setTimeout(()=>{
            // 计时器回调执行的时候 清空 timer，计时器不为空 代表计时器还在工作中
            timer = null
            immediate && handle.call(this,...args)
        },wait)

        // timer 已经存在时 不需要立即执行
        (immediate && !timer) && handle.call(this,...args)
    }
}