import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";
import {MISSING_GAME_ERROR_TEXT} from "../../../constants/errors";
import GameRepository from "../../../repositories/GameRepository";
import _ from "lodash";

const RequestSchemaParams = Joi.object({
    userId: Joi.number().required().integer().positive(),
}).required();

const RequestSchemaPayload = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

function createUserGame({ userId, id }: JoiExtractTypes<typeof RequestSchemaParams, typeof RequestSchemaPayload>) {
    const userRepo = new UserRepository(stub);
    const gameRepo = new GameRepository(stub);
    const game = gameRepo.findOne(id);
    if (!game) {
        throw new Error(MISSING_GAME_ERROR_TEXT);
    }
    userRepo.addGame(userId, _.pick(game, ['id', 'title']));

    return true;
}

createUserGame.params = RequestSchemaParams;
createUserGame.payload = RequestSchemaPayload;

const route: ServerRoute = {
    method: 'POST',
    path: '/users/{userId}/games',
    handler: handleService(createUserGame),
    options: {
        validate: extractRequestSchema(createUserGame),
    },
};

export default route;

