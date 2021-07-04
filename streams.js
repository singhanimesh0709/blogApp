const fs = require('fs');
const readStream = fs.createReadStream('./docs3.txt',{encoding: 'utf8'} );
const writeStream = fs.createWriteStream('./docs4.txt',);

/*
readStream.on('data',(chunk)=>{
console.log('---------------********New chunk************--------------------');
console.log(chunk);
writeStream.write('\nNEW CHUNK\n');
writeStream.write(chunk);
}); 
*/
//above thing can be done in a line by piping.
//-----------PIPING-------------
//piping can onnly be done froma readable input to a writable place.
readStream.pipe(writeStream);


