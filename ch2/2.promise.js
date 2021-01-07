/* Rule of promise */

const condition = true;

const promise = new Promise( (resolve, reject) => {
    if(condition) resolve('success')
    else reject('fail')
});

// 다른 코드 삽입 가능
promise
    .then((message)=>{
        // resolve에서 받은 인자가 매개변수 Message로 들어옴
        console.log(message);
    })
    .catch((error)=>{
        // reject에서 받은 인자가 매개변수 error로 들어옴
        console.log(error);
    })
    .finally(()=>{
        console.log('무족권 실행')
    })


promise
    .then((message)=>{
        /* then이나 catch 안에서 다른 then이나 catch 붙일 수 있음 */
        return new Promise((resolve, reject)=>{
            resolve(message); // 다음 then에서 매개변수로 받을 수 있음.
        })
    })
    .then((message2)=>{
        console.log(message2);
        return new Promise((resolve, reject)=>{
            resolve(message2);
        })
    })
    .then((message3)=>{
        console.log(message3);
    })
    .catch((error)=>{
        // reject에서 받은 인자가 매개변수 error로 들어옴
        console.log(error);
    });