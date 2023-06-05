import Users, { USER_ROLS } from './model.js';
import jwt from 'jsonwebtoken';
import config from '../../config.js';
import bcrypt from 'bcrypt';

export const userLogIn = async(user) => {
    const findUser = await Users.findOne({email: user.email}).select('+password')
    if(!findUser) throw new Error('NO_USER')
    if(!(await bcrypt.compare(user.password, findUser.password))) throw new Error('WRONG_PASSWORD')
    const token = jwt.sign({email: user.email, id: findUser._id, rol: findUser.rol, date: findUser.date, number: findUser.phoneNumer}, config.SECRET)
    return token
}


export const createUser = async(newUser) => {
    newUser.password = await bcrypt.hash(newUser.password, 1);
    const user =  new Users(newUser);
    return await user.save();
};

export const getUsers = async (token, params) => {
    if (token.rol === USER_ROLS.ADMIN) {
      if (params) {
        // Realizar búsqueda por nombre si se proporciona
        return await Users.find({ name: params});
      } else {
        // Obtener todos los usuarios si no se proporciona un nombre
        return await Users.find({});
      }
    }
    throw new Error('NOT_AUTHORIZED');
  };

  export const searchUserById = async(id, token)=>{
    if(token.rol === USER_ROLS.CLIENT && token.id === id){
        const user = await Users.findOne({_id:id});
        return user
    } else if(token.rol === USER_ROLS.ADMIN){
        const user = await Users.findOne({_id:id});
        return user
    }
    throw new Error('NOT_AUTHORIZED');
};

export const updateUser = async(id, body, token) => {
    if((token.rol === USER_ROLS.CLIENT) && id === token.id) {
        body.rol = token.rol
        if(body.password) body.password = await bcrypt.hash(body.password, 1)
        const userUpdate = await Users.findOneAndUpdate({_id:id},body,{returnDocument: 'after'});
        if(!userUpdate) throw new Error('NO_USER');
        return userUpdate;
    } else if(token.rol === USER_ROLS.ADMIN) {
        const userUpdate = await Users.findOneAndUpdate({_id:id},body,{returnDocument: 'after'});
        return userUpdate;
    } 
    throw new Error('NOT_AUTHORIZED')
};