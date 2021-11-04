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
const canvas_1 = require("canvas");
module.exports = {
    name: "gay",
    aliases: [],
    usage: 'gay <@usuario>',
    category: 'Fun',
    description: 'XDXDXDDDDDDDDDD',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        var _a;
        let users;
        if (message.mentions.users.first()) {
            users = (_a = message.mentions.users.first()) === null || _a === void 0 ? void 0 : _a.id;
        }
        else if (args[0]) {
            users = args[0];
        }
        else {
            users = message.author.id;
        }
        let user = yield client.users.fetch(users);
        const avatar = yield (0, canvas_1.loadImage)(user.displayAvatarURL({ format: "png", size: 4096 }));
        const canvas = (0, canvas_1.createCanvas)(800, 800);
        const ctx = canvas.getContext("2d");
        const background = yield (0, canvas_1.loadImage)(`${__dirname}/el_pepe.png`);
        ctx.drawImage(avatar, 0, 0, canvas.width, canvas.height);
        const aa = yield user.username;
        ctx.drawImage(background, 0, 0, canvas.width, canvas.height);
        const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer(), `gay.png`);
        const embed = new discord_js_1.MessageEmbed()
            .setColor("WHITE")
            .setFooter("XD")
            .setImage(`attachment://gay.png`)
            .setTimestamp();
        try {
            message.channel.send({ embeds: [embed], files: [attachment] });
        }
        catch (err) {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    })
};
