import { PORT } from "./utils/envs.js";
import express from "express";
import indexRoutes from "./routes/index.route.js";
import initDiscordClient from "./clientInit.js";

const app = express();
app.use("/api/rest", indexRoutes);

// Init discord client
(async() => {
	await initDiscordClient();
})()

app.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});
