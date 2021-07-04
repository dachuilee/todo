function curry(fn){
	return function curriedFn(...args){
   if(args.length < fn.length){
   	return function(...argsI){
    	return curriedFn(...args.concat(argsI))
    }
   }
    return fn(...args)
  }
}

function getSum(a,b,c){
	return a+b+c
}

let curriedSum = curry(getSum)
console.log(curriedSum(1)(2,3))
console.log(curriedSum(1)(2)(3))
