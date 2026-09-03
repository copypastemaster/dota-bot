import { PORT, DISCORD_BOT_TOKEN } from "./utils/envs.js";
import express from "express";
import indexRoutes from "./routes/index.route.js";
import {
	Client,
	Events,
	GatewayIntentBits,
	Collection,
	MessageFlags,
} from "discord.js";
import path from "node:path";
import fs from "node:fs";
import { pathToFileURL } from "node:url";

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

client.once(Events.ClientReady, (readyClient) => {
	console.log(`Ready! Logged in as ${readyClient.user.tag}`);
});

client.login(DISCORD_BOT_TOKEN);

client.commands = new Collection();

const foldersPath = path.join(import.meta.dirname, "commands");
const commandFolders = fs.readdirSync(foldersPath);

for (const folder of commandFolders) {
	const commandsPath = path.join(foldersPath, folder);
	const commandFiles = fs
		.readdirSync(commandsPath)
		.filter((file) => file.endsWith(".ts"));
	for (const file of commandFiles) {
		const filePath = path.join(commandsPath, file);
		const command = await import(pathToFileURL(filePath).href);

		const builder = command.builder
		// Set a new item in the Collection with the key as the command name and the value as the exported module
		if ("data" in builder && "execute" in builder) {
			client.commands.set(builder.data.name, builder);
		} else {
			console.log(
				`[WARNING] The command at ${filePath} is missing a required "data" or "execute" property.`
			);
		}
	}
}

client.on(Events.InteractionCreate, async (interaction) => {
	if (!interaction.isChatInputCommand()) return;

	const command = interaction.client.commands.get(interaction.commandName);

	if (!command) {
		console.error(`No command matching ${interaction.commandName} was found.`);
		return;
	}

	try {
		await command.execute(interaction)
	} catch (e: unknown) {
		console.error(e);
		if (interaction.replied || interaction.deferred) {
			await interaction.followUp({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral
			})
		} else {
			await interaction.reply({
				content: "There was an error while executing this command!",
				flags: MessageFlags.Ephemeral
			})
		}
	};

	console.log("Interaction create:", interaction);
});

app.listen(PORT, () => {
	console.log("Listening on port:", PORT);
});
