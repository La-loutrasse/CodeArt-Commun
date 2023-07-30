import fs from 'node:fs';
import path from 'node:path';
import { Client, REST, Routes } from 'discord.js';
import * as dotenv from 'dotenv';
dotenv.config();

/**
 * @param {Client} client
*/

export async function loadCommands(client) {
  const commands = [];
  const foldersPath = path.join(process.cwd(), 'commands');
  const commandFolders = fs.readdirSync(foldersPath);

  for (const folder of commandFolders) {
    const commandsPath = path.join(foldersPath, folder);
    const commandFiles = fs.readdirSync(commandsPath).filter(file => file.endsWith('.js'));

    for (const file of commandFiles) {
      const filePath = path.join(commandsPath, file);
      const urlPath = 'file:///' + path.resolve(filePath).replace(/\\/g, '/');

      console.log(urlPath);

      const command = await import(urlPath);
      client.commands.set(command.command.data.name, command);
      commands.push(command.command.data.toJSON());

    }
  }

  const rest = new REST().setToken(process.env.CLIENT_TOKEN);

  (async () => {
    try {
      console.log(`Started refreshing ${commands.length} application (/) commands.`);
      const data = await rest.put(
        Routes.applicationCommands(process.env.CLIENT_ID),
        { body: commands },
      );

      console.log(`Successfully reloaded ${data.length} application (/) commands.`);
    } catch (error) {
      console.error(error);
    }
  })();
}