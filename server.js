const http = require('http');
const fs = require('fs');
const _ = require('lodash');


const server = http.createServer((req,res)=> {
 //lodash
 var num = _.random(0,25);
 console.log(num);
 //set header content type
 res.setHeader('Content-Type','text/html');


//basic routing
let path = './views/';
switch(req.url){
    case '/about':
        path += 'about.html';
        res.statusCode = 200;
        break;
    case '/about-us':
        res.statusCode = 301;
        //redirecting
        res.setHeader('Location','/about');  
        res.end();
        
         break;
    case '/':
        path += 'index.html';
        res.statusCode = 200;
        break;

    default:
        path += '404.html';
        res.statusCode = 404; 
        break;      
}
 // send an html file
 fs.readFile(path,(err,data)=>{
if(err){
    console.log(err);
    res.end(); 
}
else{
  //res.write(data);
  
  res.end(data);  
}
 }); 
});
 /*res.write('<h1>hello ani</h1>');
 res.write('<h3>you have got to win this man</h3>');
 res.end(); */
//we can store the server if we want to in a const, but not neccesary.
//just did to be safe for future uses.
//callback function runs everytime the request comes in.
 
server.listen(3000,'localhost',()=>{
console.log('listening for request on port 3000');
});


//default value itself is localhost.callback fires up whwn we start listening.
// localhost is the host name, and port is 3000.
/* localhost uses a loopback ip address which points directly back to its
own system. its equal to 127.0.0.1
therefore its listening to requests coming to our own computer
for the website 
port numbers= are like doors in our computer.
port number 3000 is reserved for local web Dev. 

in address bar we type like 
localhost:3000
*/



