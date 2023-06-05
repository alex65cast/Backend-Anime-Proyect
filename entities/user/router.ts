import express from 'express';
// import { auth } from '../../core/mdw.js';
import {userLogIn} from './controller.js';

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


export default router;