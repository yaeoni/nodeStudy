/* 2.1.5 구조분해 할당 */

/* 두 가지 다 같은 결과 */

var candyMachine = {
    status: {
        name: 'Node',
        count: 5,
    },
    getCandy : function(){
        this.status.count--;
        return this.status.count;
    },
};

var getCandy = candyMachine.getCandy
var count = candyMachine.status.count

console.log(getCandy)
console.log(count)

//////////////////실행은 따로 주석처리하고 해야함 ////////////////////////

var candyMachine = {
    status: {
        name: 'Node',
        count: 5,
    },
    getCandy(){
        this.status.count--;
        return this.status.count;
    },
};

const {getCandy, status:{count}} = candyMachine

console.log(getCandy)
console.log(count)