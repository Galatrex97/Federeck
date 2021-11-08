"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.command = void 0;
const discord_js_1 = require("discord.js");
exports.command = {
    name: "ban-button",
    aliases: ["bban"],
    usage: 'ban-button <@usuario>',
    category: 'Mod',
    description: 'Ban button Bv',
    run: (client, message, args) => {
        const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
            .setCustomId("asd")
            .setLabel("Si")
            .setStyle("SUCCESS"), new discord_js_1.MessageButton()
            .setCustomId("XD")
            .setLabel("No")
            .setStyle("DANGER"));
        const user = message.mentions.members?.first();
        let userX = message.member?.id;
        let mentionedUser = message.mentions.members?.first()?.id;
        if (userX === mentionedUser) {
            return message.channel.send("No puedes usar este comando contigo mismo(a).");
        }
        if (!user)
            return message.reply("Debes mencionar a alguien");
        if (!message.member?.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS"))
            return message.reply("Debes tener permiso de administrador o banear miembros");
        if (!message.guild?.me?.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS"))
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
                    console.log(err);
                }
            }
            else if (id === "XD") {
                return message.reply("El baneo ha sido cancelado");
            }
        });
    },
};
//# sourceMappingURL=ban-button.js.map