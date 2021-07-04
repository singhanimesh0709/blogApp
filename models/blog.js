const mongoose = require('mongoose');
const Schema = mongoose.Schema;
//.Schema is actually a constructor , with properties, that it'll help us to set for the model.


const blogSchema = new Schema({
title:{type:String, required: true},
snippet:{type : String, required : true},
body:{type : String, required : true}
}, {timestamps: true});// the object that we pass as the parameter is what descriibes the structure of the document that want to put in collection.
// tis is mongoose creatting a schema for us , where we tell it what properties we want.

const Blog = mongoose.model('Blogs', blogSchema);
//model names starts with capital letter, and name of model as  that .model parameter is important, coz its gonna pluralize the name and then look for it in database.
// here the Blog is the model, and while 'Blogs'is the name of collection doc its going to look for. so from now on whenever we'll use blog model, we don't have to specify 
// to look for Blogs in collection, coz we already did, and now we have all the facilities in to access that collection in our database. we have access to diff methods provided 
// by the model. basically, Blog likha toh apne aap Blogs collection khojega.

module.exports = Blog;

/* as we  are only exporting Blog model, so when we require this file in app.js, we'll get just this this Blog model ka properties.
so now we have our blogSchema, and our Blog model, with the help of which we can 
*/




