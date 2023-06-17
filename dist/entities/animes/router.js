import express from 'express';
import { auth } from '../../core/mdw.js';
import { createAnimeList, getAnimes, getAnimesCompleted, modifiAnime } from './controller.js';
const router = express.Router();
router.get("/", auth, async (req, res, next) => {
    try {
        return res.json(await getAnimes(req.query, req.token));
    }
    catch (e) {
        next(e);
    }
});
router.get("/completed", auth, async (req, res, next) => {
    try {
        return res.json(await getAnimesCompleted(req.query, req.token));
    }
    catch (e) {
        next(e);
    }
});
router.post("/", auth, async (req, res, next) => {
    try {
        return res.json(await createAnimeList(req.body, req.token));
    }
    catch (error) {
        next(error);
    }
});
router.patch("/:id", auth, async (req, res, next) => {
    try {
        return res.json(await modifiAnime(req.params.id, req.body, req.token));
    }
    catch (e) {
        next(e);
    }
});
export default router;
//# sourceMappingURL=router.js.map