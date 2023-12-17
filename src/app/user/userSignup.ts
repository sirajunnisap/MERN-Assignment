import { User } from "../../domain/entities/userModel";
import { userRepository } from "../../infra/respositories/userRepository";
import { AppError } from "../../utils/errorHandle";
import { passwordHashing } from "./userValidation";

const signupUser =(userRepository:userRepository)=>{
    return async (user:User):Promise<User> =>{

        const hashePassword = await passwordHashing(user?.password)
      
        const userExist = await userRepository.findOneUserByEmail(user.email)

        let newUser = {...user, password:hashePassword}

        if(userExist){
            throw new AppError("user is already exist ",409)
        }

        const createUser = await userRepository.createUser(newUser)

        return createUser 
    }
}

export default signupUser