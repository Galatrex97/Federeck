
import Discord, { Message } from "discord.js";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "invite",
  aliases: [],
  category: "Info",
  usage: "invite",
  description: "Envia mi link de invitación",
  run: (client, message, args, p) => {
    const nya = new Discord.MessageEmbed()
      .setTitle("Lyon Invite Link")
      .setColor("WHITE")
      .setFooter("Gracias.")
      .setTimestamp()
      .setDescription(
        `Mi link de invitación está en el botón de abajo.\nSi tienes alguna duda usa \`${p}help\``
      )
      .setThumbnail(`${client.user?.avatarURL()}`);

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setURL(
          "https://discord.com/oauth2/authorize?client_id=849395994973700117&scope=bot%20applications.commands&permissions=2146938238"
        )
        .setStyle("LINK")
        .setLabel("Invitación")
    );

    try {
      message.reply({ embeds: [nya], components: [row] });
    } catch (err) {
      let errmsg = new (require("discord.js").MessageEmbed)()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setTimestamp()
        .setColor("WHITE");

      console.log(err);
    }
  },
};
