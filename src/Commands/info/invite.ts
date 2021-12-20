
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

    let link = "https://discord.com/oauth2/authorize?client_id=849395994973700117&scope=bot%20applications.commands&permissions=2146938238"

    const inviteEmbed = new Discord.MessageEmbed()
      .setTitle("Link de invitación")
      .setColor("WHITE")
      .setTimestamp()
      .setDescription(
        `Haz click \`[aquí](${link})\` para invitarme a tu servidor.\nSi tienes alguna duda, puedes usar \`${p}help\``
      )
      .setThumbnail(`${client.user?.avatarURL()}`);

    const row = new Discord.MessageActionRow().addComponents(
      new Discord.MessageButton()
        .setURL(link)
        .setStyle("LINK")
        .setLabel("Invitame")
    );

    try {
      message.reply({ embeds: [inviteEmbed], components: [row] });
    } catch (err) {
      console.log(err);
    }
  },
};
