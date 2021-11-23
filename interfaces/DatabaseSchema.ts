import User from "./User";
import Game from "./Game";

export default interface DatabaseSchema {
    users: Array<User>;
    games: Array<Game>;
}
