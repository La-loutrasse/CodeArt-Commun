const Discord = require("discord.js")
const {
    REST
} = require("@discordjs/rest")
const {
    Routes
} = require("discord.js")

module.exports = async bot => {

    let commands = [];

    bot.commands.forEach(async command => {

        for(const opt of command.options) {
            if(opt.autocomplete && opt.choices?.length > 1) throw new TypeError(`Erreur lors du chargement  de la  commande ${command.name}: Il ne peut pas y avoir une autocomplete ET des choices!`);
            if(opt.type === 'boolean' && opt.autocomplete) throw new TypeError(`Erreur lors du chargement  de la  commande ${command.name}: Il ne peut pas y avoir une autocomplete ou des choices sur une option de type boolean!`);
            if(opt.type === 'boolean' && opt.choices) throw new TypeError(`Erreur lors du chargement  de la  commande ${command.name}: Il ne peut pas y avoir une autocomplete ou des choices sur une option de type boolean!`);
        }

        let slashcommand = new Discord.SlashCommandBuilder()
            .setName(command.name)
            .setDescription(command.description)
            .setDMPermission(command.dm)
            .setDefaultMemberPermissions(command.permission === "Aucune" ? null : command.permission)

        if (command.options?.length >= 1) {
            for (let i = 0; i < command.options.length; i++) {
                if (command.options[i].type === "string") slashcommand[`add${command.options[i].type.slice(0,1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option =>{
                     option.setName(command.options[i].name)
                     .setDescription(command.options[i].description)
                     .setAutocomplete(command.options[i].autocomplete)
                     .setRequired(command.options[i].required)
                     for(const choice of command.options[i].choices) {
                        option.addChoices(choice);
                     }
                     
                }
                     )

                else slashcommand[`add${command.options[i].type.slice(0,1).toUpperCase() + command.options[i].type.slice(1, command.options[i].type.length)}Option`](option =>{
                    option.setName(command.options[i].name)
                    .setDescription(command.options[i].description)
                    .setRequired(command.options[i].required)
                    for(const option of command.options[i].choices) {
                    option.addChoices(option);
                    }
                })
            }
        }

        commands.push(slashcommand)
    })

    const rest = new REST({
        version: "10"
    }).setToken(bot.token)

    await rest.put(Routes.applicationCommands(bot.user.id), {
        body: commands
    })
    console.log("les slashs commandes sont créées avec succès !")
    console.log("Aucune erreurs.")
    console.log("--------------------------------")
}

//Ce travail est sous licence CC BY-NC-ND 4.0 Astral Community© 乙σєи