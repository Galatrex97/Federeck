import nyaSchema from "../../Models/parent";
import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";
import roleSchema from "../../Models/ticketsMentionable";
export default class TicketsSettingsCommand extends BaseCommand {
  constructor() {
    super({
      name: "tickets-settings",
      aliases: [],
      description: "Establece ciertos ajustes para los tickets",
      usage:
        "tickets-settings <mentionRoles/category> <@roles/id_de_la_categoría>",
      category: "Configuración",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: ["MANAGE_MESSAGES"],
      devOnly: false,
      guildOnly: true,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    let option = args[0] as string;
    if (option == "mentionRoles") {
      const Params = {
        guildId: message.guild?.id,
      };

      let data =
        (await roleSchema.findOne(Params)) || (await roleSchema.create(Params));

      let mentionedRoles = message.mentions.roles;
      if (!mentionedRoles) {
        return message.channel.send("Menciona al menos un rol para continuar.");
      }
      let mentArray: any = [];
      mentionedRoles.forEach((x) => mentArray.push(x.id));

      if (data) {
        mentionedRoles.forEach((x) => data.mentions.push(x.id));
        data.save();
        message.channel.send("Se han actualizado los roles a mencionar.");
      }
      if (!data) {
        data = await roleSchema.create({
          guildId: message.guild?.id,
        });
        mentionedRoles.forEach((x) => data.mentions.push(x.id));
        data.save();
        message.channel.send("Se han establecido los roles a mencionar.");
      }
    } else if (option == "category") {
      let idParent = args[1];
      let data;
      try {
        data = await nyaSchema.findOne({
          guildId: message.guild?.id,
          parentId: idParent,
        });
      } catch (err) {
        console.log(err);
      }

      if (!data) {
        if (!idParent)
          return message.channel.send(`Necesitas dar el id de una categoría.`);

        let category: any = message.guild?.channels.resolve(idParent);

        if (category.type !== "GUILD_CATEGORY")
          return message.reply("Esa no es una categoria válida");
        data = new nyaSchema({
          guildId: message.guild?.id,
          parentId: idParent,
        });

        data.save();

        message.channel.send(
          "Se ha configurado la categoría para los tickets."
        );
      } else if (data) {
        await nyaSchema.findOneAndDelete({ guildId: message.guild?.id });

        if (!idParent) {
          return message.channel.send(`Necesitas dar el id de una categoría.`);
        }

        let category: any = message.guild?.channels.resolve(idParent);

        if (category.type !== "GUILD_CATEGORY") {
          return message.reply("Esa no es una categoria válida");
        }

        data = new nyaSchema({
          guildId: message.guild?.id,
          parentId: idParent,
        });

        data.save();

        message.channel.send(
          "Se ha configurado la categoría para los tickets."
        );
      }
    } else {
      return message.reply(
        "Esta no es una opción válida.\nPuedes ver el uso correcto de este comando en el comando help."
      );
    }
  };
}
