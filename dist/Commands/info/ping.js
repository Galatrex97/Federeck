"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = __importStar(require("discord.js"));
const mongoose_1 = __importDefault(require("mongoose"));
exports.command = {
    name: "ping",
    aliases: ["ms"],
    category: 'Útil',
    usage: 'ping/ms',
    description: 'Muestra la latencia o ping del bot en milisegundos.',
    run: async (client, message, args) => {
        let date = Date.now();
        let pingDataBase = await new Promise((r, j) => {
            mongoose_1.default.connection.db
                .admin()
                .ping((err, result) => r(Date.now() - date));
        });
        let embed = new discord_js_1.default.MessageEmbed()
            .setTitle("Latencia")
            .setDescription(`**Latencia de la API de Discord:** ${client.ws.ping} ms\n**Latencia general:** ${Date.now() - message.createdTimestamp} ms\n**Latencia de la base de datos:** ${pingDataBase} ms`)
            .setColor("WHITE");
        try {
            message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } });
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            console.log(err);
        }
    }
};
//# sourceMappingURL=ping.js.map