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
