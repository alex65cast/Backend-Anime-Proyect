import Users, { USER_ROLS } from '../user/model.js';
import AnimeList from './model.js';

export const getAnimes = async(data, token) =>{
    if (token) {
        return await AnimeList.find({ userList: token.id, activeAnime: true })
          .populate([{ path: 'userList', select: ['name', 'email'] }]);
      }
      else{
        throw new Error('NO_TOKEN')
      }
}

export const createAnimeList = async(data, token)=>{
    if(!data.animeID) throw new Error("INFO_LEFT")
    if(token.rol === USER_ROLS.CLIENT) {
        if(!data.userList) throw new Error("INFO_LEFT")
        data.userList = token.id
    }
    if(token.rol === USER_ROLS.ADMIN && (!data.userList)) throw new Error("INFO_LEFT")
    let animeInfo = new AnimeList(data)
    await animeInfo.save()
    return animeInfo
}
