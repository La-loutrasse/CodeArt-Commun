import { Events } from 'discord.js';

export const event = {
    name: Events.ClientReady,
    execute(client) {
        console.log(`${client.user.tag} est connecté!`);
    }
}