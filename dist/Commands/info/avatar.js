"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
exports.command = {
    name: "avatar",
    aliases: ["pfp"],
    category: 'Útil',
    description: 'Muestra el avatar de un usuario (mencionado) o de ti si no mencionas a nadie.',
    usage: 'avatar/pfp',
    run: async (client, message, args) => {
        let member;
        if (message.mentions.users.first()) {
            member = message.mentions.users.first()?.id;
        }
        else if (args[0]) {
            member = args[0];
        }
        else {
            member = message.author.id;
        }
        try {
            let a = await client.users.fetch(member);
            const embed = new discord_js_1.default.MessageEmbed()
                .setTitle(`Avatar De: **${a.username}**`)
                .addField('Pedido por:', `${message.author}`)
                .setImage(a.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
                .setColor('WHITE')
                .setFooter(':)', client.user?.avatarURL())
                .setTimestamp();
            message.reply({ embeds: [embed] });
        }
        catch (err) {
            console.log(err);
        }
    }
};
//# sourceMappingURL=avatar.js.map