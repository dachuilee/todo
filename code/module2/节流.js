function myThrottle(handle,wait){
    if(typeof handle !== 'function') throw new TypeError('handle must bu an function')
    if(typeof wait === "undefined")
    // 记录上一次的执行时的事件
    let previous = 0
    let timer = null

    // 通过返回一个函数绑定事件
    return function proxy(...args){
        let now = new Date()
        let self = this
        let interval = wait - (now - previous)
        
        if(interval<=0){
            // 处于间隔周期点上时，需要清除计时器，保证下个周期正常执行
            if(interval){
                clearTimeout(timer)
                timer = null
            }
            
            handle.call(self,...args)
            previous = new Date()
        }else if(!timer){
            timer = setTimeout(()=>{
                // timer 只能在计时器中清除同一个周期的其他及时器
                clearTimeout(timer)
                timer = null
                handle.call(self,...args)
                previous = new Date()
            },interval)
        }
    }
}