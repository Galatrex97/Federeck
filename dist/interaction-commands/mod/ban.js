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
    name: "ban",
    description: "Banea un usuario",
    options: [
        {
            name: 'user',
            description: 'Usuario a banear',
            type: 'USER',
            required: true
        },
        {
            name: 'reason',
            description: 'Razón del baneo',
            type: 'STRING',
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let a = interaction.member;
        const guild = interaction.guild;
        const owner = (yield guild.fetchOwner()).user.id;
        const banReason = interaction.options.getString('reason');
        const user = interaction.options.getUser('user');
        const member = ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.cache.get(user.id)) || (yield ((_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.members.fetch(user.id).catch(err => { })));
        if ((user === null || user === void 0 ? void 0 : user.id) === owner && (user === null || user === void 0 ? void 0 : user.id) === interaction.user.id) {
            return interaction.followUp({ content: 'No te puedes banear a ti mismo, además tu eres el dueño del servidor.', ephemeral: true });
        }
        if ((member === null || member === void 0 ? void 0 : member.id) === owner) {
            return interaction.followUp({ content: "No puedes banear al dueño del servidor.", ephemeral: true });
        }
        if ((member === null || member === void 0 ? void 0 : member.id) === interaction.user.id) {
            return interaction.followUp({ content: "No te puedes banear a ti mismo.", ephemeral: true });
        }
        if (!((_d = (_c = interaction.guild) === null || _c === void 0 ? void 0 : _c.me) === null || _d === void 0 ? void 0 : _d.permissions.has("BAN_MEMBERS"))) {
            return interaction.followUp({ content: "No tengo el permiso para banear miembros, así que no se puede usar ese comando.", ephemeral: true });
        }
        if (!interaction.member.permissions.has("BAN_MEMBERS")) {
            return interaction.followUp({ content: "No tienes el permiso para **Banear miembros**.", ephemeral: true });
        }
        if (client.user.id === (user === null || user === void 0 ? void 0 : user.id)) {
            return interaction.followUp({ content: "No me puedes banear.", ephemeral: true });
        } /*  else if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                    return interaction.followUp({content: 'No puedes banear a una persona con un mayor o igual rango que tú.', ephemeral: true})
         } */
        if (!(user === null || user === void 0 ? void 0 : user.bot)) {
            const nya = new discord_js_1.MessageEmbed()
                .setTitle("Adiós.")
                .setDescription(`Has sido baneado de **${(_e = interaction.guild) === null || _e === void 0 ? void 0 : _e.name}** por el Moderador: **${interaction.user.username}**.\nLa razón de tu baneo fue: **${banReason}**.`)
                .setTimestamp()
                .setFooter("Hasta pronto.");
            try {
                member === null || member === void 0 ? void 0 : member.ban({ reason: banReason });
                member === null || member === void 0 ? void 0 : member.send({ embeds: [nya] });
                interaction.followUp({ content: `El usuario **${user}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`, ephemeral: false });
            }
            catch (err) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(err);
            }
        }
        if (user === null || user === void 0 ? void 0 : user.bot) {
            try {
                member === null || member === void 0 ? void 0 : member.ban({ reason: banReason });
                interaction.followUp({ content: `El bot **${user}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`, ephemeral: false });
            }
            catch (err) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(err);
            }
        }
    }),
};
