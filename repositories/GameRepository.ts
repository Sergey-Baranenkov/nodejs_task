import BaseRepository from "./BaseRepository";
import DatabaseSchema from "../interfaces/DatabaseSchema";
import Game from "../interfaces/Game";
import {MISSING_GAME_ERROR_TEXT} from "../constants/errors";

export default class GameRepository extends BaseRepository {
    get table(): DatabaseSchema['games'] {
        return this.database.games;
    }

    public findOne(id: Game['id']) {
        return this.table.find(el => el.id === id);
    }

    public find() {
        return this.table;
    }

    public create(game: Omit<Game, 'id'>) {
        const id = this.getNextId();
        this.table.push({ id, ...game });
        return { id };
    }

    public update(game: Game) {
        const idx = this.table.findIndex((val) => val.id === game.id);
        if (idx === -1) {
            throw new Error(MISSING_GAME_ERROR_TEXT);
        }
        this.table.splice(idx, 1, game);
        return idx !== -1;
    }

    public delete(id: Game['id']) {
        const idx = this.table.findIndex((val) => val.id === id);
        if (idx === -1) {
            throw new Error(MISSING_GAME_ERROR_TEXT);
        }
        this.table.splice(idx, 1);
        return idx !== -1;
    }
}
