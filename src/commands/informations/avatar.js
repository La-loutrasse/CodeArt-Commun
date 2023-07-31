import { ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('avatar')
    .setDescription('Obtenir l\'avatar de quelqu\'un')
    .setDMPermission(true)
    .addUserOption(option =>
        option.setName('utilisateur')
            .setDescription('L\'utilisateur')
    );
    
/**
 * 
 * @param {ChatInputCommandInteraction} interaction
 * @returns
 */
export async function execute(interaction) {
    const user = interaction.options.getUser('utilisateur') ?? interaction.user;
    return await interaction.reply(user.displayAvatarURL({ size: 4096 }));
}
