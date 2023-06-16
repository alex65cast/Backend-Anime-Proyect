import EstusAnime from "./model.js";
export const getStatus = async (token) => {
    if (token) {
        return await EstusAnime.find({});
    }
    throw new Error('NOT_AUTHORIZED');
};
export const createStatus = async (data, token) => {
    if (!data)
        throw new Error("INFO_LEFT");
    if (!token)
        throw new Error('NOT_AUTHORIZED');
    let animeInfo = new EstusAnime(data);
    await animeInfo.save();
    return animeInfo;
};
//# sourceMappingURL=controller.js.map