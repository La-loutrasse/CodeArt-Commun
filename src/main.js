import { Client, Collection, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { loadEvents, loadCommands, loadComponents } from './util/handlers.js';

dotenv.config();

const client = new Client({ 
    intents: [
        GatewayIntentBits.Guilds,
        GatewayIntentBits.MessageContent,
        GatewayIntentBits.AutoModerationConfiguration,
        GatewayIntentBits.AutoModerationExecution
    ]
});

client.commands = new Collection();

await Promise.all([
    loadCommands(client),
    loadEvents(client),
    loadComponents(client)
]);

client.login(process.env.CLIENT_TOKEN);