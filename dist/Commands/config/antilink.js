"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
const antilinkbv_1 = __importDefault(require("../../Models/antilinkbv"));
exports.command = {
    name: "antilink",
    aliases: ["antilinks"],
    usage: 'antilinks on/off',
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
            antilinkbv_1.default.findOne({ Guild: message.guild?.id }, async (err, data) => {
                if (data.jaja === true) {
                    return message.reply({ content: `El antilink ya estaba activado. Usa \`${p}antilink off\` para desactivarlo` });
                }
                if (err)
                    console.log(err);
                if (data) {
                    await antilinkbv_1.default.findOneAndDelete({ Guild: message.guild?.id });
                    data = new antilinkbv_1.default({
                        Guild: message.guild?.id,
                        jaja: true
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido activado. Ahora solo los administradores pueden enviar links." });
                }
                if (!data) {
                    data = new antilinkbv_1.default({
                        Guild: message.guild?.id,
                        jaja: true
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido activado por primera vez" });
                }
            });
        }
        else if (args[0] === 'off') {
            antilinkbv_1.default.findOne({ Guild: message.guild?.id }, async (err, data) => {
                if (data.jaja === false) {
                    return message.reply({ content: `El antilink ya estaba desactivado. Prueba \`${p}antilink on\` para activarlo.` });
                }
                if (err) {
                    console.log(err);
                    let errmsg = new discord_js_1.MessageEmbed()
                        .setTitle('Ha ocurrido un error')
                        .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                        .setFooter('Tipico')
                        .setColor("WHITE")
                        .setTimestamp();
                }
                if (!data) {
                    return message.reply({ content: `El antilink por defecto viene deshabilitado. Usa \`${p}antilink on\` para activarlo por primera vez.` });
                }
                else if (data) {
                    await antilinkbv_1.default.findOneAndDelete({ Guild: message.guild?.id });
                    data = new antilinkbv_1.default({
                        Guild: message.guild?.id,
                        jaja: false
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido desactivado. Ahora pueden enviar links." });
                }
            });
        }
        else {
            return;
        }
    }
};
//# sourceMappingURL=antilink.js.map