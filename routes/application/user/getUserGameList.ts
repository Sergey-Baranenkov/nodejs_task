import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";
import UserGamesPresenter from "../../../presenters/UserGamesPresenter";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

function getUserGameList(params: JoiExtractTypes<typeof RequestSchemaParams>) {
    const repo = new UserRepository(stub);
    const games = repo.findUserGames(params.id);
    if (games) {
        return UserGamesPresenter(games);
    }
    return null;
}

getUserGameList.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'GET',
    path: '/users/{id}/games',
    handler: handleService(getUserGameList),
    options: {
        validate: extractRequestSchema(getUserGameList),
    },
};

export default route;

