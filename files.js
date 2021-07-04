const fs = require('fs');

//--------******reading files*******---------
fs.readFile('./docs.txt',(err,data)=>{
    if(err){
        console.log(err);
    }
    //console.log(data);
    console.log(data.toString());
});// this method is async, and thus requires a callback function.
// parameters taken aree err and data, if error is found, it's is  in output, if  not then data is output.
// data is actually a buffer, and not actual data. 
// if we want actual data, the we need to do data,toString(), that'll give data.
 console.log('last line');
 /* we'll se in outputthat last line will come above the 
 docs.txt text, coz that function is async and thus it'll take sime tim e in executing and 
 and when that happens it fires up the call back function,
 but while it does that as async is non bbllocking it continues with the rest of the code. thus last line 
 is outpput before docs.txt  text. */
 

 //------------------********writing files*******---------------
 fs.writeFile('./docs.txt','its okay to be not okay',()=>{
   console.log('writing the file');  
 });
 /* if we try a to write a non exitent file, it'll create one 
 with it's name.*/
 fs.writeFile('docs2.txt','naya ban gya na',()=>{
     console.log('bna diya nya file');
 });
//-------------***********directories**********-----------
 /*
 fs.mkdir('./assets',(err)=>{
if(err){
    console.log(err);
}
console.log('folder created');
}); 
*/
/* so if we run it again it says that it already exists.*/
if(!fs.existsSync('./assets')){
    fs.mkdir('./assets',(err)=>{
        if(err){
            console.log(err);
        }
        console.log('folder created');
        }); 
}
else{
    fs.rmdir('./assets',(err)=>{
       if(err){console.log(err);} 
       console.log('folder removed');
    });
}
// existsSync is synchronous, thus fast, and will check if assets folder exists 
// or not. if it does not then  it'll create.
//-----------------******Deleting files*******----------------
if(fs.existsSync('./deleteme.txt')){
   
   fs.unlink('./deleteme.txt',(err)=>{
       if(err){
           console.log(err);
       }
       console.log('---- delete hua sala-----') ;
   });
}