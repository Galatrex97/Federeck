"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
exports.command = {
    name: 'invite',
    aliases: [],
    category: 'Info',
    usage: 'invite',
    description: 'Envia mi link de invitación',
    run: (client, message, args, p) => {
        const nya = new discord_js_1.default.MessageEmbed()
            .setTitle("Lyon Invite Link")
            .setColor("WHITE")
            .setFooter("Gracias.")
            .setTimestamp()
            .setDescription(`Mi link de invitación está en el botón de abajo.\nSi tienes alguna duda usa \`${p}help\``)
            .setThumbnail(`${client.user?.avatarURL()}`);
        const row = new discord_js_1.default.MessageActionRow().addComponents(new discord_js_1.default.MessageButton()
            .setURL("https://discord.com/oauth2/authorize?client_id=849395994973700117&scope=bot%20applications.commands&permissions=2146938238")
            .setStyle("LINK")
            .setLabel("Invitación"));
        try {
            message.reply({ embeds: [nya], components: [row] });
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            console.log(err);
        }
    }
};
//# sourceMappingURL=invite.js.map