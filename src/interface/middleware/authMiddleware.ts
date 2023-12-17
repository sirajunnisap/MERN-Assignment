import jwt from 'jsonwebtoken';
import { Request,Response,NextFunction } from 'express';

export interface CustomRequest extends Request {
    user?: any
}

export const userAuthentication =  (req:CustomRequest,res:Response,next:NextFunction)=>{
     try {
        
      const authHeader =   req.headers.user as string

      const secretKey = process.env.JWT_SECRET_KEY;

      if(!authHeader || !secretKey){
        return res.send(401).json({success:false,message:"not authenticated ",Auth:false})
      }

    
      const token = authHeader.split(' ')[1];

      console.log(token,"token");
      

      jwt.verify(token,secretKey as string , (err:any,user:any)=>{

        req.user = user
        next()
      })

     } catch (error) {
        res.status(401).json({ success: false, message: 'not authenticated !', Auth: false })
     }
}