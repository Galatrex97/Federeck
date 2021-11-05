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
const lagrasa_1 = __importDefault(require("../../models/lagrasa"));
module.exports = {
    name: "pacman",
    aliases: ["hailgrasa"],
    usage: 'pacman on/off',
    category: 'Configuración',
    description: '',
    run: (client, message, args, p) => {
        var _a, _b, _c;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("MANAGE_MESSAGES")))
            return message.reply("Necesitas el permiso **Gestionar mensajes**.").then(nya => {
                setTimeout(() => {
                    nya.delete();
                }, 7000);
            });
        if (!args[0])
            return;
        if (args[0] === 'on') {
            lagrasa_1.default.findOne({ guildId: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                var _d, _e, _f;
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
                    client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                }
                if (data) {
                    yield lagrasa_1.default.findOneAndDelete({ guildId: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id });
                    data = new lagrasa_1.default({
                        guildId: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id,
                        sdlg: true
                    });
                    data.save();
                    message.reply({ content: "#HailGrasa" });
                }
                if (!data) {
                    data = new lagrasa_1.default({
                        guildId: (_f = message.guild) === null || _f === void 0 ? void 0 : _f.id,
                        sdlg: true
                    });
                    data.save();
                    message.reply({ content: "#HailGrasa" });
                }
            }));
        }
        else if (args[0] === 'off') {
            lagrasa_1.default.findOne({ guildId: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id }, (err, data) => __awaiter(void 0, void 0, void 0, function* () {
                var _g, _h;
                if (data.sdlg === false) {
                    return message.reply({ content: `Las respuestas a los pacmans ya estaban desactivadas. Prueba \`${p}pacman on\` para activarlas.` });
                }
                if (err)
                    console.log(err);
                if (!data) {
                    return message.reply({ content: `Las respuestas a los pacmans vienen deshabilitadas por defecto. Usa \`${p}pacman on\` para activarlas por primera vez.` });
                }
                else if (data) {
                    yield lagrasa_1.default.findOneAndDelete({ guildId: (_g = message.guild) === null || _g === void 0 ? void 0 : _g.id });
                    data = new lagrasa_1.default({
                        guildId: (_h = message.guild) === null || _h === void 0 ? void 0 : _h.id,
                        sdlg: false
                    });
                    data.save();
                    message.reply({ content: "Las respuestas a los pacmans han sido desactivadas. :'v" });
                }
            }));
        }
        else {
            return;
        }
    }
};
