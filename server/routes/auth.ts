import { Router } from "express";

const router = Router();

router.get('/google', (req, res) => res.sendStatus(200));
router.get('/google/redirect',(req, res) => res.sendStatus(200));

export default router;