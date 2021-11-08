"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const lagrasa_1 = __importDefault(require("../../Models/lagrasa"));
exports.command = {
    name: "pacman",
    aliases: ["hailgrasa"],
    usage: 'pacman on/off',
    category: 'Configuración',
    description: '',
    run: (client, message, args, p) => {
        if (!message.member?.permissions.has("MANAGE_MESSAGES"))
            return message.reply("Necesitas el permiso **Gestionar mensajes**.").then(nya => {
                setTimeout(() => {
                    nya.delete();
                }, 7000);
            });
        if (!args[0])
            return;
        if (args[0] === 'on') {
            lagrasa_1.default.findOne({ guildId: message.guild?.id }, async (err, data) => {
                if (data.sdlg === true) {
                    return message.reply({ content: `Las respuestas a los ":v" ya estaban activadas. Usa \`${p}pacman off\` para desactivarlas.` });
                }
                if (err) {
                    console.log(err);
                    let errmsg = new discord_js_1.MessageEmbed()
                        .setTitle('Ha ocurrido un error')
                        .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                        .setFooter('Tipico')
                        .setTimestamp()
                        .setColor("WHITE");
                }
                if (data) {
                    await lagrasa_1.default.findOneAndDelete({ guildId: message.guild?.id });
                    data = new lagrasa_1.default({
                        guildId: message.guild?.id,
                        sdlg: true
                    });
                    data.save();
                    message.reply({ content: "#HailGrasa" });
                }
                if (!data) {
                    data = new lagrasa_1.default({
                        guildId: message.guild?.id,
                        sdlg: true
                    });
                    data.save();
                    message.reply({ content: "#HailGrasa" });
                }
            });
        }
        else if (args[0] === 'off') {
            lagrasa_1.default.findOne({ guildId: message.guild?.id }, async (err, data) => {
                if (data.sdlg === false) {
                    return message.reply({ content: `Las respuestas a los pacmans ya estaban desactivadas. Prueba \`${p}pacman on\` para activarlas.` });
                }
                if (err)
                    console.log(err);
                if (!data) {
                    return message.reply({ content: `Las respuestas a los pacmans vienen deshabilitadas por defecto. Usa \`${p}pacman on\` para activarlas por primera vez.` });
                }
                else if (data) {
                    await lagrasa_1.default.findOneAndDelete({ guildId: message.guild?.id });
                    data = new lagrasa_1.default({
                        guildId: message.guild?.id,
                        sdlg: false
                    });
                    data.save();
                    message.reply({ content: "Las respuestas a los pacmans han sido desactivadas. :'v" });
                }
            });
        }
        else {
            return;
        }
    }
};
//# sourceMappingURL=hailgrasa.js.map