import Discord, { Client, Message, Guild, MessageEmbed } from "discord.js";
import * as backup from "discord-backup";
import Klar from "../../Client";
backup.setStorageFolder(__dirname + "/backups/");
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class BackuploadCommand extends BaseCommand {
  constructor() {
    super({
      name: "backupload",
      aliases: [],
      description:
        "Carga una backup en este servidor.\nPELIGROSO: Reemplaza todos los roles, canales, nombres e iconos, etc. Tener cuidado",
      usage: "backupload <id de la backup>",
      category: "Mod",
      cooldown: 0,
      botPerms: ["ADMINISTRATOR", "SEND_MESSAGES"],
      userPerms: ["ADMINISTRATOR"],
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
    let server = message.guild as Guild;

    if (!message.member?.permissions.has("ADMINISTRATOR")) {
      return message.channel.send("Debes ser el administrador del server.");
    }
    if (!message.guild?.me?.permissions.has("ADMINISTRATOR"))
      return message.channel.send(
        "No puedo hacer esto por la asuencia del permiso **Administrador**."
      );
    let backupID = args[0];
    if (!backupID) {
      return message.channel.send("Debes proporcionar el ID de una backup");
    }
    backup
      .fetch(backupID)
      .then(async () => {
        message.channel
          .send(
            "Advertencia: TODOS los canales, roles, etc. serán reemplazados al cargar la backup, reacciona con ✅ para confirmar o con ❌ para cancelar. Tienes 20 segundos para decidir antes de que se cancele automaticamente."
          )
          .then((m) => {
            m.react("✅");
            m.react("❌");
            const filter = (reaction, user) => {
              return (
                ["✅", "❌"].includes(reaction.emoji.name) &&
                user.id == message.author.id
              );
            };
            m.awaitReactions({
              filter,
              max: 1,
              time: 20000,
              errors: ["time"],
            })
              .catch(() => {
                m.edit(
                  "Han pasado los 20 segundos para confirmar, se ha cancelado la carga."
                );
              })
              .then((collected: any) => {
                const reaction = collected.first();
                if (reaction.emoji.name === "✅") {
                  message.author.send("La backup se empezará a cargar");
                  backup
                    .load(backupID, server)
                    .then(() => {
                      backup.remove(backupID);
                    })
                    .catch((err) => {
                      console.log(err);
                    });
                } else if (reaction.emoji.name === "❌") {
                  return message.reply(
                    "La carga de la backup se ha cancelado."
                  );
                }
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
      })
      .catch((error) => {
        console.log(error);
        message.channel.send("Ha ocurrido un error.");
      });
  };
}
