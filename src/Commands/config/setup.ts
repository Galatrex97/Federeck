import nyaSchema from "../../models/parent";
import { Command } from "../../interfaces";
import xSchema from "../../models/ticketsMentionable";
export const command: Command = {
  name: "ticket-setup",
  category: "Configuración",
  aliases: [],
  description:
    "Esto configurará un ticket para resolver inconvenientes, problemas y/o dudas.",
  usage: "setup",
  run: async (client, message, args, p) => {

    let idParent = args[0] as string;
    let data;
    try {
      data = await nyaSchema.findOne({
      guildId: message.guild?.id,
      parentId: idParent,
    });
    } catch (err) {
      console.log(err)
    }

    if (!data) {

      if (!idParent)
        return message.channel.send(`Necesitas dar el id de una categoría.`);

      let category: any = message.guild?.channels.resolve(idParent);

      if (category.type !== "GUILD_CATEGORY")
        return message.reply("Esa no es una categoria válida");
      data = new nyaSchema({ guildId: message.guild?.id, parentId: idParent });

      data.save();


      message.channel.send("Se ha configurado la categoría para los tickets.");
    }else if (data) {
      await nyaSchema.findOneAndDelete({ guildId: message.guild?.id });

      if (!idParent) {
      return message.channel.send(`Necesitas dar el id de una categoría.`);
      } 
      
    let category: any = message.guild?.channels.resolve(idParent);

    if (category.type !== "GUILD_CATEGORY") {
      return message.reply("Esa no es una categoria válida");
    }

      data = new nyaSchema({ guildId: message.guild?.id, parentId: idParent });

      data.save();

      message.channel.send("Se ha configurado la categoría para los tickets.");
    }
  },
};
