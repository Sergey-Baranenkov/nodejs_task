import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import GameRepository from "../../../repositories/GameRepository";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import {EntertainmentSoftwareRatingBoardEnum} from "../../../enums/ESRB";
import _ from "lodash";

const RequestSchemaPayload = Joi.object({
    title: Joi.string().required(),
    description: Joi.string().required(),
    ageRating: Joi.string()
        .valid(..._.keys(EntertainmentSoftwareRatingBoardEnum) as Array<EntertainmentSoftwareRatingBoardEnum>)
        .required(),
    images: Joi.array().items(Joi.string().optional()).required(),
}).required();

function createGame(params: JoiExtractTypes<typeof RequestSchemaPayload>) {
    const repo = new GameRepository(stub);
    return repo.create(params);
}

createGame.payload = RequestSchemaPayload;

const route: ServerRoute = {
    method: 'POST',
    path: '/games',
    handler: handleService(createGame),
    options: {
        validate: extractRequestSchema(createGame),
    },
};

export default route;

