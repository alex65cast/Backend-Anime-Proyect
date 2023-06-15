import express from 'express';
import { auth } from '../../core/mdw.js';
import { getStatus } from './controller.js';
const router = express.Router();

router.get("/", auth ,async(req, res, next) => {
    try {
        return res.json(await getStatus(req.token))
    } catch(e) {
        next(e)
    }
});

export default router