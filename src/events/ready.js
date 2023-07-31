import { Client, Events } from 'discord.js';

export const name = Events.ClientReady;

/**
 * @param {Client} client 
 */
export function execute(client) {
    console.log(`${client.user.tag} est connecté!`);
    client.application.commands.set(client.commands.map(cmd => cmd.data)).then(
        () => console.log("Deployed application (/) commands.")
    );
}
