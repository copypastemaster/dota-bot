import { OPEN_DOTA_BASE_URL } from "../../utils/envs.js";
import { Request, Response } from "express";

export default async function getPlayers(req: Request, res: Response) {
	console.log("BASE_URL:", OPEN_DOTA_BASE_URL);
	const ACC_ID = "344647611";

	// const realAccId = req.params.

	try {
		const data = await fetch(
			`${OPEN_DOTA_BASE_URL}/players/${ACC_ID}/recentMatches?limit=1`
		);

		if (!data.ok) {
			res.status(data.status).json({
				error: `OpenDota API Error: ${data.statusText}`,
			});
		}

		const bufferedData = await data.json();

		res.status(200).json(bufferedData);
	} catch (err: unknown) {
		const errMessage = err instanceof Error ? err.message : "Unknown error";

		console.error({ errormsg: errMessage });

		res.status(500).json({ error: errMessage });
	}
}
