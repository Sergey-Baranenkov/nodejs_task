import { routeNotExist } from './system/routeNotExists';
import { ServerRoute } from 'hapi';
import getGame from "./application/game/getGame";
import getGameList from "./application/game/getGameList";
import createGame from "./application/game/createGame";
import updateGame from "./application/game/updateGame";
import deleteGame from "./application/game/deleteGame";
import getUser from "./application/user/getUser";
import createUser from "./application/user/createUser";
import updateUser from "./application/user/updateUser";
import deleteUser from "./application/user/deleteUser";
import getUserGameList from "./application/user/getUserGameList";
import createUserGame from "./application/user/createUserGame";
import addPlayTime from "./application/user/addPlayTime";
import deleteUserGame from "./application/user/deleteUserGame";
import getFile from "./application/static/getFile";

const routes: ServerRoute[] = [
  getGame,
  getGameList,
  createGame,
  updateGame,
  deleteGame,
  getUser,
  createUser,
  updateUser,
  deleteUser,
  getUserGameList,
  createUserGame,
  addPlayTime,
  deleteUserGame,
  getFile,
  routeNotExist,
];

export default routes;
