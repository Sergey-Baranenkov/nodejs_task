import UserRepository from "../repositories/UserRepository";
import GameRepository from "../repositories/GameRepository";
import Game from "../interfaces/Game";
import {EntertainmentSoftwareRatingBoardEnum} from "../enums/ESRB";
import _ from "lodash";
import {default as database} from "../database/stub";

describe('BaseRepository', () => {
    beforeEach(() => jest.resetModules());

    it('getNextId empty', () => {
        const database = require('../database/stub').default;
        database.games = [];

        const gameRepository = new GameRepository(database);
        const nextId = gameRepository.getNextId();
        expect(nextId).toBe(1)
    })

    it('getNextId not empty', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);
        const id = database.games[database.games.length - 1].id;
        const nextId = gameRepository.getNextId();
        expect(nextId).toBe(id + 1)
    })
});

describe('Game', () => {
    beforeEach(() => jest.resetModules());
    it('getGame', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);
        expect(gameRepository.findOne(1)).toBe(database.games[0])
    })

    it('gameList', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);
        expect(gameRepository.find()).toBe(database.games)
    })

    it('createGame', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);
        const game: Omit<Game, 'id'> = {title: "test", description: "test", images: ['A', 'B'], ageRating: EntertainmentSoftwareRatingBoardEnum.M}
        const { id } = gameRepository.create(game);

        const omitGame = _.omit(gameRepository.findOne(id), 'id');
        expect(omitGame).toStrictEqual(game)
    })

    it('deleteGame positive', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);

        const gameId = 1;
        gameRepository.delete(gameId);

        expect(gameRepository.findOne(gameId)).toBeFalsy();
    })

    it('deleteGame negative', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);

        const gameId = 228;

        expect(() => gameRepository.delete(gameId)).toThrow();
    })

    it('updateGame positive', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);

        const game = _.cloneDeep(gameRepository.findOne(1)) as Game;
        game.title = 'cringe';

        gameRepository.update(game);

        expect(gameRepository.findOne(game.id)).toStrictEqual(game);
    })

    it('updateGame negative', () => {
        const database = require('../database/stub').default;
        const gameRepository = new GameRepository(database);

        const game = _.cloneDeep(gameRepository.findOne(1)) as Game;
        game.title = 'cringe';
        game.id = 228;

        expect(() => gameRepository.update(game)).toThrow();
    })
})

describe('Users', () => {
    beforeEach(() => jest.resetModules());
    it('findOne', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);
        expect(userRepository.findOne(1)).toBe(database.users[0])
    })

    it('createUser', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);
        const username = 'test';

        userRepository.create(username);

        const user = userRepository.findOne(3);

        expect(user).toBeTruthy();
        expect(user!.username).toBe(username);
    })

    it('deleteUser', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 2;
        userRepository.delete(userId);

        expect(userRepository.findOne(userId)).toBeFalsy();
    })

    it('updateUsername positive', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 2;
        const username = 'vasya';

        userRepository.updateUsername(userId, username);

        const user = userRepository.findOne(userId);
        expect(user).toBeTruthy();

        expect(user!.username).toBe(username)
    })

    it('updateUsername negative', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 228;
        const username = 'vasya';

        expect(() => userRepository.updateUsername(userId, username)).toThrowError()
    })

    it('getUserGameList', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 2;

        const games = userRepository.findUserGames(userId);

        expect(games).toBe(database.users[1].games);
    })

    it('deleteUserGames', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const gameId = 1;
        userRepository.deleteGameFromAllUsers(gameId);

        expect(database.users.flatMap(user => user.games.map(game => game.game.id))).not.toContain(gameId);
    })

    it('createUserGame new', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);
        const gameRepository = new GameRepository(database);

        const userId = 2;
        const gameId = 2;
        const game = gameRepository.findOne(gameId) as Game;
        userRepository.addGame(userId, game);

        const games = userRepository.findUserGames(userId);

        expect(games).toBe(database.users[1].games);
    })

    it('createUserGame deleted', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);
        const gameRepository = new GameRepository(database);

        const userId = 2;
        const gameId = 4;
        const game = gameRepository.findOne(gameId) as Game;
        userRepository.addGame(userId, game);

        const games = userRepository.findUserGames(userId);

        expect(games.length).toBe(3);
    })

    it('deleteUserGame', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 2;
        const gameId = 2;

        userRepository.deleteGame(userId, gameId);

        const games = userRepository.findUserGames(userId);

        const game = games.find(game => game.game.id === gameId);

        expect(game!.deleted).toBe(true);
    })

    it('addPlayTIme', () => {
        const database = require('../database/stub').default;
        const userRepository = new UserRepository(database);

        const userId = 2;
        const gameId = 2;
        const playTime = 200;

        const initialPlayTime = userRepository.findUserGame(userId, gameId)!.playTime;
        userRepository.addGamePlayTime(userId, gameId, playTime);
        const updatedPlayTime = userRepository.findUserGame(userId, gameId)!.playTime;

        expect(updatedPlayTime).toBe(initialPlayTime + playTime);
    })
})


