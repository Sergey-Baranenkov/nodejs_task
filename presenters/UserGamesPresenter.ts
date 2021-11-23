import User from "../interfaces/User";
import _ from "lodash";

export default function (games: User['games']) {
    return {
        games: games.map(game => _.pick(game, ['game', 'playTime'])),
    }
}
