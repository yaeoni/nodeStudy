const fs = require('fs').promises;

fs.writeFile('./write.txt', '글 입력합니다.')
    .then(()=>{
        return fs.readFile('./write.txt');
    })
    .then((data)=>{
        console.log(data);
        console.log(data.toString());
    })
    .catch((err)=>{
        console.log(err);
    })