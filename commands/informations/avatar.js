import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
        .setName('avatar')
        .setDescription('Obtenir la latence du bot')
        .setDMPermission(true)
        .addUserOption(option =>
            option.setName('utilisateur')
                .setDescription('L\'utilisateur')
        ),
    /**
     * 
     * @param {ChatInputCommandInteraction} interaction
     * @returns
     */
    async execute(interaction) {
        const user = interaction.options.getUser('utilisateur') ?? interaction.user;
        return await interaction.reply({
            files: [user.displayAvatarURL()]
        });
    }
}