import mongoose from "mongoose";

const AnimeList = mongoose.model('AnimeList', new mongoose.Schema({
    userList: {
        type: mongoose.Types.ObjectId,
        ref: 'Users',
        required: true
    },
    ratingUser: {
        type: Number,
        required: true
    },
    animeID: {
        type:Number,
        required: true
    },
    dateOfCreation: {
        type: Date,
        default: Date.now
    },
    activeAnime: {
        type: Boolean,
        default: true
    }
}, { versionKey: false }))

export default AnimeList;
