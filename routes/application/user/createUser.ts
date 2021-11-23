import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";

const RequestSchemaPayload = Joi.object({
    username: Joi.string().required(),
}).required();

function createUser({ username }: JoiExtractTypes<typeof RequestSchemaPayload>) {
    const repo = new UserRepository(stub);
    return repo.create(username);
}

createUser.payload = RequestSchemaPayload;

const route: ServerRoute = {
    method: 'POST',
    path: '/users',
    handler: handleService(createUser),
    options: {
        validate: extractRequestSchema(createUser),
    },
};

export default route;

