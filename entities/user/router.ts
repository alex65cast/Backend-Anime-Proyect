import express from 'express';
import {createUser, getUsers, searchUserById, updateUser, userLogIn} from './controller.js';
import { auth } from '../../core/mdw.js';

const router = express.Router();

router.post('/login',async (req, res, next) => {

    try {
        const token = await userLogIn(req.body);
        if (!token) return next(new Error('NO_TOKEN'));
        return res.json({token});
    } catch (e) {
        next(e);
    }
   
});

router.post('/',async (req, res, next) => {

    try {
        const newUser = await createUser(req.body);
        return res.json(newUser);
    } catch (error) {
        next(error);
    }

});

router.get('/', auth, async (req, res, next) => {
    try {
      const user = await getUsers(req.token, req.query.name);
      if (!user) return next(new Error('NO_USER'));
      return res.json(user);
    } catch (e) {
      next(e);
    }
  });

router.get('/:id', auth,async(req,res,next)=>{

try {
    const user = await searchUserById(req.params.id, req.token);
    if (!user) return next(new Error('NO_USER'));
    return res.json(user);
} catch (e) {
    next(e);
}

});

router.put('/:id', auth,async (req, res, next) => {
    
    try {
        const user = await updateUser(req.params.id, req.body, req.token);
        return res.json(user);
    } catch (e) {
        next(e);
    }
});

export default router;