import UserGame from "./UserGame";

export default interface User {
    id: number;
    username: string;
    games: Array<UserGame>;
}
