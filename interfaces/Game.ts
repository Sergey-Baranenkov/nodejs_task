import { EntertainmentSoftwareRatingBoardEnum } from "../enums/ESRB";

export default interface Game {
    id: number;
    title: string;
    description: string;
    ageRating: EntertainmentSoftwareRatingBoardEnum;
    images: Array<string>;
}
