import { Client, Collection, GatewayIntentBits } from 'discord.js';
import * as dotenv from 'dotenv';
import { loadCommands } from './handlers/loadCommands.js';
import { loadEvents } from './handlers/loadEvents.js';

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

client.login(process.env.CLIENT_TOKEN).then(async () => {
    await loadCommands(client);
    await loadEvents(client);
});