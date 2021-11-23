import {JoiExtractTypes} from "../../../types/JoiExtractTypes";
import GameRepository from "../../../repositories/GameRepository";
import stub from "../../../database/stub";
import { ServerRoute } from 'hapi';
import handleService from '../../handleService';
import extractRequestSchema from '../../extractRequestSchema';

function getGameList() {
    const repo = new GameRepository(stub);
    return repo.find();
}


const route: ServerRoute = {
    method: 'GET',
    path: '/games',
    handler: handleService(getGameList),
    options: {
        validate: extractRequestSchema(getGameList),
    },
};

export default route;

