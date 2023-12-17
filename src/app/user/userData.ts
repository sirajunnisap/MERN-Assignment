import { User } from "../../domain/entities/userModel";
import { userRepository } from "../../infra/respositories/userRepository";

export const getUserData = (userRepository:userRepository)=>{

    return async (userId:string):Promise<object|null>=>{

        const getUserById = await userRepository.findUserById(userId)

        return getUserById
    }
}

export const updatateProfile = (userRepository:userRepository)=>{
    return async(userId:string,userData:object):Promise<object|null>=>{

        const UserData:object|null = await userRepository.updateUserById(userId,userData)

        return UserData
    }
}
