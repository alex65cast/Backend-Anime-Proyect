import express from 'express';
// import { auth } from '../../core/mdw.js';
import {createUser, userLogIn} from './controller.js';

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

export default router;