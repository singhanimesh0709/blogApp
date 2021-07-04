const express = require('express');
const router = express.Router();
const blogControllers = require('../controllers/blogControllers');


// as the app. was no meaning here therefore we changed it, coz we have express app in that other file(app.js), and thus that would not work here.
// router is like a mini app, it's like an app but standing alone it cant do shit, it has to be used in an app.


router.get('/blogs', blogControllers.blog_index);/* can be written as - router.get('/',(req,res)=>{ ...    if used scoped in app.js when doing app.use*/
   
    
router.post('/blogs',blogControllers.blog_create_post);/* can be written as - router.get('/',(req,res)=>{ ...    if used scoped in app.js when doing app.use*/
    
    
router.get('/blogs/create',blogControllers.blog_create_get);/* can be written as - router.get('/create',(req,res)=>{ ...  if used scoped in app.js when doing app.use*/
        
    
router.get('/blogs/:id', blogControllers.blog_details);/* can be written as - router.get('/:id',(req,res)=>{ ...  if used scoped in app.js when doing app.use*/
     
    
router.delete('/blogs/:id',blogControllers.blog_delete);
    


module.exports = router;