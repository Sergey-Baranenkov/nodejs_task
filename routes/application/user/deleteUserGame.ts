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

function deleteUserGame({ id, gameId }: JoiExtractTypes<typeof RequestSchemaParams>) {
    const userRepo = new UserRepository(stub);
    userRepo.deleteGame(id, gameId);
    console.log(stub.users[0].games);
    return true;
}

deleteUserGame.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'DELETE',
    path: '/users/{id}/games/{gameId}',
    handler: handleService(deleteUserGame),
    options: {
        validate: extractRequestSchema(deleteUserGame),
    },
};

export default route;

