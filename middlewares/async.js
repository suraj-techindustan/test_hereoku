module.exports=function(handler){
    return async(req,res,next)=>{
        try{
            await handler(req,res)
        }catch(ex){
            res.status(400).send({message:ex.message})
        }
    }
}