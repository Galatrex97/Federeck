"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const afk_1 = __importDefault(require("../../Models/afk"));
exports.command = {
    name: 'afk',
    aliases: [],
    usage: 'afk',
    description: 'Comando AFK',
    category: 'Misceláneo',
    run: async (client, message, args) => {
        let data;
        try {
            data = await afk_1.default.findOne({
                userId: message.author.id,
                guildId: message.guild?.id,
            });
            if (!data) {
                data = await afk_1.default.create({
                    userId: message.author.id,
                    guildId: message.guild?.id,
                });
            }
        }
        catch (e) {
            console.log(e);
        }
        data.AFK_Reason = args.join(" ");
        if (data.AFK_Reason) {
            message.channel.send(`${message.author} tu AFK se ha establecido a: **${data.AFK_Reason}**`);
        }
        if (!data.AFK_Reason) {
            message.channel.send(`${message.author} Ahora estás en AFK`);
        }
        data.AFK = true;
        data.timeAgo = Date.now();
        await data.save();
    }
};
//# sourceMappingURL=afk.js.map