"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importDefault(require("discord.js"));
const add_1 = __importDefault(require("../../Models/add"));
exports.command = {
    name: "set-welcome",
    aliases: [],
    usage: 'set-welcome <id o mencion del canal>',
    category: 'Configuración',
    description: '',
    run: async (client, message, args) => {
        let canal = message.guild?.channels.cache.find(canal => canal.id == args[0]) || message.mentions.channels.first();
        let bienvenida = await add_1.default.findOne({ Guild: message.guild?.id }).exec();
        if (!canal)
            return message.channel.send('Menciona o ingresa la ID de un canal al cual se redireccionarán las bienvenidas');
        if (canal.type !== "GUILD_TEXT") {
            return message.channel.send("Solo se pueden establecer canales de texto.");
        }
        if (!message.member?.permissions.has('MANAGE_GUILD'))
            return message.channel.send('Necesitas un permiso: \n**Gestionar Servidor**`');
        if (bienvenida) {
            await add_1.default.updateOne({ Guild: message.guild?.id, Channel: canal.id });
            message.channel.send({ embeds: [new discord_js_1.default.MessageEmbed()
                        .setDescription(`El canal de bienvenidas ahora es ` + canal.toString())
                        .setColor('WHITE')
                ] });
        }
        else {
            await new add_1.default({ Guild: message.guild?.id, Channel: canal.id }).save();
            message.channel.send({ embeds: [new discord_js_1.default.MessageEmbed()
                        .setDescription(`El canal de bienvenidas es ` + canal.toString()).setColor("WHITE")
                ] });
        }
    }
};
//# sourceMappingURL=setbienvenidas.js.map