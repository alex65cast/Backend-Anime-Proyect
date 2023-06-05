import mongoose from "mongoose";


export const USER_ROLS = {
    CLIENT: "Cliente",
    ADMIN: "Admin"
}

const Users = mongoose.model('Users',new mongoose.Schema({
    name:{
        type:String,
        required:true,
        min:3,
        max:100
    },
    email:{
        type:String,
        required:true,
        min:3,
        max:100,
        unique:true
    },
    password:{
        type:String,
        select:false,
        required:true,
        min:6
    },
    phoneNumer:{
        type:Number,
        select:false,
        required:true,
        min:9

    },
    date:{
        type:Date,
        default: Date.now
    },
    rol: {
        type: String,
        default: USER_ROLS.CLIENT,
        enum: [USER_ROLS.CLIENT, USER_ROLS.ADMIN]
    }
}, { versionKey: false }));

export default Users;
