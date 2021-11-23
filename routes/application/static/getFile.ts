import Joi from "joi";
import {ServerRoute} from 'hapi';
import extractRequestSchema from '../../extractRequestSchema';

const RequestSchemaParams = Joi.object({
    filename: Joi.string(),
}).required();

function getFile(request) {
    return request.params.filename;
}

getFile.params = RequestSchemaParams;

const route: ServerRoute = {
    method: 'GET',
    path: '/static/text/{filename}',
    handler: {
        file: getFile,
    },
    options: {
        validate: extractRequestSchema(getFile),
    },
};

export default route;

