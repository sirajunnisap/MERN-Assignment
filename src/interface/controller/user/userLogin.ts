import {Request,Response} from "express"
import { User } from "../../../domain/entities/userModel"
import { AppError } from "../../../utils/errorHandle";
import userRepositoryImp from "../../../infra/respositories/userRepository";
import { userModel } from "../../../infra/database/model/userModel";
import signupUser from "../../../app/user/userSignup";
import loginUser from "../../../app/user/userLogin";


const db = userModel
const userRepository = userRepositoryImp(db)

export type userLoginType = {
    email : string,
    password : string
}

export const userSignup =async (req:Request,res:Response) => {
    try {
        
        const user : User = req.body

        if(!user.name || !user.email || !user.password || !user.phone ||
            
            /^\s*$/.test(user.name)|| 
            /^\s*$/.test(user.email)|| 
            /^\s*$/.test(user.password)  ){
                 throw new AppError("all field are required  ", 400);
        }
        if(user.password.length<6){
            throw new AppError("password must be at least 6 digit",400);
            
        }

        console.log(user.name,"user data from signup req.body")

        const createNewUser:User = await signupUser(userRepository)(user)
        if(!createNewUser){
            res.status(500).json({message:'something went wrong'})
        }

        res.status(200).json({message:"user created successfully"})

    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || 'somthing went wrong'})
    }
}


export const userLogin =async (req:Request,res:Response) => {
    try {
        
        const user:User = req.body

        const {email,password} = user
        if(!email || !password || /^\s*$/.test(email) || /^\s*$/.test(password)){
            throw new AppError ('All fields are required',400)
        }

        const usertoken = await loginUser(userRepository)(user)

        console.log(user.name,"body from request")

       res.status(200).json(usertoken)
    } catch (error:any) {
        res.status(error.statusCode || 500).json({message:error.message || 'somthing went wrong'})
    }
}

