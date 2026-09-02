import { OPEN_DOTA_BASE_URL, PORT } from "./utils/envs.js";
import express, { Request, response, Response } from "express";
import getPlayers from "./controller/players/players.controller.js";
import indexRoutes from "./routes/index.route.js";

const app = express();
const ACC_ID = "344647611"

app.use("/api/rest", indexRoutes)

app.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});
