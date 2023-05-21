import express from 'express';
import { auth } from '../../core/mdw.js';
import {createQuote, modifiedQuote, deleteQuote, getQuotes, getQuotesId } from './controller.js'

const router = express.Router();

router.post("/", auth ,async (req, res, next) => {
    try {
        return res.json(await createQuote(req.body, req.token));
    } catch (error) {
        next(error);
    }
})

router.patch("/:id", auth, async(req, res, next) => {
    try {
        return res.json(await modifiedQuote(req.params.id, req.body, req.token))
    } catch(e) {
        next(e)
    }
})

router.delete("/:id", auth, async(req, res, next) => {
    try {
        return res.json(await deleteQuote(req.params.id, req.token, req.body))
    } catch(e) {
        next(e)
    }
})

router.get("/", auth ,async(req, res, next) => {
    try {
        return res.json(await getQuotes(req.query, req.token))
    } catch(e) {
        next(e)
    }
})

router.get("/:id", auth ,async(req, res, next) => {
    try {
        return res.json(await getQuotesId(req.params.id, req.token))
    } catch(e) {
        next(e)
    }
})
export default router;
