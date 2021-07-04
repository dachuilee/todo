import _ from "lodash";
function component() {
  const element = document.createElement('div');

  // lodash（目前通过一个 script 引入）对于执行这一行是必需的
  element.innerHTML = _.join(['Hello', 'webpack'], ' ');

  return element;
}

document.body.appendChild(component());


function makerPower(power){
  return function(number){
    return Math.pow(number,power)
  }
}

let power2 = makerPower(2)

let power3 = makerPower(3)


console.log(power2(4))
console.log(power2(5))
console.log(power3(4))