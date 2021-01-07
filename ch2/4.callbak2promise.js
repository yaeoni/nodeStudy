// 기존 callback
function findAndSave(Users){
    Users.findOne({}, (err, user)=>{ // 1st callback
        if(err){
            return console.log(err);
        }
        user.name = 'zero';
        user.save((err)=>{ // 2nd callback
            if(err){
                return console.log(err);
            }
        })
        Users.findOne({ gender : 'm'}, (err, user)=>{ // 3rd callback
            // ...
        })
    })
}
// 콜백 함수가 나올 때마다 코드의 깊이가 깊어지고, 복잡해짐.

/* callback To promise */
function findAndSave2(Users){
    Users.findOne({})
        .then((user)=>{
            user.name = 'zero';
            return user.save();
        })
        .then((user)=>{
            return Users.findOne({gender:'m'});
        })
        .catch(err=>{
            console.error(err);
        })
}
/*  then method들은 순차적으로 실행된다.
 *  error처리도 한 번에 할 수 있다.
 *  하지만 이런 방식은 기본적으로 메서드가 프로미스 방식을 지원해야함. (findOne, save는 내부적으로 프라미스 객체 가진다 가정함)
 */