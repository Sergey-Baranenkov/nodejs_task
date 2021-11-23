import Joi from "joi";
import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';
import UserRepository from "../../../repositories/UserRepository";
import UserShortInfoPresenter from "../../../presenters/UserShortInfoPresenter";
import {MISSING_USER_ERROR_TEXT} from "../../../constants/errors";

const RequestSchemaParams = Joi.object({
    id: Joi.number().required().integer().positive(),
}).required();

function getUser(params: JoiExtractTypes<typeof RequestSchemaParams>) {
    const repo = new UserRepository(stub);
    const user = repo.findOne(params.id);
    if (user) {
        return UserShortInfoPresenter(user);
    }
    throw new Error(MISSING_USER_ERROR_TEXT);
}

getUser.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'GET',
    path: '/users/{id}',
    handler: handleService(getUser),
    options: {
        validate: extractRequestSchema(getUser),
    },
};

export default route;

