import mongoose from "mongoose";
// export const STATUS = {
//     COMPLETED: "Completed",
//     PLANING: "Plan to watch"
// }
const EstusAnime = mongoose.model('EstusAnime', new mongoose.Schema({
    state: {
        type: String,
        required: true
    }
    // rol: {
    //     type: String,
    //     default: USER_ROLS.CLIENT,
    //     enum: [USER_ROLS.CLIENT, USER_ROLS.ADMIN]
    // }
}, { versionKey: false }));
export default EstusAnime;
//# sourceMappingURL=model.js.map