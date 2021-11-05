"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = require("discord.js");
module.exports = {
    name: "ban-button",
    aliases: ["bban"],
    usage: 'ban-button <@usuario>',
    category: 'Mod',
    description: 'Ban button Bv',
    run: (client, message, args) => {
        var _a, _b, _c, _d, _e, _f, _g;
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setCustomId("asd")
            .setLabel("Si")
            .setStyle("SUCCESS"), new discord_js_1.MessageButton()
            .setCustomId("XD")
            .setLabel("No")
            .setStyle("DANGER"));
        const user = (_a = message.mentions.members) === null || _a === void 0 ? void 0 : _a.first();
        let userX = (_b = message.member) === null || _b === void 0 ? void 0 : _b.id;
        let mentionedUser = (_d = (_c = message.mentions.members) === null || _c === void 0 ? void 0 : _c.first()) === null || _d === void 0 ? void 0 : _d.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        if (!user)
            return message.reply("Debes mencionar a alguien");
        if (!((_e = message.member) === null || _e === void 0 ? void 0 : _e.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS")))
            return message.reply("Debes tener permiso de administrador o banear miembros");
        if (!((_g = (_f = message.guild) === null || _f === void 0 ? void 0 : _f.me) === null || _g === void 0 ? void 0 : _g.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS")))
            return message.reply("No puedo hacer esto por falta de permiso de Banear Miembros o Administrador");
        const razon = args.join(" ").slice(22);
        if (!razon)
            return message.reply("Debes decir una razón");
        message.reply({ content: 'Estás seguro que quieres banear a este usuario?', components: [row] });
        const filter = (interaction) => {
            if (interaction.user.id === message.author.id)
                return true;
            return interaction.reply({ content: "No puedes tomar esta decisión por otra persona.", ephemeral: true });
        };
        const collector = message.channel.createMessageComponentCollector({
            filter,
            max: 1,
        });
        collector.on("end", (ButtonInteraction) => {
            ButtonInteraction.first().deferUpdate();
            const id = ButtonInteraction.first().customId;
            if (id === "asd") {
                try {
                    user.ban({ reason: razon });
                    message.reply(`Se ha baneado con éxito a ${user} por **${razon}**`);
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
            }
            else if (id === "XD") {
                return message.reply("El baneo ha sido cancelado");
            }
        });
    },
};
