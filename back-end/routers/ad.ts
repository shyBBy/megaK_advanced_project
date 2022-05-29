import {Router, Request, Response} from "express";
import {AdRecord} from "../records/ad.record";
import {ValidationError} from "../utils/errors";
import {CreateAdReq} from "../types";

export const adRouter = Router();

adRouter.get('/search/:name?', async (req, res) => {
    const ads = await AdRecord.listAll(req.params.name ?? '');
    res.json(ads);
})

adRouter.get('/:id', async (req, res) => {
    const ad = await AdRecord.getOne(req.params.id)
    res.json(ad);
})

adRouter.post('/', async (req, res) => {
    const ad = new AdRecord(req.body);
    await ad.create();
    res.json(ad);
})