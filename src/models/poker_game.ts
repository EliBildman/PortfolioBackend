import { Game } from "../types/beta_types";
import { db } from "../db";
import { OkPacket, RowDataPacket } from "mysql2";

export const create = (game: Game, callback: Function) => {
    const queryString = "INSERT INTO game (player_ip, stack_diff, timestamp) VALUES (?, ?, ?)"
    game.timestamp = new Date(); //timestamp it for now

    db.query(
        queryString,
        [game.player_ip, game.stack_diff, game.timestamp],
        (err, result) => {
            if (err) { callback(err) };

            const insertId = (<OkPacket>result).insertId;
            callback(null, insertId);
        }
    );
};

export const get_all = (callback: Function) => {
    const queryString = "SELECT * FROM game"

    db.query(
        queryString,
        (err, result) => {
            if (err) { callback(err) };

            const rows = <RowDataPacket[]> result;
            const games: Game[] = [];

            rows.forEach(row => {
                const game: Game = {
                    id: row.id,
                    timestamp: row.timestamp,
                    stack_diff: row.stack_diff,
                    player_ip: row.player_ip,
                }
                games.push(game);
            })

            callback(null, games);
        }
    )
};