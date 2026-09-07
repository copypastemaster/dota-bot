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
        await interaction.deferReply();

        const targetPlayer = interaction.options.getString("dotaid")
        if (!targetPlayer) {
            await interaction.editReply("You need to provide a dota ID.");
            return;
        }
        
        const matches = await getPlayer(targetPlayer);
        
        if (!matches || matches.length === 0) {
            await interaction.editReply("Couldn't find any matches for that account, or bad id");
            return;
        };

        const [testPlayer] = matches;
        const isRadiant = testPlayer.player_slot < 128;
        const didWin = testPlayer.radiant_win === isRadiant;

        await interaction.editReply(didWin ? 
                "Congrats dog." 
                : "Bitch ass dog"
            );
        },
}

// Calculates the winrate based on 20 recent matches
function calculateWinRate() {};


export {
    builder
}