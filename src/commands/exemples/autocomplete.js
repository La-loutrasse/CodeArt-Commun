import { AutocompleteInteraction, ChatInputCommandInteraction, SlashCommandBuilder } from 'discord.js';

export const data = new SlashCommandBuilder()
    .setName('autocomplete')
    .setDescription('Ceci est  une commande d\'exemple')
    .setDMPermission(true)
    .addStringOption(option =>
        option.setName('option')
            .setDescription('option  qui va être complétée')
            .setAutocomplete(true)
    )
    .addStringOption(option =>
        option.setName('deuxieme-option')
            .setDescription('voici une  deuxieme option')
            .setAutocomplete(true));

/**
 * @param {AutocompleteInteraction} interaction
 */
export async function autocomplete(interaction) {
    const option = interaction.options.getFocused(true);

    let choices;

    if (option.name === "option") {
        choices = [
            { name: "Salut!", value: "1" },
            { name: "Ceci est un exemple", value: "2" },
            { name: "D'autocomplete!", value: "3" }
        ];
    }
    if (option.name === "deuxieme-option") {
        choices = [
            { name: "Bonjour!", value: "1" },
            { name: "Voici un petit exemple", value: "2" },
            { name: "d'autocompletion d'option!", value: "3" }
        ]
    }

    return await interaction.respond(choices.map(c => ({ name: c.name, value: c.value })));
}

/**
 * @param {ChatInputCommandInteraction} interaction
 */
export async function execute(interaction) {
    return await interaction.reply({
        content: `Vous avez selectionné la ${interaction.options.getString('option')}ème option!`, ephemeral: true
    });
}
