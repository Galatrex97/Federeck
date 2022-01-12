import Discord, { Client, Message, MessageEmbed } from "discord.js";
import * as backup from "discord-backup";
import Klar from "../../Client";
backup.setStorageFolder(__dirname + "/backups/");
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class BackupinfoCommand extends BaseCommand {
  constructor() {
    super({
      name: "backupinfo",
      aliases: [],
      description: "uestra información sobre una backup",
      usage: "backupinfo <id de la backup>",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    //Codigo

    let backupID = args[0];
    if (!backupID) {
      return message.channel.send("Debes proporcionar el ID de una backup");
    }
    // Fetch the backup
    backup
      .fetch(backupID)
      .then((backupInfos) => {
        const date = new Date(backupInfos.data.createdTimestamp);
        const yyyy = date.getFullYear().toString(),
          mm = (date.getMonth() + 1).toString(),
          dd = date.getDate().toString();
        const formatedDate = `${yyyy}/${mm[1] ? mm : "0" + mm[0]}/${
          dd[1] ? dd : "0" + dd[0]
        }`;
        let embed = new Discord.MessageEmbed()
          .setAuthor("Información de esta backup")
          // Display the backup ID
          .addField("Backup ID", backupInfos.id, false)
          // Displays the server from which this backup comes
          .addField("Server ID", backupInfos.data.guildID, false)
          // Display the size (in mb) of the backup
          .addField("Tamaño", `${backupInfos.size} mb`, false)
          // Display when the backup was created
          .addField("Creada el", formatedDate, false)
          .setColor("#FF0000");
        message.reply({ embeds: [embed] });
      })
      .catch((err) => {
        // if the backup wasn't found

        return message.channel.send(
          "No se ha encontrado una backup con la ID `" + backupID + "`!"
        );
      });
  };
}
