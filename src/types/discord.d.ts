import { Collection } from "discord.js";

// Extends the library to add commands prop
declare module "discord.js" {
	export interface Client {
		// Replace any with commands enum
		commands: Collection<string, any>;
	}
}
