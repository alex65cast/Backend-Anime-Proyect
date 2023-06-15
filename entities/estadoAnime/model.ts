import mongoose from "mongoose";


export const STATUS = {
    COMPLETED: "Completed",
    PLANING: "Plan to watch"
}

const EstusAnime = mongoose.model('EstusAnime',new mongoose.Schema({
    completed:{
        type:String,
        default: STATUS.COMPLETED
    },
    planing:{
        type:String,
        default: STATUS.PLANING
    },

    // rol: {
    //     type: String,
    //     default: USER_ROLS.CLIENT,
    //     enum: [USER_ROLS.CLIENT, USER_ROLS.ADMIN]
    // }
}, { versionKey: false }));

export default EstusAnime;
