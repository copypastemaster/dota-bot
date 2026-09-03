import { REST, Routes } from "discord.js";
import { DISCORD_BOT_APPLICATION_ID, DISCORD_BOT_TOKEN, LINKLE_SERVER_ID, TESTBOT_SERVER_ID } from "./utils/envs.js";
import fs from "fs";
import path from "node:path";
import { pathToFileURL } from "node:url";

const commands: any[] = [];

// Grab commands from folders
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

        if (!builder) console.error("Missing builder:", builder);

        if ("data" in builder && "execute" in builder) {
            commands.push(builder.data.toJSON());
        } else {
            console.log(
                `[WARNING] The command at ${filePath} is missing a required "data" or "execute" props`
            )
        }
    }
}

// Construct and perpare an instance of the REST module
const rest = new REST().setToken(DISCORD_BOT_TOKEN);

// Deploy commands
(async () => {
    try {
        console.log(`Started refreshing ${commands.length} application (/) commands.`);

        const data = await rest.put(Routes.applicationGuildCommands(DISCORD_BOT_APPLICATION_ID, TESTBOT_SERVER_ID), {
            body: commands
        })
    } catch (err: unknown) {
        console.error(err)
    }
})()