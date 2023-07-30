import { Client, Events } from 'discord.js';

export const event = {
    name: Events.ClientReady,
    /**
     * @param {Client} client
    */
    execute(client) {
        console.log(`${client.user.tag} est connecté!`);
    }
}