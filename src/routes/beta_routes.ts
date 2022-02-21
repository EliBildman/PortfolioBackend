import express, {Request, Response} from "express";
import * as gameModel from "../models/poker_game";
import {Game} from "../types/beta_types";

const router = express.Router()

router.get('/', (req: Request, res: Response) => {
    gameModel.get_all((err: Error, games: Game[]) => {
        if(err) return res.status(500).json({'errMsg': err});
        res.status(200).json({data: games});
    });
});

router.post('/', (req: Request, res: Response) => {
    const newGame = req.body;

    gameModel.create(newGame, (err: Error, id: number) => {
        if(err) res.status(500).json({'errMsg': err});
        res.status(200).json({'id': id});
    });
});

export {router as beta_router};