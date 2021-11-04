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
const add_1 = __importDefault(require("../models/add"));
const canvas_1 = __importDefault(require("canvas"));
const canvas_2 = require("canvas");
(0, canvas_2.registerFont)('./font/KGHAPPY.ttf', { family: 'My Olivin' });
let welcomeCanvas = {};
welcomeCanvas.create = canvas_1.default.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
welcomeCanvas.context.font = '45px My Olivin';
welcomeCanvas.context.fillStyle = '#FFFFFF';
canvas_1.default.loadImage("./17010.jpg").then((img) => __awaiter(void 0, void 0, void 0, function* () {
    welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
    welcomeCanvas.context.fillText("Bienvenido/a ", 360, 360);
    welcomeCanvas.context.beginPath();
    welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
    welcomeCanvas.context.stroke();
    welcomeCanvas.context.fill();
}));
module.exports.run = (client, member) => __awaiter(void 0, void 0, void 0, function* () {
    let nya = yield add_1.default.findOne({ Guild: member.guild.id });
    if (!nya)
        return;
    let Channel;
    if (nya.Channel) {
        Channel = member.guild.channels.cache.get(nya.Channel);
    }
    else {
        Channel = null;
    }
    if (!Channel)
        return;
    if (!nya.Channel)
        return;
    let canvas = welcomeCanvas;
    canvas.context.font = '42px My Olivin',
        canvas.context.textAlign = 'center';
    canvas.context.fillText(member.user.tag.toUpperCase(), 512, 410);
    canvas.context.font = '32px My Olivin';
    canvas.context.fillText(`Eres el miembro número ${member.guild.memberCount}° `, 512, 455);
    canvas.context.beginPath();
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();
    yield canvas_1.default.loadImage(member.user.displayAvatarURL({ format: 'png', size: 1024 })).then(img => {
        canvas.context.drawImage(img, 385, 35, 250, 250);
        let attachment = new discord_js_1.default.MessageAttachment(canvas.create.toBuffer(), `NuevoMiembro.png`);
        const avatar = member.user.displayAvatarURL();
        const a = member.guild.iconURL();
        const welcomembed = new discord_js_1.default.MessageEmbed()
            .setTitle("¡Nuevo miembro!")
            .setDescription(`El usuario ** ${member}** se ha unido al server y ahora somos ${member.guild.memberCount} personas!`)
            .setThumbnail(`${avatar}`)
            .setColor("WHITE")
            .setImage("attachment://NuevoMiembro.png")
            .setTimestamp()
            .setFooter(`Gracias por unirte a nuestro server`, a);
        try {
            Channel.send({ embeds: [welcomembed], files: [attachment] });
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
    });
});
