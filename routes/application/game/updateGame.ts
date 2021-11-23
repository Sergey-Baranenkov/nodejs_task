import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import GameRepository from "../../../repositories/GameRepository";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import {EntertainmentSoftwareRatingBoardEnum} from "../../../enums/ESRB";
import _ from "lodash";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

const RequestSchemaPayload = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ageRating: Joi.string()
        .valid(..._.keys(EntertainmentSoftwareRatingBoardEnum) as Array<EntertainmentSoftwareRatingBoardEnum>)
        .required(),
    images: Joi.array().items(Joi.string().optional()).required(),
}).required();

function updateGame(params: JoiExtractTypes<typeof RequestSchemaPayload, typeof RequestSchemaParams>) {
    const repo = new GameRepository(stub);
    return repo.update(params);
}

updateGame.payload = RequestSchemaPayload;
updateGame.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'PUT',
    path: '/games/{id}',
    handler: handleService(updateGame),
    options: {
        validate: extractRequestSchema(updateGame),
    },
};

export default route;

