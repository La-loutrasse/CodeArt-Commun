import { CommandInteraction, Events } from 'discord.js';

export const name = Events.InteractionCreate;

/**
 * @param {CommandInteraction} interaction
 */
export async function execute(interaction) {
    if (interaction.isChatInputCommand()) {
        const command = interaction.client.commands.get(interaction.commandName);

        try {
            await command.execute(interaction);
        } catch (err) {
            console.error(`Une erreur s'est produite lors de l'exécution de la commande ${interaction.commandName}:\n${err}`);
        }
    } else if (interaction.isButton()) {
        const component = interaction.client.components.get(interaction.customId);

        try {
            await component.execute(interaction);
        } catch (err) {
            console.error(`Une erreur s'est produite lors de l'exécution du component ${interaction.customId}:\n${err}`);
        }
    } else if (interaction.isAutocomplete()) {
        const command = interaction.client.commands.get(interaction.commandName);

        try {
            await command.autocomplete(interaction);
        } catch (err) {
            console.error(`Une erreur s'est produite lors de l'autocomplete de la commande ${interaction.commandName}:\n${err}`);
        }
    }
}
