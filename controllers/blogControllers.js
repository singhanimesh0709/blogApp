const Blog = require('../models/blog');// as we are now using blog routes here  therefore we dont it anymore in the app.js file.


const blog_index = (req,res)=>{
    Blog.find().sort({createdAt : -1 }) /* -1 means descending order*/  
    .then((result)=>{
    res.render('index1',{title: 'All Blogs', blogs: result});// remember ye abhi DB ke blogs ko pass  kar rha hai as data to views.kyuki reult has DB ka data.
    // jaise ki humne dekha tha in the output, that data(result joki .find() ne wapis diya tha, tabhi then fire hua) is an array of objects, therefore index1.ejs ka code usse sambhal lega.
    //property naam blogs hi rakh rhe taaki code na badalna pade in index1.ejs . *** .render() method se data hum object parameter ke taur pe bhejte hai.
    })
    .catch((err)=>{
      console.log(err);
    }) 
}


const blog_create_post = (req,res)=>{
    // first of all to get access to data (title, snippet, body in create.ejs) jo submit button dabane pe milta, we'll need to use some Middlewware, 
    //which is gonna pass the data into a workable format which we gonna use and attach it to ' req ' object.
   
    const blog = new Blog(req.body)
   blog.save()
    .then((result)=>{
     res.redirect('/blogs')
   })
    .catch((err)=>{
     console.log(err);
   });
}

const blog_create_get = (req,res)=>{
    res.render('create', {title : 'create'});
}


const blog_details = (req,res)=>{
    const id = req.params.id;
    
    Blog.findById(id)
    .then((result)=>{
      res.render('details',{blog: result , title:'Blog Details'});
    })
    .catch((err)=>{
        res.status(404).render('4041',{title: 'Blog not found'});
    });
}

const blog_delete =(req,res)=>{
    const id = req.params.id;// req me toh wohi ayyega jo hum apne details.ejs se bhejenge, therefore uspe req,params.id lagaya.
    Blog.findByIdAndDelete(id)
    .then((result)=>{
     // here we won't redirect, coz in NODE we cannot use redirect as response for an AJAX request(which  is what we used in our details.ejs file).
     // so we can send JSON or text data as a response back to the browser . so we send JSON which is gonna have a redirect property.
     res.json({
       redirect: '/blogs'
     });//typical response way to use for an API, where its using javascript to get data, or delete data.
     
    })
    .catch(err=> console.log(err));
}


module.exports ={
    blog_index, blog_details, blog_delete, blog_create_get, blog_create_post
};