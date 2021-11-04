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
const discord_js_1 = __importDefault(require("discord.js"));
const add_1 = __importDefault(require("../../models/add"));
module.exports = {
    name: "set-welcome",
    aliases: [],
    usage: 'set-welcome <id o mencion del canal>',
    category: 'Configuración',
    description: '',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        let canal = ((_a = message.guild) === null || _a === void 0 ? void 0 : _a.channels.cache.find(canal => canal.id == args[0])) || message.mentions.channels.first();
        let bienvenida = yield add_1.default.findOne({ Guild: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id }).exec();
        if (!canal)
            return message.channel.send('Menciona o ingresa la ID de un canal al cual se redireccionarán las bienvenidas');
        if (canal.type !== "GUILD_TEXT") {
            return message.channel.send("Solo se pueden establecer canales de texto.");
        }
        if (!((_c = message.member) === null || _c === void 0 ? void 0 : _c.permissions.has('MANAGE_GUILD')))
            return message.channel.send('Necesitas un permiso: \n**Gestionar Servidor**`');
        if (bienvenida) {
            yield add_1.default.updateOne({ Guild: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id, Channel: canal.id });
            message.channel.send({ embeds: [new discord_js_1.default.MessageEmbed()
                        .setDescription(`El canal de bienvenidas ahora es ` + canal.toString())
                        .setColor('WHITE')
                ] });
        }
        else {
            yield new add_1.default({ Guild: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id, Channel: canal.id }).save();
            message.channel.send({ embeds: [new discord_js_1.default.MessageEmbed()
                        .setDescription(`El canal de bienvenidas es ` + canal.toString()).setColor("WHITE")
                ] });
        }
    })
};
