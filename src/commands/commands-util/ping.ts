import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";

const builder = {
	data: new SlashCommandBuilder()
		.setName("ping")
		.setDescription("Replies with pong!")
		.addUserOption((option) => 
			option
				.setName("target")
				.setDescription("The user to ping")
				.setRequired(true) // required
		)
		.addStringOption((option) => 
			option
				.setName("reason")
				.setDescription("The reason for pinging")
				.setRequired(false) // optional param
		),
	async execute(interaction: ChatInputCommandInteraction) {
		const targetUser = interaction.options.getUser("target");
		const reason = interaction.options.getString("reason") ?? "No reason provided";

		await interaction.reply(
			`Target: ${targetUser?.tag}\nReason: ${reason}`
		);
	},
};

export { builder };
