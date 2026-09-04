import { OPEN_DOTA_BASE_URL } from "../../utils/envs.js";
import { Request, Response } from "express";

export default async function getPlayer(accId: number | string) {
	console.log("BASE_URL:", OPEN_DOTA_BASE_URL);
	const MY_ACC_ID = "344647611";
	const KATE_ACC_ID = "258905255";

	// To determine wins:
	// Check against radiant_win and player_slot where:
	// playerslot < 128 = radiant
	// game_mode: 22 = ranked

	/**
	 * Todo:
	 * 1. Parameterize acc_id on commands and register this logic
	 * 2. fetch 20(or more with limit parameterized?) recent matches
	 * 3. calculate the win rate
	 * 4. send back the result to bot
	 * 5. We can flame them in game
	 */

	/**
	 * TODO: Create a proper shape for this.
	 */
	try {
		const data = await fetch(
			`${OPEN_DOTA_BASE_URL}/players/${accId}/recentMatches?limit=5`
		);

		if (!data.ok) {
			console.error("No data available.")
			return;
		}

		const bufferedData = await data.json();
		return bufferedData;
	} catch (err: unknown) {
		const errMessage = err instanceof Error ? err.message : "Unknown error";

		console.error({ errormsg: errMessage });

		throw err
	}
}
