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
    name: "Avatar",
    type: "USER",
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        let member = yield client.users.fetch(interaction.targetId);
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`Avatar de: __**${member.username}**__`)
            .addField('Pedido por:', `${interaction.member}`)
            .setImage(member.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
            .setColor('WHITE')
            .setFooter(':)', client.user.displayAvatarURL())
            .setTimestamp();
        interaction.followUp({ embeds: [embed] });
    }),
};
