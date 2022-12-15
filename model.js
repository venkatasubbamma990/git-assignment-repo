let mongoose = require('mongoose');
let userSchema = new mongoose.Schema({
    name:{ type:String, required:true},
    email:{ type:String, required:true,unique:true},
    password:{ type:String, required:true}
})
let User = mongoose.model('user',userSchema);
//module.exports = User;
let postSchema = new mongoose.Schema({
    title:{type:String,required:true},
    body:{type:String},
    image:{type:String},
    user:{type:String,required:true}
})
let Post = mongoose.model('post',postSchema);
module.exports = {User,Post}