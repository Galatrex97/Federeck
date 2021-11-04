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
    name: "Expulsar este usuario",
    type: "USER",
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c;
        const targetUser = yield interaction.options.getUser('user', true);
        const target = yield ((_a = interaction.guild) === null || _a === void 0 ? void 0 : _a.members.fetch(targetUser.id));
        let guild = interaction.guild;
        const owner = (yield guild.fetchOwner()).user.id;
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.followUp({ content: "No puedes realizar está acción por falta de permisos", ephemeral: true });
        }
        if ((target === null || target === void 0 ? void 0 : target.id) === owner && target.id === interaction.user.id) {
            return interaction.followUp({ content: 'No te puedes expulsar a ti mismo, además tu eres el dueño del servidor.', ephemeral: true });
        }
        if ((target === null || target === void 0 ? void 0 : target.id) === interaction.user.id) {
            return interaction.followUp({ content: "No puedes expulsarte a ti mismo.", ephemeral: true });
        }
        if ((target === null || target === void 0 ? void 0 : target.id) === owner) {
            return interaction.followUp({ content: "No puedes expulsar al dueño del servidor.", ephemeral: true });
        }
        if (!((_c = (_b = interaction.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("KICK_MEMBERS"))) {
            return interaction.followUp({ content: "No tengo el permiso para expulsar miembros, así que no se puede usar ese comando.", ephemeral: true });
        }
        if (!interaction.member.permissions.has("KICK_MEMBERS")) {
            return interaction.followUp({ content: "No tienes el permiso para **Expulsar miembros**.", ephemeral: true });
        }
        if (client.user.id === (target === null || target === void 0 ? void 0 : target.id)) {
            return interaction.followUp({ content: "XDn't", ephemeral: true });
        }
        /*             if (interaction.member.roles <= target.roles.highest.position) {
                               return interaction.followUp({content: 'No puedes expulsar a una persona con un mayor o igual rango que tú.', ephemeral: true})
                    } */
        if (!(targetUser === null || targetUser === void 0 ? void 0 : targetUser.bot)) {
            target === null || target === void 0 ? void 0 : target.kick();
            interaction.followUp({ content: `El usuario **${target}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}`, ephemeral: false });
        }
        if (targetUser === null || targetUser === void 0 ? void 0 : targetUser.bot) {
            try {
                target === null || target === void 0 ? void 0 : target.kick();
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
            interaction.followUp({ content: `El bot **${target}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}`, ephemeral: false });
        }
    }),
};
