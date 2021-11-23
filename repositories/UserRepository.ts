import BaseRepository from "./BaseRepository";
import DatabaseSchema from "../interfaces/DatabaseSchema";
import User from "../interfaces/User";
import {MISSING_GAME_ERROR_TEXT, MISSING_USER_ERROR_TEXT} from "../constants/errors";
import UserGame from "../interfaces/UserGame";
import Game from "../interfaces/Game";

export default class UserRepository extends BaseRepository {
    get table(): DatabaseSchema['users'] {
        return this.database.users;
    }

    public findOne(id: User['id']) {
        return this.table.find(el => el.id === id);
    }

    public create(username: User['username']) {
        const id = this.getNextId();
        const user: User = {username, id, games: []};
        this.table.push(user);
        return { id };
    }

    public updateUsername(id: User['id'], username: User['username']) {
        const idx = this.table.findIndex((val) => val.id === id);
        if (idx === -1) {
            throw new Error(MISSING_USER_ERROR_TEXT);
        }
        this.table[idx].username = username;
        return { id };
    }

    public delete(id: User['id']) {
        const idx = this.table.findIndex((val) => val.id === id);
        if (idx === -1) {
            throw new Error(MISSING_USER_ERROR_TEXT);
        }
        const user = this.table.splice(idx, 1)[0];
        user.id = 0;

        this.table.unshift(user);
    }

    public findUserGames(id: User['id']) {
        const user = this.findOne(id);
        if (!user) {
            throw new Error(MISSING_USER_ERROR_TEXT);
        }

        return user.games;
    }

    public findUserGame (
        id: User['id'],
        gameId: UserGame['game']['id']) {
        const games = this.findUserGames(id);
        return games.find(game => game.game.id === gameId);
    }

    public addGame(id: User['id'], game: UserGame['game'] ) {
        const games = this.findUserGames(id);
        const deletedGame = games.find(g => g.game.id === game.id);
        if (deletedGame) {
            deletedGame.deleted = false;
        } else {
            games.push({
                game,
                playTime: 0,
                deleted: false
            });
        }
    }

    public addGamePlayTime(id: User['id'], gameId: Game['id'], playTime: number) {
        const game = this.findUserGame(id, gameId);
        if (!game || game.deleted) {
            throw new Error(MISSING_GAME_ERROR_TEXT);
        }

        game.playTime += playTime;
    }

    public deleteGameFromAllUsers(id: Game['id']) {
        this.table.forEach(user => {
            user.games = user.games.filter(game => game.game.id !== id);
        })
    }

    public deleteGame(id: User['id'], gameId: Game['id']) {
        const game = this.findUserGame(id, gameId);
        if (!game) {
            throw new Error(MISSING_GAME_ERROR_TEXT);
        }
        game.deleted = true;
    }
}
