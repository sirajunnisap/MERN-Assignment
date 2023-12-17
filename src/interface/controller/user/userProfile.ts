import { Response } from "express";
import { CustomRequest } from "../../middleware/authMiddleware";
import { userModel } from "../../../infra/database/model/userModel";
import userRepositoryImp from "../../../infra/respositories/userRepository";
import { getUserData,updatateProfile } from "../../../app/user/userData";



const db = userModel
const userRepository = userRepositoryImp(db)
export const userProfile = async(req:CustomRequest,res:Response)=>{
    try {

        const userId : string|undefined = req.user?.user?._id as string
        console.log(userId,"userID")

        const userData = await getUserData(userRepository)(userId)


   res.status(200).json(userData);

    } catch (error: any) {
        res.status(500).json({ message: error.message || 'something went wrong' });
    }
}


export const updatatedProfile = async(req:CustomRequest,res:Response)=>{
    try {
        
        const userId :string|undefined= req.user?.user._id as string
console.log(userId,"userId")
        const data = req.body as object|any

        const userData:object = {
            name:data.name as string,
            email:data.email as string,
            phone:data.phone as number,
            password:data.password as string,
        }
        const updatedProfile = await updatateProfile(userRepository)(userId,userData)

           
            res.status(200).json(updatedProfile)
        
        
       } catch (error:any) {
        res.status(500).json({message:error.message||'something went wrong'})
       }
}