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
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "play",
    description: "Reproduce una canción",
    options: [
        {
            name: 'song',
            description: 'Canción a reproducir',
            type: 'STRING',
            required: true
        },
    ],
    /**
     *
     * @param {Client} client
     * @param {CommandInteraction} interaction
     * @param {String[]} args
     */
    run: (client, interaction, args) => __awaiter(void 0, void 0, void 0, function* () {
        if (!interaction.member.voice.channel)
            return interaction.followUp("Debes estar en un canal de voz...");
        if (interaction.guild.me.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
            return interaction.followUp("Debes estar en el mismo canal de voz que yo, de lo contrario no funcionará correctamente...");
        let voice = interaction.member.voice.channel;
        const song = interaction.options.getString("song");
        let member = interaction.member;
        let channel = interaction.channel;
        interaction.followUp("Buscando...");
        try {
            client.distube.playVoiceChannel(voice, song, {
                member: member,
                textChannel: channel,
            });
        }
        catch (err) {
            let errmsg = new discord_js_1.MessageEmbed()
                .setTitle('Ha ocurrido un error')
                .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
                .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                .setFooter('Tipico')
                .setColor("WHITE")
                .setTimestamp();
            client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
            console.log(err);
        }
    }),
};
