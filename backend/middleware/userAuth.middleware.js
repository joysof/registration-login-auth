import jwt from 'jsonwebtoken'




const userAuth = async (req,res,next) =>{

    const {token} = req.cookies ; 
    if(!token) {
        return res.json({success : false , message : "Not Authorized Login Again "})
    }
    try {
       const tokenDecode = jwt.verify(token ,process.env.JWT_SECRET)
       if (tokenDecode.id) {
        req.user = {id : tokenDecode.id}
       }else{
         res.json({success : false , message : "Not Authorized Login Again "})
       }
        req.user = { id: tokenDecode.id };
        next();
    } catch (error) {
        console.log("this errror")
        res.json({success : false , message :"this error "+ error.message})
    }
}

export default userAuth