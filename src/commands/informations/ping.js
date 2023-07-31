import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle, ChatInputCommandInteraction } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Obtenir la latence du bot')
    .setDMPermission(true);
    
/**
 * @param {ChatInputCommandInteraction} interaction
 * @returns
*/
export async function execute(interaction) {

    const Button = new ButtonBuilder()
        .setLabel('Actualiser')
        .setCustomId('ping.actualiser')
        .setStyle(ButtonStyle.Secondary);

    const row = new ActionRowBuilder().addComponents(Button)

    return await interaction.reply({
        content: `Latence du bot: \`${interaction.client.ws.ping}\``,
        components: [row]
    });
}
