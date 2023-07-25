import { Events } from 'discord.js';
import { loadButtons } from '../handlers/loadComponents.js';

export const event = {
    name: Events.InteractionCreate,
    async execute(interaction) {
        if(interaction.isChatInputCommand()) {
            const { command } = interaction.client.commands.get(interaction.commandName);

            try {
                await command.execute(interaction);
            } catch(err) {
                console.error(`Une erreur s'est produite lors de l'exécution de la commande ${interaction.commandName}:\n${err}`);
            }
        }
        if(interaction.isButton()) {

            await loadButtons(interaction);
        }
        if(interaction.isAutocomplete()) {
            const { command } = interaction.client.commands.get(interaction.commandName);

            try {
                await command.autocomplete(interaction);
            } catch(err) {
                console.error(`Une erreur s'est produite lors de l'autocomplete de la commande ${interaction.commandName}:\n${err}`);
            }
        }
    }
}