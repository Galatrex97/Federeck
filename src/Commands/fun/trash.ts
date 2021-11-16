import { Message, MessageEmbed, MessageAttachment, Snowflake } from "discord.js";
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
    let users: any =
      message.mentions.users.first()?.id ||
      message.author.id;

    let user = await client.users.fetch(users);

    let pfp = user.displayAvatarURL({ format: "png", size: 4096 });

    let img = await new DIG.Trash().getImage(pfp);

    message.reply({ files: [new MessageAttachment(img, "trash.png")] });
  },
};
