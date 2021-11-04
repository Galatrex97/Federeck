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
const Discord = require("discord.js");
const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const glob = require("glob");
const fs = require("fs");
module.exports = {
    name: "reload",
    aliases: [],
    usage: 'reload',
    category: 'Útil',
    description: 'Actualiza los cambios del bot, se necesita ser el desarrollador del bot',
    run: (client, message, args) => {
        if (message.author.id !== process.env.botOwner)
            return;
        glob(`${__dirname}/../**/*.js`, (err, filePaths) => __awaiter(void 0, void 0, void 0, function* () {
            if (err) {
                console.log(err);
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            }
            filePaths.forEach((file) => {
                delete require.cache[require.resolve(file)];
                const pull = require(file);
                if (pull.name) {
                    client.commands.set(pull.name, pull);
                }
                if (pull.aliases && Array.isArray(pull.aliases)) {
                    pull.aliases.forEach((alias) => {
                        client.aliases.set(alias, pull.name);
                    });
                }
            });
        }));
        try {
            message.react("✅");
        }
        catch (err) {
            console.log(err);
        }
    }
};
