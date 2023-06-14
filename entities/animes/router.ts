import express from 'express';
import { auth } from '../../core/mdw.js';
import { getAnimes } from './controller.js';
const router = express.Router();


router.get("/", auth ,async(req, res, next) => {
    try {
        return res.json(await getAnimes(req.query, req.token))
    } catch(e) {
        next(e)
    }
})