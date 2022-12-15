const config = require('config');
let express = require('express');
let {body,validationResult} = require('express-validator')
let jwt = require('jsonwebtoken');
const secret = "RESTAPIAUTH";
let imported = require('./model')
let User = imported.User
let Post = imported.Post
let dotenv = require('dotenv')
let app = express();
let bcrypt = require('bcrypt')
const  hash  = require('bcrypt');
let bodyParser = require('body-parser')
dotenv.config();
app.use(bodyParser.json())
app.get('/',(request,response)=>{
    response.send('welcome to mongodb')
})
/* "name":"rvind",
"email":"rvind@gmail.com",
"password":"rvaind1234" */


/* "title":"this is kalyan",
  "body":"picnic photos",
  "image":"https://cdn.pixabay.com/photo/2015/04/23/22/00/tree-736885__480.jpg",
  "user":"kalyan"
     */
app.post('/register',
body('email').isEmail(),
body('password').isLength({min:5,max:15}),
 async (request,response)=>{
    try{
        let errors = validationResult(request)
        if(!errors.isEmpty()){
            return response.status(400).json({errors:errors.array()})
        }
        let {name,email,password} = request.body;
    let user = await User.findOne({email})
    if(user){
        response.status(409).json({
            status:'failure',
            message:'user already exists with the given email'
        })
    }
    
        bcrypt.hash(password,10,async function (err,hash){
            if(err){
                return response.status(500).json({
                    status:'failed',
                    message:err.message
                })
            }
        

    user = await User.create({
        name:name,
        email:email,
        password:hash
    });
    response.json({
        status:'sucesss',
        message:'user successfully created',
        user
    });
})
    }
    catch(e){
        response.json({
            status:'failure',
            message:e.message
        })
    }

})  

  
  
app.post('/login',
body('password').isLength({min:5,max:15}),
 async (request,response)=>{
   try{
    let errors = validationResult(request)
    if(!errors.isEmpty()){
        return response.status(400).json({
            errors:errors.array()
        })
    }
    let {email,password} = request.body;
    let user = await User.findOne({email});
    if(!user){
        return response.status(400).json({
            status:'failed',
            message:'already account exist'
        })
    }
    bcrypt.compare(password,user.password,(err,result)=>{
        if(err){
            response.status(400).json({
                status:'failure',
                message:err.message

            })
        }
        if(result){
            const token = jwt.sign({
                exp: Math.floor(Date.now() / 1000) + (60 * 60),
                data: user._id
              }, secret);



            return response.json({
                status: "Success",
                message: "Login Succesful",
                token
            })
        }
        else {
            return response.status(401).json({
                status: "Failed",
                message: "Invalid credentials"
            })
        }
   
   })
}
catch(e){
    response.json({
        status:'failure',
        message:e.messsage
    })
}
}) 

app.get('/posts',async (request,response)=>{
    try{
        let post = await Post.find()
        response.status(200).json({
            status:'success',
            post : post
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.get('/posts/:id',async (request,response)=>{
    try{
        let post = await Post.find({_id:request.params.id})
        response.status(200).json({
            status:'success',
            post : post
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.post('/posts',async (request,response)=>{
    try{
        let post = await Post.create(request.body)
        response.status(200).json({
            status:'post-created',
            post : post
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

})
app.put('/posts/:id',async (request,response)=>{
    try{
        let post = await Post.updateOne({_id:request.params.id},{$set:{name:request.name}})
        response.status(200).json({
            status:'success',
            post : post
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

})
app.delete('/posts',async (request,response)=>{
    try{
        let post = await Post.deleteOne(request.body)
        response.status(200).json({
            status:'post-created',
            post : post
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

})

module.exports = app