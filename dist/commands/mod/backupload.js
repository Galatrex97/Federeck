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
const backup = __importStar(require("discord-backup"));
backup.setStorageFolder(__dirname + "/backups/");
module.exports = {
    name: "backupload",
    aliases: ["loadbackup", "loadcloud"],
    usage: 'backupload/loadbackup/loadcloud',
    category: 'Mod',
    description: 'Carga una backup',
    run: (client, message, args) => {
        var _a, _b, _c;
        let server = message.guild;
        if (!((_a = message.member) === null || _a === void 0 ? void 0 : _a.permissions.has("ADMINISTRATOR"))) {
            return message.channel.send("Debes ser el administrador del server.");
        }
        if (!((_c = (_b = message.guild) === null || _b === void 0 ? void 0 : _b.me) === null || _c === void 0 ? void 0 : _c.permissions.has("ADMINISTRATOR")))
            return message.channel.send("No puedo hacer esto por la asuencia del permiso **Administrador**.");
        let backupID = args[0];
        if (!backupID) {
            return message.channel.send("Debes proporcionar el ID de una backup");
        }
        backup.fetch(backupID).then(() => __awaiter(void 0, void 0, void 0, function* () {
            message.channel.send("Advertencia: TODOS los canales, roles, etc. serán reemplazados al cargar la backup, reacciona con ✅ para confirmar o con ❌ para cancelar. Tienes 20 segundos para decidir antes de que se cancele automaticamente.").then(m => {
                m.react("✅");
                m.react("❌");
                const filter = (reaction, user) => {
                    return ["✅", "❌"].includes(reaction.emoji.name) && user.id == message.author.id;
                };
                m.awaitReactions({
                    filter,
                    max: 1,
                    time: 20000,
                    errors: ["time"]
                }).catch(() => {
                    m.edit("Han pasado los 20 segundos para confirmar, se ha cancelado la carga.");
                }).then((collected) => {
                    const reaction = collected.first();
                    if (reaction.emoji.name === "✅") {
                        message.author.send("La backup se empezará a cargar");
                        backup.load(backupID, server).then(() => {
                            backup.remove(backupID);
                        }).catch((err) => {
                            console.log(err);
                            let errmsg = new (require('discord.js')).MessageEmbed()
                                .setTitle('Ha ocurrido un error')
                                .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                                .setFooter('Tipico')
                                .setColor("WHITE")
                                .setTimestamp();
                            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                        });
                    }
                    else if (reaction.emoji.name === '❌') {
                        return message.reply("La carga de la backup se ha cancelado.");
                    }
                    ;
                }).catch(error => {
                    console.log(error);
                    let errmsg = new (require('discord.js')).MessageEmbed()
                        .setTitle('Ha ocurrido un error')
                        .setDescription(`**Tengo el siguiente error:** ${error}`)
                        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                        .setFooter('Tipico')
                        .setTimestamp()
                        .setColor("WHITE");
                    client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                    message.channel.send("Ha ocurrido un error.");
                });
            }).catch(error => {
                console.log(error);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setTimestamp()
                    .setColor("WHITE");
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                message.channel.send("Ha ocurrido un error.");
            });
        })).catch(error => {
            let errmsg = new (require('discord.js')).MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setTimestamp()
                .setColor("WHITE");
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(error);
            message.channel.send("Ha ocurrido un error.");
        });
    }
};
