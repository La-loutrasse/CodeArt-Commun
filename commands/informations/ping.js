import { SlashCommandBuilder, ButtonBuilder, ActionRowBuilder, ButtonStyle } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
    .setName('ping')
    .setDescription('Obtenir la latence du bot')
    .setDMPermission(true),
    async execute(interaction) {

        const Button = new ButtonBuilder()
        .setLabel('Actualiser')
        .setCustomId('ping.actualiser')
        .setStyle(ButtonStyle.Secondary);

        const row = new ActionRowBuilder().addComponents(
            Button
        )

        await interaction.reply({ content: `Latence du bot: \`${interaction.client.ws.ping}\``, components: [row] });
    }
}