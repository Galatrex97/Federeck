"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
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
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d;
        let si = interaction.member;
        let user = interaction.options.getUser("user");
        let xd = interaction.options.getString("reason");
        let guild = interaction.guild;
        const member = ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user === null || user === void 0 ? void 0 : user.id)) || (yield ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(user.id).catch(err => { })));
        const owner = (yield guild.fetchOwner()).user.id;
        if (!si.permissions.has("KICK_MEMBERS")) {
            return interaction.followUp({ content: "No puedes realizar esta acción por falta de permisos", ephemeral: true });
        }
        if (!((_d = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.me) === null || _d === void 0 ? void 0 : _d.permissions.has("KICK_MEMBERS"))) {
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
        if (client.user.id === (member === null || member === void 0 ? void 0 : member.id)) {
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
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
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
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            }
            interaction.followUp({ content: `El bot **${user}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}\nRazón: **${xd ? xd : "No se dió una razón"}**`, ephemeral: false });
        }
    }),
};
