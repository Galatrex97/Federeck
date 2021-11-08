"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const canvas_1 = require("canvas");
exports.command = {
    name: "whatsapp",
    aliases: ["wa"],
    usage: '',
    category: 'Fun',
    description: 'wasaaaa',
    run: async (client, message, args, p) => {
        let users;
        if (message.mentions.users.first()) {
            users = message.mentions.users.first()?.id;
        }
        else if (args[0]) {
            users = args[0];
        }
        else {
            users = message.author.id;
        }
        let user = await client.users.fetch(users);
        const avatar = await (0, canvas_1.loadImage)(user.displayAvatarURL({ format: "png", size: 4096 }));
        const canvas = (0, canvas_1.createCanvas)(800, 800);
        const ctx = canvas.getContext("2d");
        const background = await (0, canvas_1.loadImage)("https://cdn.discordapp.com/attachments/788657156428660757/836802519639392296/PicsArt_04-27-09.59.41.png");
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer(), `${user.username}_whatsapp.png`);
        message.channel.send({ files: [attachment] });
    }
};
//# sourceMappingURL=whatsapp.js.map