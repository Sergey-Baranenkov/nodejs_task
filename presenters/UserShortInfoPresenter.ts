import User from "../interfaces/User";
import _ from "lodash";

export default function (user: User) {
    return _.pick(user, ['id', 'username']);
}
