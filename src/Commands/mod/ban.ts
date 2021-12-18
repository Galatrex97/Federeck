import Discord, { Guild, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ban",
  aliases: ["desaparecer"],
  category: "Mod",
  usage: "ban/desaparecer",
  description: `Banea a un usuario, si te arrepientes o fue un error puedes usar el comando unban (necesitas el id de la persona baneada)`,

  run: async (client: Klar, message: Message, args, p) => {
    const owner = (await (message.guild as Guild).fetchOwner()).user.id;
    if (!message.guild?.me?.permissions.has("BAN_MEMBERS"))
      return message.reply(
        "No tengo ese permiso, así que no se puede usar ese comando (Es temporal)"
      );

    let user = message.mentions.members?.first();
    if (!user) return message.reply("A quien se supone que quieres banear?");
    if (user.id === message.author.id) return message.reply("Nah, no podes");
    if (user.id === owner)
      return message.reply("No se puede banear al dueño del servidor. XD?");
    if (user.id === client.user?.id) return message.reply("XD");
    if (!user.bannable) return message.reply("No puedo banear a ese usuario.");

    let banReason = args.join(" ").slice(22);

    if (!message.member?.permissions.has("BAN_MEMBERS"))
      return message.reply("No tienes el permiso para **Banear miembros**");

    if (
      message.member?.roles.highest.comparePositionTo(user.roles.highest) <= 0
    )
      return message.reply(
        "No puedes banear a esa persona por que tiene un mayor o igual rango que tú."
      );

    if (!banReason) return message.reply("Escribe una razón.");

    try {
      user.ban({ reason: banReason });
    } catch (err) {
      console.log(err);
    }
    message.reply(
      `El usuario **${user}** fue Baneado por **${banReason}**\nModerador: **${message.author}**`
    );
    const nya = new Discord.MessageEmbed()
      .setTitle("Adiós.")
      .setDescription(
        `Lamentablemente has sido baneado de **${message.guild.name}** por el Moderador: **${message.author.username}**.\nLa razón de tu baneo fue: ${banReason}. Hasta pronto!`
      )
      .setTimestamp();
    user.send({ embeds: [nya] });
  },
};
