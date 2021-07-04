const express = require('express');
const app = express();
const morgan = require('morgan');
const mongoose = require('mongoose');
const blogRoutes= require('./routes/blogRoutes');


//connecting to mongoDB
const dbURI = 'mongodb+srv://animesh:4405tiger@nodeproj1.fvwrz.mongodb.net/nodeProj1?retryWrites=true&w=majority';
mongoose.connect(dbURI, {useNewUrlParser: true, useUnifiedTopology: true})// withoout that second object argument,
//-output would have thrown deprication warning. **Now this is some async task and thus goes out and takes some time to do,
//-therefore  it returns something like a promise and thus we can add a .then to it.
  .then(()=> {app.listen(3000);// coz we dont want to be listening if the connection to server isn't made.
    console.log('connected to DB')})
  .catch((err)=>{console.log(err)});
// this then method will fire after this connection is complete that is when its conneted to database.

//register view engine
app.set( 'view engine','ejs');
// its default folder to see for ejs is views only.
//if we want a different folder to be looked, we gove another app.set('views','myviews');

//listen for requests
//app.listen(3000);
//**this also returns a instance of srver like createserver did.


//----******middleware and static files******-------------
app.use(express.static('public'));// now everything inside public folder is available as 
//static file , and node knows to only look into this folder
app.use(express.urlencoded({ extended: true}));// middleware for post request of submit button on create-blog page. url encoded data ko object me convert karta hai.
app.use(morgan('dev'));

/*---middleware self made-------
app.use((req,res,next)=>{ 
console.log('new request made');
console.log('host: ', req.hostname);
console.log('path:', req.path);
console.log('method:', req.method);
next();
}); // this is a middleware, which is any code which always run in server 
//in between request and response. we use app.use(), coz it fires for every function.
app.use((req,res,next)=>{
  console.log(' 2nd middleware function called');
  next();
}); */



/* =====================*****sandbox routes******======================
//mongoose and mongo sandbox routes
app.get('/add-blog',(req,res)=>{
  const blog = new Blog({
    title:'new blog',
     snippet:'about my new blog',
      body:'more about my new blog'
  });// new instance of blog doc within the code using Blog model. and the number of times we run this 'node app', those number of times this document will be saved in the collection.

  blog.save()// method usedd to save new doc onto our database. under the hood mongoose says ,'okay, we've use Blog model so i've to look for the Blogs collection in database'.
   .then((result)=>{
   res.send(result) 
    
   })
   .catch((err)=> console.log(err));
})

app.get('/all-blogs',(req,res)=>{
  Blog.find()//.find() method gets us the all the doc enteries in that collection.
  .then((result)=>{
   res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });

})
 so when we are saving, we use an instance method on an instance , but when we are finding or want to display all, we use a method directly on the model. 


app.get('/single-blog',(req,res)=>{
  Blog.findById('6085095236dfda27bccbff12')
  .then((result)=>{
    res.send(result);
  })
  .catch((err)=>{
    console.log(err);
  });
})
*/
// =========*******ROUTES*******============
app.get('/',(req,res)=>{
 /*------yha se views me output karana----------
  const blogs = [
    {title:'raghav finds eggs', snippet:'lorem ipsum dolor sit amet consectetutor'},
    {title:'reeha finds eggs', snippet:'lorem ipsum dolor sit amet consectetutor'},
    {title:'kisiko nhi mila', snippet:'lorem ipsum dolor sit amet consectetutor'}
  ];
  //res.sendFile('./views/index.html',{root: __dirname});
  res.render("index1", {title: 'home', blogs //blogs: blogs });//express will automatically find index1 in views, and will render it .*/
  
 res.redirect('/blogs');
});
//res.send('<h1>lalalal</h1>');
// good thing about send is that it automatically infers the content type, 
//and thus sets the header.
// also infers the status code, other thank obvio doing job of write.
app.get('/about',(req,res)=>{
   // res.send('<h1>lalalal</h1>');
 //res.sendFile('./views/about.html',{root: __dirname});
 res.render('about1', {title: 'about'});
});

//++++++++++++++++blog routes++++++++++++++++
app.use(blogRoutes);// we can even scope these out by = app.use('/blogs', blogRoutes); toh ab jha jha in blogRoutes file me , '/blogs' hoga wha ab bas 
// - '/' isse kaam chal jayega. its a good method if we want to change url later.
/*so it says , okaay i'm gonna look at this file, and all all those handlers/routes in it to app */ 



//404 page,, use() is used for middleware
app.use((req,res)=>{
res.status(404).render('4041', {title: '404 Error'});
});
/* what happens is that use() is gonna fire up for each request,, but as express runs top to bottom
, therefore, it only fires up if it reaches that point, therefore, use() shwall be used at the end
. if express mtches anny of the get() parameters, it fires callback functiion, and doesnot look ahead 
for more matches. if it doesnotmatches , it keeps looking. if nothing matches atleast in the end use()
 fires up
 as the express doesnot know that its a error, coz it doesnot know whats in the 404 html file, so we 
 need to set the status code, and yes we can chain them.
 */
 /*redirect wla.
 app.get('/about-us',(req,res) => {
  res.redirect('/about');
  //under the hood express forces the servr with a new request for, this /about.
  });
  
  */

  /* *************####################################################*****************
   we can use middleware that come shipped with express to serve  our static files
  like CSS files or html pages.
   we cannot referrence css files even by link rel = stylesheet, link = ./etc. 
   so for refferencing those we need to use the inbuilt express middleware like static middleware.

  static files = images, css, -- that we gonna ,make public.
  */