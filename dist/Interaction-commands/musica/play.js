"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.Interaction = void 0;
const discord_js_1 = require("discord.js");
exports.Interaction = {
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
    run: async (client, interaction) => {
        if (!interaction.member.voice.channel)
            return interaction.followUp("Debes estar en un canal de voz...");
        if (interaction.guild?.me?.voice.channel && interaction.member.voice.channel.id !== interaction.guild.me.voice.channel.id)
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
            console.log(err);
        }
    },
};
//# sourceMappingURL=play.js.map