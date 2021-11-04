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
const discord_js_1 = __importStar(require("discord.js"));
const canvas_1 = __importDefault(require("canvas"));
module.exports = {
    name: 'globo',
    aliases: ['globo-de-texto'],
    category: 'Fun',
    description: 'Genera un globo de texto',
    usage: 'globo <imagen>',
    run(client, message, args) {
        return __awaiter(this, void 0, void 0, function* () {
            if (!message.attachments.first())
                return message.reply({
                    content: ' Debes enviar un archivo de imagen adjunto al comando',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            let img = message.attachments.first();
            let relation = img.width / img.height;
            let link = img === null || img === void 0 ? void 0 : img.url;
            let format = link.split('.').pop();
            let validfmt = ['png', 'jpg', 'jpeg', 'gif'];
            if (!validfmt.includes(format))
                return message.reply({
                    content: client.emoji.no + ' Formato de archivo inválido',
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            const button = new discord_js_1.default.MessageButton()
                .setLabel('Editor online')
                .setStyle('LINK')
                .setURL('https://www.online-image-editor.com/');
            const actionrow = new discord_js_1.default.MessageActionRow()
                .addComponents([button]);
            if (relation < 0.2 || relation > 5)
                return message.reply({
                    content: ' Imagen muy estirada, elige otra con una relación de aspecto mas cuadrada o modifícala.',
                    components: [actionrow],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            if (img.size > 1048576)
                return message.reply({
                    content: ' Imagen muy pesada, elige otra con un tamaño inferior a 1MB o comprime la imagen.',
                    components: [actionrow],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            const canvas = canvas_1.default.createCanvas(img.width, img.height + (img.width / 3));
            const ctx = canvas.getContext('2d');
            let ballon = yield canvas_1.default.loadImage('https://i.imgur.com/gH1gbIT.png');
            let image = yield canvas_1.default.loadImage(message.attachments.first().url);
            ctx.drawImage(ballon, 0, 0, img.width, img.width / 3);
            ctx.drawImage(image, 0, img.width / 3, img.width, img.height);
            const attachment = new discord_js_1.default.MessageAttachment(canvas.toBuffer(), 'textball.png');
            try {
                message.reply({
                    files: [attachment],
                    allowedMentions: {
                        repliedUser: false
                    }
                });
            }
            catch (err) {
                let errmsg = new discord_js_1.MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(err);
            }
        });
    }
};
