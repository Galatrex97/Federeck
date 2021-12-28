import Discord, { Guild, Message, MessageEmbed } from "discord.js";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ban",
  aliases: ["desaparecer"],
  category: "Mod",
  usage: "ban/desaparecer",
  description: `Banea a un usuario, si te arrepientes o fue un error puedes usar el comando unban (necesitas el id de la persona baneada)`,

  run: async (client, message, args, p) => {
    const owner = (await (message.guild as Guild).fetchOwner()).user.id;
    const user = message.mentions.members?.first();
    const banReason = args.join(" ").slice(22);

    if (!message.guild?.me?.permissions.has("BAN_MEMBERS")) {
      return message.reply("No tengo el permiso **Banear Miembros**, para usar este comando, este permiso es de carácter __obligatorio__, así que tendrás que otorgarme un rol con ese permiso o modificar mis permisos actuales para usar este comando.");
    } else if (!message.member?.permissions.has("BAN_MEMBERS")) {
      return message.reply("No tienes el permiso para **Banear miembros**.");
    } else if (!user) {
      return message.reply("¿A quién quieres banear?");
    } else if (user.id === message.author.id) {
      return message.reply("No puedes auto-banearte.");
    } else if (user.id === owner) {
      return message.reply("No se puede banear al dueño del servidor. XD");
    } else if (user.id === client.user?.id) {
      return message.reply(":pensive: ¿Qué hice mal?");
    } else if(message.guild.me.roles.highest.comparePositionTo(user.roles.highest) < 0) {
      return message.channel.send("No puedo banear a esa persona por qué tiene un rol más alto que el mío.")
    } else if(message.guild.me.roles.highest.comparePositionTo(user.roles.highest) == 0) {
      return message.channel.send("No puedo banear a esa persona por qué tiene un rol igual que el mío. Compartimos nuestro rol más alto.")
    } else if (message.member?.roles.highest.comparePositionTo(user.roles.highest) < 0) {
      return message.reply("No puedes banear a esa persona por que tiene un rol más alto que el tuyo.");
    } else if (message.member.roles.highest.comparePositionTo(user.roles.highest) == 0) {
      return message.reply("No puedes banear a esa persona por qué ambos comparten un rol de igual jerarquía. Ambos comparten su rol más alto.")
    } else if(!user.bannable) {
      return message.reply("No puedo banear a ese usuario, seguramente sea un administrador/moderador u otro motivo.")
    } else if (!banReason) {
      return message.reply("Escribe una razón.");
    }
      user.ban({ reason: banReason });

    message.reply(`El usuario **${user}** fue baneado por **${banReason}**\nModerador: **${message.author}**`);
    const bannedEmbed = new Discord.MessageEmbed()
      .setTitle("Adiós.")
      .setDescription(
        `Lamentablemente has sido baneado de **${message.guild.name}** por el Moderador: **${message.author.username}**.\nLa razón de tu baneo fue: ${banReason}. ¡Hasta pronto!`
      )
      .setThumbnail(`${message.guild.iconURL({ size: 4096, dynamic: true })}`)
      .setTimestamp();
    user.send({ embeds: [bannedEmbed] }).catch(() => {});
  },
};
