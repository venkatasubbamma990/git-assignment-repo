app.get('/users',async (request,response)=>{
    try{
        let user = await User.find()
        response.status(200).json({
            status:'success',
            user :user
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.get('/users/:id',async (request,response)=>{
    try{
        let user = await User.findOne({_id:request.params.id})
        response.status(200).json({
            status:'success',
            user :user
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.post('/users',async (request,response)=>{
    try{
        let user = await User.create(request.body)
        response.status(200).json({
            status:'successfully created',
            user :user
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.put('/users/:id',async (request,response)=>{
    try{
        let user = await User.updateOne({_id:request.params.id},{$set:{name:request.body.name}})
        response.status(200).json({
            status:'success',
            user :user
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 
app.delete('/users/:id',async (request,response)=>{
    try{
        let user = await User.deleteOne({_id:request.params.id})
        response.status(200).json({
            status:'successfully deleted',
            user :user
        })
    }
    catch(err){
        response.status(400).json({
            status:'failure',
            message:err.message
        })
    }

}) 