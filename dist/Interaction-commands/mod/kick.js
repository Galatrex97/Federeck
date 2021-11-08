"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const discord_js_1 = require("discord.js");
exports.Interaction = {
    name: "kick",
    description: "Expulsa a alguien del servidor",
    options: [
        {
            name: 'user',
            description: 'Usuario a expulsar',
            type: 'USER',
            required: true
        },
        {
            name: "reason",
            description: "Razón de la expulsión",
            type: "STRING",
            required: false
        }
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
        let si = interaction.member;
        let user = interaction.options.getUser("user");
        let xd = interaction.options.getString("reason");
        let guild = interaction.guild;
        const member = interaction.guild?.members.cache.get(user?.id) || await interaction.guild?.members.fetch(user.id).catch(err => { });
        const owner = (await guild.fetchOwner()).user.id;
        if (!si.permissions.has("KICK_MEMBERS")) {
            return interaction.followUp({ content: "No puedes realizar esta acción por falta de permisos", ephemeral: true });
        }
        if (!interaction.guild?.me?.permissions.has("KICK_MEMBERS")) {
            return interaction.followUp({ content: "No tengo el permiso para expulsar miembros, así que no se puede usar ese comando.", ephemeral: true });
        }
        if (user.id === owner && user.id === interaction.user.id) {
            return interaction.followUp({ content: 'No te puedes expulsar a ti mismo, además tu eres el dueño del servidor.', ephemeral: true });
        }
        if (user.id === interaction.user.id) {
            return interaction.followUp({ content: "No puedes expulsarte a ti mismo ||A no ser que abandones el servidor||", ephemeral: true });
        }
        if (user.id === owner) {
            return interaction.followUp({ content: "No puedes expulsar al dueño del servidor.", ephemeral: true });
        }
        if (client.user?.id === member?.id) {
            return interaction.followUp({ content: "XDn't", ephemeral: true });
        }
        /*    if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                      return interaction.followUp({content: 'No puedes expulsar a una persona con un mayor o igual rango que tú.', ephemeral: true})
           } */
        if (!user.bot) {
            try {
                member.kick(xd);
                interaction.followUp({ content: `El usuario **${user}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}\nRazón: **${xd ? xd : "No se dió una razón"}**`, ephemeral: false });
            }
            catch (err) {
                console.log(err);
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
            }
        }
        else if (user.bot) {
            try {
                member.kick(xd);
            }
            catch (err) {
                console.log(err);
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
            }
            interaction.followUp({ content: `El bot **${user}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}\nRazón: **${xd ? xd : "No se dió una razón"}**`, ephemeral: false });
        }
    },
};
//# sourceMappingURL=kick.js.map