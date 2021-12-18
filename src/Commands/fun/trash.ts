import {
  Message,
  MessageEmbed,
  MessageAttachment,
  Snowflake,
} from "discord.js";
import Klar from "../../Client";
import DIG from "discord-image-generation";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "trash",
  aliases: [],
  category: "Fun",
  usage: "",
  description: "XD",

  run: async (client, message, args) => {
    let when = args[0];

    let regg = /^\d{17,18}$/;

    let si = regg.test(when);

    if (args[0] && !message.mentions.members?.first() && !si) {
      return message.channel.send(
        "Esa no es una id válida, da otra, menciona a alguien o usa el comando contigo mismo."
      );
    }

    let users: any;
    if (message.mentions.users.first()) {
      users = message.mentions.users.first()?.id;
    } else if (args[0] && !!si) {
      users = args[0];
    } else {
      users = message.author.id;
    }
    let user = await client.users.fetch(users);

    let pfp = user.displayAvatarURL({ format: "png", size: 4096 });

    let img = await new DIG.Trash().getImage(pfp);

    message.reply({ files: [new MessageAttachment(img, "trash.png")] });
  },
};
