const promise1 = Promise.resolve('성공1');
const promise2 = Promise.resolve('성공2');

/*  Promise가 모두 resolve될 때까지 기다렸다가 then으로 으로 넘어감. 
 *  Promise 중 하나라도 reject되면 catch로 넘어감.
 *  비슷하게 Promise.reject() 함수 존재. */

Promise.all([promise1, promise2])
    .then((result)=>{
        console.log(result);
    })
    .catch((error)=>{
        console.log(error);
    })