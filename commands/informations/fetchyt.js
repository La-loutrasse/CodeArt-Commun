import { SlashCommandBuilder } from 'discord.js';

export const command = {
    data: new SlashCommandBuilder()
    .setName('parse')
    .setDescription('test')
    .addStringOption(option =>
        option.setName('id')
        .setDescription('l\'id de la chaine')
        .setRequired(true)),
        async execute(interaction) {
            const id = interaction.options.getString('id');

            const url = `https://www.youtube.com/feeds/videos.xml?channel_id=${id}`;

            const response = await fetch(url);

            const text = await response.text();

            const vids = ((text.split('<title>')).join('')).split('</text>');

            console.log(vids)

            let videos = [];

            for(let i = 0; i < vids.length / 2; i++) {
                vids.shift();
                videos.push(vids.shift());
            }

            console.log(videos)

            await interaction.reply({ content: `\`\`\`${videos.join('\n')}\`\`\``});
        }
}