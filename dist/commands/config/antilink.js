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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
const antilinkbv_1 = __importDefault(require("../../models/antilinkbv"));
module.exports = {
    name: "antilink",
    aliases: ["antilinks"],
    usage: 'antilinks on/off',
    category: 'Configuración',
    description: '',
    run: (client, message, args, p) => {
        var _a, _b, _c;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR")))
            return message.reply("No.").then(nya => {
                setTimeout(() => {
                    nya.delete();
                }, 7000);
            });
        if (!args[0])
            return;
        if (args[0] === 'on') {
            antilinkbv_1.default.findOne({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                var _d, _e, _f;
                if (data.jaja === true) {
                    return message.reply({ content: `El antilink ya estaba activado. Usa \`${p}antilink off\` para desactivarlo` });
                }
                if (err)
                    console.log(err);
                if (data) {
                    yield antilinkbv_1.default.findOneAndDelete({ Guild: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id });
                    data = new antilinkbv_1.default({
                        Guild: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id,
                        jaja: true
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido activado. Ahora solo los administradores pueden enviar links." });
                }
                if (!data) {
                    data = new antilinkbv_1.default({
                        Guild: (_f = message.guild) === null || _f === void 0 ? void 0 : _f.id,
                        jaja: true
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido activado por primera vez" });
                }
            }));
        }
        else if (args[0] === 'off') {
            antilinkbv_1.default.findOne({ Guild: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                var _g, _h;
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
                    client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                }
                if (!data) {
                    return message.reply({ content: `El antilink por defecto viene deshabilitado. Usa \`${p}antilink on\` para activarlo por primera vez.` });
                }
                else if (data) {
                    yield antilinkbv_1.default.findOneAndDelete({ Guild: (_g = message.guild) === null || _g === void 0 ? void 0 : _g.id });
                    data = new antilinkbv_1.default({
                        Guild: (_h = message.guild) === null || _h === void 0 ? void 0 : _h.id,
                        jaja: false
                    });
                    data.save();
                    message.reply({ content: "El antilink ha sido desactivado. Ahora pueden enviar links." });
                }
            }));
        }
        else {
            return;
        }
    }
};
