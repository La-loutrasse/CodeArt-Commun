import { ButtonInteraction } from 'discord.js';
import { readdirSync } from 'fs';
import { join, resolve } from 'path';

/**
 * @param {ButtonInteraction} interaction
 * @returns
*/

export async function loadButtons(interaction) {

  if (!interaction.isButton()) return;

  const joinedButtonsPath = join(process.cwd(), 'boutons');

  const buttonsFiles = readdirSync(joinedButtonsPath).filter(f => f.endsWith('.js'));

  for (const button of buttonsFiles) {
    const buttonModulePath = join(joinedButtonsPath, button);

    const urlPath = 'file:///' + resolve(buttonModulePath).replace(/\\/g, '/');

    const buttonModule = await import(urlPath);
    if (interaction.customId === buttonModule.button.customId) {
      await buttonModule.button.execute(interaction);
    }
  }
}

