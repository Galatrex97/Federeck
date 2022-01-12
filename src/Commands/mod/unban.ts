import Discord, { Client, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class UnbanCommand extends BaseCommand {
  constructor() {
    super({
      name: "unban",
      aliases: [],
      description: "Desbanea a un miembro del servidor",
      usage: "unban <id del miembro>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["BAN_MEMBERS", "SEND_MESSAGES"],
      userPerms: ["BAN_MEMBERS"],
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
    let userId: any = args[0] as string;

    if (!userId) return message.channel.send("Debes escribir un ID");
    if (isNaN(userId)) return message.channel.send("El id debe ser un numero");
    const member = await client.users.fetch(userId);

    message.guild.bans
      .fetch()
      .then(async (bans) => {
        if (bans.size === 0)
          return message.reply("El server no tiene ningún miembro baneado.");

        let bannedUser = bans.find((ban) => ban.user.id == userId);
        if (!bannedUser)
          return message.channel.send("Ese miembro no está baneado.");

        await message.guild?.members
          .unban(bannedUser.user)
          .catch((err) => {
            return message.channel.send("Algo salió mal.");
          })
          .then(() => {
            message.channel.send(`El usuario ${member} fue Desbaneado`);
          })
          .catch((error) => {
            console.log(error);
            message.channel.send("Ha ocurrido un error.");
          });
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  };
}
