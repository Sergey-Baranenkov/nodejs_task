import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
    gameId: Joi.number().required().integer().positive(),
}).required();

const RequestSchemaPayload = Joi.object({
    playTime: Joi.number().required().integer().positive(),
}).required();

function addPlayTime({ id, gameId, playTime }: JoiExtractTypes<typeof RequestSchemaParams, typeof RequestSchemaPayload>) {
    const userRepo = new UserRepository(stub);
    userRepo.addGamePlayTime(id, gameId, playTime);

    return true;
}

addPlayTime.params = RequestSchemaParams;
addPlayTime.payload = RequestSchemaPayload;

const route: ServerRoute = {
    method: 'POST',
    path: '/users/{id}/games/{gameId}',
    handler: handleService(addPlayTime),
    options: {
        validate: extractRequestSchema(addPlayTime),
    },
};

export default route;

