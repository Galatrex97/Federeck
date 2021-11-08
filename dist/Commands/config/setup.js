"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const parent_1 = __importDefault(require("../../Models/parent"));
exports.command = {
    name: 'ticket-setup',
    category: 'Configuración',
    aliases: [],
    description: 'Esto abrirá un ticket para resolver inconvenientes y/o problemas o dudas.',
    usage: 'setup',
    run: async (client, message, args, p) => {
        let idParent = args[0];
        if (!idParent)
            return;
        let data = await parent_1.default.findOne({ guildId: message.guild?.id, parentId: idParent });
        if (!data) {
            data = new parent_1.default({ guildId: message.guild?.id, parentId: idParent });
            data.save();
            if (!idParent)
                return message.channel.send(`Necesitas dar el id de una categoría.`);
            let category = message.guild?.channels.resolve(idParent);
            if (category.type !== "GUILD_CATEGORY")
                return message.reply("Esa no es una categoria válida");
            message.channel.send("Se ha configurado la categoría para los tickets.");
        }
        if (data) {
            await parent_1.default.findOneAndDelete({ guildId: message.guild?.id });
            data = new parent_1.default({ guildId: message.guild?.id, parentId: idParent });
            if (!idParent)
                return message.channel.send(`Necesitas dar el id de una categoría.`);
            let category = message.guild?.channels.resolve(idParent);
            if (category.type !== "GUILD_CATEGORY") {
                return message.reply("Esa no es una categoria válida");
            }
            data.save();
            message.channel.send("Se ha configurado la categoría para los tickets.");
        }
    }
};
//# sourceMappingURL=setup.js.map