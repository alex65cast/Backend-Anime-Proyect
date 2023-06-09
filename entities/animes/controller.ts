import Users, { USER_ROLS } from '../user/model.js';
import AnimeList from './model.js';
// import { STATUS } from '../estadoAnime/model.js';

export const getAnimes = async(data, token) =>{
    if (token) {
        return await AnimeList.find({ userList: token.id, activeAnime: true })
          .populate([{ path: 'userList', select: ['name', 'email'] },{path:"statusList", select:["state"]}]);
      }
      else{
        throw new Error('NO_TOKEN')
      }
}


export const createAnimeList = async (data, token) => {
    if (!data.animeID) throw new Error("INFO_LEFT");
  
    if (token.rol === USER_ROLS.CLIENT || token.rol === USER_ROLS.ADMIN) {
      if (!data.userList) {
        data.userList = token.id;
      }
    }
    const existingAnime = await AnimeList.findOne({
      userList: token.id,
      animeID: data.animeID
    });
    if (existingAnime) {
      throw new Error("ANIME_ALREADY_EXISTS");
    }
  
    if (token.rol === USER_ROLS.ADMIN && !data.userList) throw new Error("INFO_LEFT");
  
    let animeInfo = new AnimeList(data);
    await animeInfo.save();
    return animeInfo;
  };

export const modifiAnime = async(idAnimeList, data, token) =>{
    if(!idAnimeList || !data || !token) throw new Error("INFO_LEFT")
    let animeInfo = await AnimeList.findOne({_id: idAnimeList})
    if(!animeInfo) throw new Error("NO_animeInfo")
    if(token.rol === USER_ROLS.ADMIN || ((token.rol === USER_ROLS.CLIENT) && (animeInfo.userList?.toString() === token.id))) {
        data.updateAt = new Date()
        // if(data.activeAnime === true) data.deletedAt = null
        animeInfo = await AnimeList.findOneAndUpdate({_id: idAnimeList}, data, {new: true}).populate([{path: 'userList', select: ['name', 'email']}])
        return animeInfo
    } else {
        throw new Error("NOT_AUTHORIZED")
    }
}