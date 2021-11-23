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

function deleteUser(params: JoiExtractTypes<typeof RequestSchemaParams>) {
    const repo = new UserRepository(stub);
    repo.delete(params.id);
    return true;
}

deleteUser.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'DELETE',
    path: '/users/{id}',
    handler: handleService(deleteUser),
    options: {
        validate: extractRequestSchema(deleteUser),
    },
};

export default route;

