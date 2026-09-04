import { ChatInputCommandInteraction, SlashCommandBuilder } from "discord.js";
import getPlayer from "../../controller/players/players.controller.js";

const builder = {
    data: new SlashCommandBuilder()
        .setName("player")
        .setDescription("Find a dog ass player")
        .addStringOption((option) => 
            option
                .setName("dotaid")
                .setDescription("Input dota 2 id")
                .setRequired(true)
        ),
    async execute(interaction: ChatInputCommandInteraction) {
        const targetPlayer = interaction.options.getString("dotaid")

        if (!targetPlayer) return; 
        
        const [testPlayer] = await getPlayer(targetPlayer);
        const isRadiant = testPlayer.player_slot < 128;
        const didWin = testPlayer.radiant_win === isRadiant;

        if (!didWin) {
            await interaction.reply("Bitch ass noob");
            return;
        }

        await interaction.reply("Congrats dog.")
    },
}

export {
    builder
}