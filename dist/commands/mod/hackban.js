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
    name: "hackban",
    aliases: [],
    category: 'Mod',
    usage: 'hackban <id>',
    description: 'Terminado, necesitas el id de la persona a banear',
    run: (client, message, args, p) => __awaiter(void 0, void 0, void 0, function* () {
        var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l;
        let guildname = (_a = message.guild) === null || _a === void 0 ? void 0 : _a.name;
        let guildIcon = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.iconURL();
        const embed = new discord_js_1.default.MessageEmbed()
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setFooter(guildname, guildIcon);
        if (!args[0]) {
            embed.setDescription('Debes escribir el ID de un usuario.');
            embed.setColor('WHITE');
            return message.reply({ embeds: [embed] }).then(m => m.delete()).catch(error => {
                console.log(error);
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                message.channel.send("Ha ocurrido un error.");
            });
        }
        let idz = args[0];
        let member = ((_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first()) || ((_d = message.guild) === null || _d === void 0 ? void 0 : _d.members.resolve(idz)) || ((_e = message.guild) === null || _e === void 0 ? void 0 : _e.members.cache.find(m => m.user.username.toLowerCase() == args[0])) || (yield client.users.fetch(args[0]));
        if (!member) {
            embed.setDescription('Necesitas escribir el ID de un usuario.');
            embed.setColor('WHITE');
            return message.reply({ embeds: [embed] });
        }
        if (member.id == message.author.id) {
            embed.setDescription('No te puedes hacer hackban a ti mismo.');
        }
        if (!((_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.permissions.has("BAN_MEMBERS")))
            return message.reply("No puedo usar este comando por la ausencia del permiso **Banear Miembros**");
        if (!((_h = message.member) === null || _h === void 0 ? void 0 : _h.permissions.has('BAN_MEMBERS'))) {
            embed.setDescription('No puedes usar este comando por la ausencia del permiso **Banear Miembros**.');
            embed.setColor('WHITE');
            return message.reply({ embeds: [embed] });
        }
        if ((_j = message.guild) === null || _j === void 0 ? void 0 : _j.members.resolve(member.id)) {
            if (((_k = message.member) === null || _k === void 0 ? void 0 : _k.roles.highest.comparePositionTo(member.roles.highest)) <= 0) {
                embed.setDescription('No puedes banear a un usuario con un rango igual o mayor que el tuyo.');
                embed.setColor('WHITE');
                return message.reply({ embeds: [embed] });
            }
            if (!member.bannable) {
                embed.setDescription('No puedo banear a este usuario');
                embed.setColor('WHITE');
                return message.reply({ embeds: [embed] });
            }
        }
        let razon = args.slice(1).join(" ") ? args.slice(1).join(" ") : "Razon sin especificar";
        (_l = message.guild) === null || _l === void 0 ? void 0 : _l.members.ban(member.id, { reason: razon });
        embed
            .setAuthor(message.author.username, message.author.displayAvatarURL())
            .setThumbnail(!!member.user ? member.user.displayAvatarURL() : member.displayAvatarURL())
            .setTitle('¡Hackban exitoso!')
            .addField(`> Usuario Baneado`, !!member.user ? member.user.tag : member.tag)
            .addField('> Razón', razon)
            .setColor('WHITE')
            .setTimestamp();
        if (!!member.user)
            member.user.send({ embeds: [embed] }).catch(e => e);
        message.reply({ embeds: [embed] });
    })
};
