import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import GameRepository from "../../../repositories/GameRepository";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

function getGame(params: JoiExtractTypes<typeof RequestSchemaParams>) {
    const repo = new GameRepository(stub);
    return repo.findOne(params.id);
}

getGame.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'GET',
    path: '/games/{id}',
    handler: handleService(getGame),
    options: {
        validate: extractRequestSchema(getGame),
    },
};

export default route;

