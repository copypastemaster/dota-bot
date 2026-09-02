import { Router } from "express";
import getPlayers from "../controller/players/players.controller.js";

const route = Router();

route.use("/players", getPlayers);

export default route;
