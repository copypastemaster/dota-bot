import { Collection } from "discord.js";

declare module "discord.js" {
	export interface Client {
		// Replace any with commands enum
		commands: Collection<string, any>;
	}
}
