export default interface UserGame {
    game: {
        id: number;
        title: string;
    };
    playTime: number;
    deleted: boolean;
}
