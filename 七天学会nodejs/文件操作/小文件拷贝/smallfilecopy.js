var fs = require('fs');
var argv = require('argv');
//var tst1 = require('./tst1.txt');
//var tst2 = require('./tst2.txt');



/*
　　原版本
*/
var fs = require('fs');

function copy(src, dst) {
    fs.writeFileSync(dst, fs.readFileSync(src));
}

function main(argv) {
    copy(argv[0], argv[1]);
}

main(process.argv.slice(2));


/*
  改进后版本1
*/
var content = fs.readFileSync('tst1.txt','utf-8');

fs.writeFileSync('tst2.txt',content)
console.log(content);

fs.writeFile('tst1.txt',fs.readFileSync('tst2.txt','utf-8'),(err)=>{
	if(err) throw err;
	console.log('copy ok!')
});


/*
  改进后版本2
*/
function copy(src,dst){

    fs.writeFileSync(dst,fs.readFileSync(src,'utf-8'));
}

function main(){
    //copy(argv[0],argv[1]);}
    copy('tst1.txt','tst2.txt');
}

 main();

