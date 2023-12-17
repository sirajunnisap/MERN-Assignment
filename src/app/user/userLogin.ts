import { userModel } from "../../infra/database/model/userModel"
import userRepositoryImp, { userRepository } from "../../infra/respositories/userRepository"
import { userLoginType } from "../../interface/controller/user/userLogin"
import { AppError } from "../../utils/errorHandle"
import { createToken, passwordCompare } from "./userValidation"

export type userReturnType = {
    token : string,
    userData : userLoginType
}


const loginUser = (userRepository:userRepository)=>{
    return async(user:userLoginType):Promise<userReturnType>=>{

        const {email,password} = user
        
        const isUserExist = await userRepository.findOneUserByEmail(email)

        if(!isUserExist){
            throw new AppError("user is not exist ",404)
        }

        const ispasswordCorrect = await passwordCompare(password,isUserExist.password)
        if(!ispasswordCorrect){
            throw new AppError("incorrect password",409)
        }
        
        const userToken =  await createToken(isUserExist)

        const verifyToken = {
            token :userToken,
            userData : user
        }
        return verifyToken
    }
}


export default loginUser