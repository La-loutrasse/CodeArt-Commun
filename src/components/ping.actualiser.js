import { ButtonInteraction } from "discord.js";

let cooldown = [];
let time = 0;

setInterval(() => {
    if (!time <= 0) time -= 1;
}, 1000)

export const name = "ping.actualiser";

/**
 * @param {ButtonInteraction} interaction
 */
export async  function execute(interaction) {
    if (cooldown.includes(interaction.user.id)) {
        return await interaction.reply({
            content: `Attendez encore ${time - (cooldown.length - 1) * 30} secondes pour utiliser ce  bouton!`,
            ephemeral: true
        })
    }
    await interaction.deferUpdate();
    await interaction.message.edit({
        content: `Latence du bot: \`${interaction.client.ws.ping}\``
    });

    cooldown.push(interaction.user.id);
    time += 30;
    setTimeout(() => {
        cooldown.shift();
    }, 30000);
}
