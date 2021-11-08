"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.InteractionMenu = void 0;
const discord_js_1 = require("discord.js");
exports.InteractionMenu = {
    name: "Avatar",
    type: "USER",
    /**
     *
     * @param {Client} client
     * @param {ContextMenuInteraction} interaction
     * @param {String[]} args
     */
    run: async (client, interaction) => {
        let member = await client.users.fetch(interaction.targetId);
        const embed = new discord_js_1.MessageEmbed()
            .setDescription(`Avatar de: __**${member.username}**__`)
            .addField('Pedido por:', `${interaction.member}`)
            .setImage(member.displayAvatarURL({ format: 'png', dynamic: true, size: 4096 }))
            .setColor('WHITE')
            .setFooter(':)', client.user?.displayAvatarURL())
            .setTimestamp();
        interaction.followUp({ embeds: [embed] });
    },
};
//# sourceMappingURL=xd.js.map