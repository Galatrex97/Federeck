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
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
module.exports = {
    name: "ban",
    aliases: ["desaparecer"],
    category: 'Mod',
    usage: 'ban/desaparecer',
    description: `Banea a un usuario, si te arrepientes o fue un error puedes usar el comando unban (necesitas el id de la persona baneada)`,
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e;
        const owner = (yield message.guild.fetchOwner()).user.id;
        if (!((_b = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.me) === null || _b === void 0 ? void 0 : _b.permissions.has("BAN_MEMBERS")))
            return message.reply("No tengo ese permiso, así que no se puede usar ese comando (Es temporal)");
        let user = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first();
        if (!user)
            return message.reply("A quien se supone que quieres banear?");
        if (user.id === message.author.id)
            return message.reply("Nah, no podes");
        if (user.id === owner)
            return message.reply("No se puede banear al dueño del servidor. XD?");
        if (user.id === client.user.id)
            return message.reply('XD');
        if (!user.bannable)
            return message.reply("No puedo banear a ese usuario.");
        let banReason = args.join(' ').slice(22);
        if (!((_d = message.member) === null || _d === void 0 ? void 0 : _d.permissions.has("BAN_MEMBERS")))
            return message.reply("No tienes el permiso para **Banear miembros**");
        if (((_e = message.member) === null || _e === void 0 ? void 0 : _e.roles.highest.comparePositionTo(user.roles.highest)) <= 0)
            return message.reply("No puedes banear a esa persona por que tiene un mayor o igual rango que tú.");
        if (!banReason)
            return message.reply("Escribe una razón.");
        try {
            user.ban({ reason: banReason });
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
        message.reply(`El usuario **${user}** fue Baneado por **${banReason}**\nModerador: **${message.author}**`);
        const nya = new discord_js_1.default.MessageEmbed()
            .setTitle("Adiós.")
            .setDescription(`Lamentablemente has sido baneado de **${message.guild.name}** por el Moderador: **${message.author.username}**.\nLa razón de tu baneo fue: ${banReason}. Hasta pronto!`)
            .setTimestamp();
        user.send({ embeds: [nya] });
    })
};
