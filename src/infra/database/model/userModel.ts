import mongoose , { Document, Model, Schema } from "mongoose";
import { User } from "../../../domain/entities/userModel";

export type MongoDBUser = Model<Document<any, any, any >& User>

const userSchema : any|undefined = new Schema<User> ({
    name:{type:String },
    email:{type:String },
    phone:{type:Number },
    password:{type:String }
},{
    timestamps: {createdAt: true}
});

export const userModel :any|undefined = mongoose.connection.model<Document<any,any,any>&User>('user',userSchema)