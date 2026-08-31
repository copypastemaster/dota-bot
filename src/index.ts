import { OPEN_DOTA_BASE_URL, PORT } from "./utils/envs.js";
import express, { Request, response, Response } from "express";

const app = express();
const ACC_ID = "344647611"

app.get("/", (req: Request, res: Response) => {
	res.send("Hello, world!");
});

app.get("/test", async (req: Request, res: Response) => {
	console.log("BASE_URL:", OPEN_DOTA_BASE_URL);

	try {
		const data = await fetch(`${OPEN_DOTA_BASE_URL}players/${ACC_ID}/matches`);

		if (!data.ok) {
			res.status(data.status).json({
				error: `OpenDota API Error: ${data.statusText}`
			});
			return;
		}

		const playerData = await data.json();

		res.status(200).json(playerData)
	} catch (err: unknown) {
		const errMessage = err instanceof Error ? err.message : "Unknown error";

		console.error({ errormsg: errMessage });

		res.status(500).json({ error: errMessage });
	}
})

app.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});
