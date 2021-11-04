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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const prefix_1 = __importDefault(require("../models/prefix"));
const afk_1 = __importDefault(require("../models/afk"));
const lagrasa_1 = __importDefault(require("../models/lagrasa"));
const antilinkbv_1 = __importDefault(require("../models/antilinkbv"));
const discord_js_1 = __importStar(require("discord.js"));
let prefix = process.env.prefix;
const moment_1 = __importDefault(require("moment"));
module.exports.run = (client, message) => __awaiter(void 0, void 0, void 0, function* () {
    /* let bv = await la_grasa.findOne({ guildId: message.guild.id }).catch(err => console.log(err))
    
       if(!bv) {
         bv = la_grasa.create({ guildId: message.guild.id })
       }
    
    if(bv.sdlg === true && message.content === ":v" ) {
    
    let sdlg = [":v", "#HailGrasa", "La grasa no muere, evoluciona...", "Viva la grasa", "En la grasa habian buenos momos :pensive:", "El shitposting es un pasatiempo, la grasa es un sentimiento."]
    let random = Math.floor(Math.random()*sdlg.length)
    
      message.channel.send(sdlg[random]);
    } else {
     return;
    }  */
    var _a, _b, _c, _d, _e, _f, _g, _h, _j, _k, _l, _m, _o, _p, _q;
    if (message.author.bot)
        return;
    if (message.author.bot && message.channel.type === "DM")
        return;
    if (message.channel.type === 'DM' && message.content.startsWith(prefix)) {
        try {
            return message.reply("Los comandos en MD no están soportados aún.");
        }
        catch (err) {
            console.log(err);
        }
    }
    else if (message.channel.type === 'DM') {
        return;
    }
    let ment = new RegExp(`^<@!?${client.user.id}>( |)$`);
    client.prefix = function (message) {
        var _a;
        return __awaiter(this, void 0, void 0, function* () {
            let custom;
            const data = yield prefix_1.default.findOne({ Guild: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id })
                .catch((err) => console.log(err));
            if (data) {
                custom = data.Prefix;
            }
            else {
                custom = prefix;
            }
            return custom;
        });
    };
    let data2;
    try {
        data2 = yield afk_1.default.findOne({
            userId: message.author.id,
            guildId: (_a = message.guild) === null || _a === void 0 ? void 0 : _a.id
        });
        if (!data2)
            data2 = yield afk_1.default.create({
                userId: message.author.id,
                guildId: (_b = message.guild) === null || _b === void 0 ? void 0 : _b.id
            });
    }
    catch (error) {
        let errmsg = new (require('discord.js')).MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${error}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp()
            .setColor("WHITE");
        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        console.log(error);
    }
    let ñ;
    try {
        ñ = yield lagrasa_1.default.findOne({
            guildId: (_c = message.guild) === null || _c === void 0 ? void 0 : _c.id
        });
        if (!ñ)
            ñ = yield lagrasa_1.default.create({
                guildId: (_d = message.guild) === null || _d === void 0 ? void 0 : _d.id
            });
    }
    catch (err) {
        console.log(err);
        let errmsg = new (require('discord.js')).MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${err}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setColor("WHITE")
            .setTimestamp();
        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
    }
    if (ñ.sdlg === true && message.content === ":v") {
        let sdlg = [":v", "#HailGrasa", "La grasa no muere, evoluciona...", "Viva la grasa", "En la grasa habian buenos momos :pensive:", "El shitposting es un pasatiempo, la grasa es un sentimiento."];
        let random = Math.floor(Math.random() * sdlg.length);
        message.channel.send(sdlg[random]);
    }
    let silence;
    try {
        silence = yield antilinkbv_1.default.findOne({
            Guild: (_e = message.guild) === null || _e === void 0 ? void 0 : _e.id
        });
        if (!silence)
            silence = yield antilinkbv_1.default.create({
                Guild: (_f = message.guild) === null || _f === void 0 ? void 0 : _f.id
            });
    }
    catch (err) {
        console.log(err);
        let errmsg = new discord_js_1.MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setColor("WHITE")
            .setDescription(`**Tengo el siguiente error:** ${err}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setTimestamp();
        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
    }
    function is_url(str) {
        let regexp = /^(?:(?:https?|ftp):\/\/)?(?:(?!(?:10|127)(?:\.\d{1,3}){3})(?!(?:169\.254|192\.168)(?:\.\d{1,3}){2})(?!172\.(?:1[6-9]|2\d|3[0-1])(?:\.\d{1,3}){2})(?:[1-9]\d?|1\d\d|2[01]\d|22[0-3])(?:\.(?:1?\d{1,2}|2[0-4]\d|25[0-5])){2}(?:\.(?:[1-9]\d?|1\d\d|2[0-4]\d|25[0-4]))|(?:(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)(?:\.(?:[a-z\u00a1-\uffff0-9]-*)*[a-z\u00a1-\uffff0-9]+)*(?:\.(?:[a-z\u00a1-\uffff]{2,})))(?::\d{2,5})?(?:\/\S*)?$/;
        if (regexp.test(str)) {
            return true;
        }
        else {
            return false;
        }
    }
    const embed = new discord_js_1.default.MessageEmbed()
        .setTitle("Antilink activado")
        .setDescription('No puedes enviar links, el antilink está activado.')
        .setFooter(`${client.user.username} antilink`, client.user.displayAvatarURL())
        .setColor("WHITE");
    if (silence.jaja === true && (is_url(message.content) === true) && ((_g = message.member) === null || _g === void 0 ? void 0 : _g.permissions.has("ADMINISTRATOR"))) {
        try {
            message.delete().then(m => m.channel.send({ embeds: [embed] }));
        }
        catch (error) {
            console.log(error);
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    }
    const a = (0, moment_1.default)(data2.timeAgo).locale('es').fromNow();
    const reason = data2.AFK_Reason;
    if (data2.AFK === true && data2.AFK_Reason) {
        data2.AFK_Reason = null;
        data2.AFK = false;
        message.channel.send(`Volviste ${message.author}, estuviste AFK **${a}** por **${reason}**`);
        yield data2.save();
    }
    else if (data2.AFK === true) {
        data2.AFK_Reason = null;
        data2.AFK = false;
        message.channel.send(`Volviste ${message.author}, estuviste AFK **${a}**`);
        yield data2.save();
    }
    if ((_h = message.mentions.members) === null || _h === void 0 ? void 0 : _h.first()) {
        let data3;
        try {
            data3 = yield afk_1.default.findOne({
                userId: (_j = message.mentions.members.first()) === null || _j === void 0 ? void 0 : _j.id,
                guildId: (_k = message.guild) === null || _k === void 0 ? void 0 : _k.id,
            });
            if (!data3)
                data3 = yield afk_1.default.create({
                    userId: (_l = message.mentions.members.first()) === null || _l === void 0 ? void 0 : _l.id,
                    guildId: (_m = message.guild) === null || _m === void 0 ? void 0 : _m.id
                });
        }
        catch (error) {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
        if (message.author.bot)
            return;
        if (message.channel.type === 'DM' && message.content.startsWith(prefix)) {
            return message.channel.send("Los comandos en MD no están soportados aún.");
        }
        else if (message.channel.type === 'DM') {
            return;
        }
        if (data3.AFK === true) {
            if (data3.AFK_Reason) {
                message.channel.send(`${(_o = message.mentions.members.first()) === null || _o === void 0 ? void 0 : _o.user} Está afk por: **${data3.AFK_Reason}** desde **${a}**`);
            }
            if (!data3.AFK_Reason) {
                message.channel.send(`${(_p = message.mentions.members.first()) === null || _p === void 0 ? void 0 : _p.user} está afk desde **${a}**`);
            }
            data3.save();
        }
    }
    const p = yield client.prefix(message);
    if (message.content.match(ment))
        try {
            return message.reply(`Mi prefix es \`${p}\` si necesitas más ayuda utiliza \`${p}help\``);
        }
        catch (error) {
            console.log(error);
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
        }
    let mentionprefix = [`<@!849395994973700117>`, `<@849395994973700117>`];
    /* if(message.content === "gei")
    message.channel.send(`<:waaa:866829623391813663>`)
     */
    if (message.content === p)
        return;
    if (!message.content.startsWith(p))
        return;
    let usuario = ((_q = message.mentions.members) === null || _q === void 0 ? void 0 : _q.first()) || message.member;
    const args = message.content.slice(p.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd = client.commands.get(command) || client.commands.get(client.aliases.get(command));
    /*
    const topgg = require("@top-gg/sdk");
    
    const Topgg = new topgg.Api(process.env.topgg);
    
    const vote = await Topgg.hasVoted(message.author.id)
    
    const Embed = new Discord.MessageEmbed()
    .setTitle("Para desbloquear los comandos de esta categoria ayudame votando por mí.")
    .setDescription(`Vota Aqui: [Link](https://top.gg/bot/849395994973700117/vote)`)
    .setThumbnail(client.user.displayAvatarURL())
    .setFooter("Gracias")
    .setColor("WHITE")
     */
    // if(cmd && message.author.id !== (process.env.botOwner) && cmd.category === 'NSFW' && !vote) return message.reply({embeds: [Embed]}) 
    if (cmd && cmd.dev === true && message.author.id !== process.env.botOwner)
        return message.reply(`Ese comando está en "Reconstrucción" `);
    try {
        if (cmd) {
            cmd.run(client, message, args, p);
        }
    }
    catch (e) {
        console.log(e);
        let errmsg = new (require('discord.js')).MessageEmbed()
            .setTitle('Ha ocurrido un error')
            .setDescription(`**Tengo el siguiente error:** ${e}`)
            .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
            .setFooter('Tipico')
            .setColor("WHITE")
            .setTimestamp();
        client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
    }
    if (!cmd) {
        const dsnte = new discord_js_1.default.MessageEmbed()
            .setTitle("Error 404")
            .setDescription(`**${command}** no es un comando, verifica si lo escribiste bien.`)
            .setColor("WHITE")
            .setFooter("Puede que si haya existido, y ya no.")
            .setTimestamp();
        message.reply({ embeds: [dsnte] });
        return;
    }
});
