import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import GameRepository from "../../../repositories/GameRepository";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

function deleteGame(params: JoiExtractTypes<typeof RequestSchemaParams>) {
    const gameRepo = new GameRepository(stub);
    const userRepo = new UserRepository(stub);
    gameRepo.delete(params.id);
    userRepo.deleteGameFromAllUsers(params.id);
    return true;

}

deleteGame.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'DELETE',
    path: '/games/{id}',
    handler: handleService(deleteGame),
    options: {
        validate: extractRequestSchema(deleteGame),
    },
};

export default route;

