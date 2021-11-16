import nyaSchema from "../../Models/parent";
import Klar from "../../Client";
import { Message } from "discord.js";

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ticket-setup",
  category: "Configuración",
  aliases: [],
  description:
    "Esto abrirá un ticket para resolver inconvenientes y/o problemas o dudas.",
  usage: "setup",
  run: async (client, message, args, p) => {
    let idParent = args[0] as string;
    if (!idParent) return;
    let data = await nyaSchema.findOne({
      guildId: message.guild?.id,
      parentId: idParent,
    });

    if (!data) {
      data = new nyaSchema({ guildId: message.guild?.id, parentId: idParent });

      data.save();

      if (!idParent)
        return message.channel.send(`Necesitas dar el id de una categoría.`);

      let category: any = message.guild?.channels.resolve(idParent);

      if (category.type !== "GUILD_CATEGORY")
        return message.reply("Esa no es una categoria válida");

      message.channel.send("Se ha configurado la categoría para los tickets.");
    }
    if (data) {
      await nyaSchema.findOneAndDelete({ guildId: message.guild?.id });
      data = new nyaSchema({ guildId: message.guild?.id, parentId: idParent });

      if (!idParent)
        return message.channel.send(`Necesitas dar el id de una categoría.`);

      let category: any = message.guild?.channels.resolve(idParent);

      if (category.type !== "GUILD_CATEGORY") {
        return message.reply("Esa no es una categoria válida");
      }
      data.save();

      message.channel.send("Se ha configurado la categoría para los tickets.");
    }
  },
};
