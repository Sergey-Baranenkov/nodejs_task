import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

const RequestSchemaPayload = Joi.object({
    username: Joi.string().required(),
}).required();

function updateUser({ id, username }: JoiExtractTypes<typeof RequestSchemaPayload, typeof RequestSchemaParams>) {
    const repo = new UserRepository(stub);
    return repo.updateUsername(id, username);
}

updateUser.payload = RequestSchemaPayload;
updateUser.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'PUT',
    path: '/users/{id}',
    handler: handleService(updateUser),
    options: {
        validate: extractRequestSchema(updateUser),
    },
};

export default route;

