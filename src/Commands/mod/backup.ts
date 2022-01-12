import Discord, {
  Client,
  Message,
  MessageEmbed,
  EmbedAuthorData,
  Guild,
  GuildMember,
} from "discord.js";
import * as backup from "discord-backup";
import Klar from "../../Client";
backup.setStorageFolder(__dirname + "/backups/");
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class BackupCommand extends BaseCommand {
  constructor() {
    super({
      name: "backup",
      aliases: ["cloud"],
      description: "Crea una copia de seguridad de un server",
      usage: "backup/cloud",
      category: "Mod",
      cooldown: 0,
      botPerms: ["ADMINISTRATOR", "SEND_MESSAGES"],
      userPerms: ["ADMINISTRATOR"],
      devOnly: false,
      guildOnly: true,
    });
  }

  run = async (client: Lyon, message: Message, args, p) => {
    let guild = message.guild as Guild;

    let me = message.guild?.me as GuildMember;
    backup
      .create(guild, {
        jsonBeautify: true,
      })
      .then((backupData) => {
        // And send informations to the backup owner
        message.author.send({
          embeds: [
            new Discord.MessageEmbed()
              .setAuthor({
                name: "Se ha creado una nueva copia de seguridad de un servidor",
              })
              .setColor(me.displayHexColor)
              .setDescription(
                `**Para cargar esta backup usa** \`\`\`${
                  p + "backupload " + backupData.id
                }\`\`\`\n**Información general:** \n\n**ID del server:** ${
                  message.guild?.id
                }\n**Nombre del server:** ${
                  message.guild?.name
                }\n**Guardada por:** ${
                  message.member?.nickname + message.author.discriminator ||
                  message.author.username + "#" + message.author.discriminator
                }\n**Fecha de esta copia:**\n <t:${(
                  message.createdTimestamp / 1000
                ).toFixed(0)}:F>`
              )
              .setThumbnail(message.author.displayAvatarURL()),
          ],
        });
        message.channel.send({
          embeds: [
            //backupData.id
            new Discord.MessageEmbed()
              .setAuthor({ name: `Backup creada correctamente` })
              .setColor(me.displayHexColor)
              .setThumbnail(message.author.displayAvatarURL())
              .setDescription(`**El ID de la backup se ha enviado a tu MD**`),
          ],
        });
      })
      .catch((error) => {
        console.log(error);

        message.channel.send("Ha ocurrido un error.");
      });
  };
}
