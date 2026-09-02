import { PORT, DISCORD_BOT_TOKEN } from "./utils/envs.js";
import express from "express";
import indexRoutes from "./routes/index.route.js";
import { Client, Events, GatewayIntentBits } from "discord.js";

const app = express();
app.use("/api/rest", indexRoutes);

/** NOTE: The term "guild" is used by Discord API to refer to a discord server */

/**
 * From the docs:
 * The GatewayIntentBits.Guilds intents option is necessary for the
 * discord.js client to work as you expect it to, as it ensures
 * that the caches for guilds, channels, and roles are populated and
 * available for internal use.
 */
const client = new Client({
	intents: [GatewayIntentBits.Guilds],
});

client.once(Events.ClientReady, (readyClient: Client<true>) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN);

app.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});
