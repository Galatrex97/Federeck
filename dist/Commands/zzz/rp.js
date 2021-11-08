"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const discord_nsfw_1 = __importDefault(require("discord-nsfw"));
const nsfw = new discord_nsfw_1.default();
exports.command = {
    name: "real-pussy",
    aliases: ["rpussy"],
    usage: 'real-pussy',
    category: 'NSFW',
    description: 'nya',
    run: async (client, message, args) => {
        if (!message.channel.nsfw)
            return message.channel.send("Este no es un canal **NSFW**");
        const image = await nsfw.pussy();
        const embed = new discord_js_1.default.MessageEmbed()
            .setDescription(`Koya afk`)
            .setColor("WHITE")
            .setImage(image);
        message.channel.send({ embeds: [embed] });
    }
};
//# sourceMappingURL=rp.js.map