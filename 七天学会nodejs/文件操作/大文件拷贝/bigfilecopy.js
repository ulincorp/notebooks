var fs = require('fs');
var path = require('path'),out = process.stdout;
/*
  读取大文件原版
*/
// function copy(src,dst){
//     fs.createReadStream(src).pipe(fs.createWriteStream(dst));
// }

// function main(){
// 	copy('tst1.txt','tst2.txt')
// }

// main();


/*改进板*/
// var readStream = fs.createReadStream('/home/rxy/Downloads/ubuntu-14.04.4-desktop-amd64.iso');
// var writeStream = fs.createWriteStream('/home/rxy/Desktop/ubuntu-14.04.4-desktop-amd64.iso');

// readStream.on('data',function(chunk){//有数据流出时，写入数据
// 	//writeStream.write(chunk);
// 	if(writeStream.write(chunk)==false){//没有写完就暂停
// 		readStream.pause();
// 	}
// });

// writeStream.on('drain',function(){//继续读取数据
// 		readStream.resume();
// });

// readStream.on('end',function(){
// 	writeStream.end();
// });

// console.log('the copy task complited!')

/*改进详细版*/
var filepPath = '/home/rxy/Downloads/ubuntu-14.04.4-desktop-amd64.iso';

var readStream = fs.createReadStream(filepPath);
var writeStream = fs.createWriteStream('ubuntu-14.04.4-desktop-amd64.iso');

var stat = fs.statSync(filepPath);

var totalSize = stat.size;
var passedLength = 0;
var lastSize = 0;
var startTime = Date.now();

readStream.on('data',(chunk)=>{
	passedLength += chunk.length;
	if(writeStream.write(chunk)==false){
		readStream.pause();
	};
})

readStream.on('end',()=>{
	writeStream.end();
})

writeStream.on('drain',()=>{
	readStream.resume();
})

setTimeout(function show(){
	var percent = Math.ceil((passedLength/totalSize)*100);
	var size = Math.ceil([passedLength/1000000]);
	var diff = size - lastSize;
	lastSize = size;
	out.clearLine();
	out.cursorTo(0);
	out.write('已完成' + size + 'MB, ' + percent + '%,速度:'+ diff * 2 + 'MB/s')
    if(passedLength < totalSize){
    	setTimeout(show,500);
    }else{
    	var endTime = Date.now();
    	console.log();
    	console.log('共用时:' + (endTime - startTime)/1000 + '秒');
    }
},500);