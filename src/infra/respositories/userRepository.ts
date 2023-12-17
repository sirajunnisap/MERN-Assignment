import { User } from "../../domain/entities/userModel"
import { MongoDBUser } from "../database/model/userModel";

export type userRepository = {

    createUser:(user:User)=>Promise<User>;
    findOneUserByEmail:(email:string)=>Promise<User|null>;
    findUserById:(userId:string)=>{};
    updateUserById(userId:string,userData:object):Promise<object|null>;
}

const userRepositoryImp = (userModel:MongoDBUser):userRepository => {

    const createUser = async(user:User):Promise<User>=>{
        let newUser = await userModel.create(user)

        return newUser
    }
    const findOneUserByEmail = async(email:string)=>{
        const user = await userModel.findOne({email})

        return user
    }

    const findUserById = async(userId:string)=>{
        try{
            const user = await userModel.findById(userId)
            if(!user){
                console.log('user is not found')
                return null
            }
        return user
    }catch(error){
        console.log(error)
        throw error
        }
    };

    const updateUserById = async(id:string,userDetails:object):Promise<object|null>=>{
       
        const user:object|null = await userModel.findByIdAndUpdate(id,userDetails,{new:true})
       
        return user

     
}

    return {createUser,findOneUserByEmail,findUserById,updateUserById}
}

export default userRepositoryImp