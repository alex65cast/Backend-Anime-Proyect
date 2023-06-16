import express from 'express';
import { auth } from '../../core/mdw.js';
import { createStatus, getStatus } from './controller.js';
const router = express.Router();
router.get("/", auth, async (req, res, next) => {
    try {
        return res.json(await getStatus(req.token));
    }
    catch (e) {
        next(e);
    }
});
router.post("/", auth, async (req, res, next) => {
    try {
        return res.json(await createStatus(req.body, req.token));
    }
    catch (error) {
        next(error);
    }
});
export default router;
//# sourceMappingURL=router.js.map