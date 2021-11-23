import DatabaseSchema from "../interfaces/DatabaseSchema";
import {EntertainmentSoftwareRatingBoardEnum} from "../enums/ESRB";

const database: DatabaseSchema = {
    users: [
        {
            id: 1,
            username: 'xXx_sephiroth1997_xXx',
            games: [
                {
                    game: {
                        id: 4,
                        title: "FINAL FANTASY XIV Online"
                    },
                    playTime: 400,
                    deleted: false,
                },
                {
                    game: {
                        id: 1,
                        title: "Mirror's Edge",
                    },
                    playTime: 20,
                    deleted: false,
                },
                {
                    game: {
                        id: 3,
                        title: "Titanfall 2",
                    },
                    playTime: 10,
                    deleted: false,
                },
            ]
        },
        {
            id: 2,
            username: 'Gregor',
            games: [
                {
                    game: {
                        id: 3,
                        title: "Titanfall 2",
                    },
                    playTime: 175,
                    deleted: false,
                },
                {
                    game: {
                        id: 2,
                        title: "Deus Ex: Game of the Year Edition",
                    },
                    playTime: 230,
                    deleted: false,
                },
            ]
        },
    ],

    games: [
        {
            id: 1,
            title: "Mirror's Edge",
            description: "In a city where information is heavily monitored, couriers called Runners transport sensitive data. In this seemingly utopian paradise, a crime has been committed, & you are being hunted. You are a Runner called Faith and this innovative first-person action-adventure is your story.",
            ageRating: EntertainmentSoftwareRatingBoardEnum.T,
            images: [],
        },
        {
            id: 2,
            title: "Deus Ex: Game of the Year Edition",
            description: "The year is 2052 and the world is a dangerous and chaotic place. Terrorists operate openly - killing thousands; drugs, disease and pollution kill even more. The world's economies are close to collapse and the gap between the insanely wealthy and the desperately poor grows ever wider.",
            ageRating: EntertainmentSoftwareRatingBoardEnum.M,
            images: [],
        },
        {
            id: 3,
            title: "Titanfall 2",
            description: "Respawn Entertainment gives you the most advanced titan technology in its new, single player campaign & multiplayer experience. Combine & conquer with new titans & pilots, deadlier weapons, & customization and progression systems that help you and your titan flow as one unstoppable killing force.",
            ageRating: EntertainmentSoftwareRatingBoardEnum.M,
            images: ["someSetOf", "bannerStrings"],
        },
        {
            id: 4,
            title: "FINAL FANTASY XIV Online",
            description: "ake part in an epic and ever-changing FINAL FANTASY as you adventure and explore with friends from around the world.",
            ageRating: EntertainmentSoftwareRatingBoardEnum.T,
            images: [],
        },
    ]
}

export default database;
