import {
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
  TextChannel,
} from "discord.js";
import { capitalizeFirstLetter } from "../../functions";
import Klar from "../../Client";
const BOT_OWNER = "";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class HelpCommand extends BaseCommand {
  constructor() {
    super({
      name: "help",
      aliases: ["commands"],
      description:
        "Muestra una lista detallada de comandos (en fase beta, implementando un menú)",
      usage: "help",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: true,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args, p) => {
    if (args.join(" ")) {
      const command =
        client.commands.get(args.join(" ").toLowerCase()) ||
        client.commands.get(
          client.aliases?.get(args.join(" ").toLowerCase() as string) as string
        );
      if (!command?.usage) {
        p = "";
      }
      const row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setURL("https://discord.gg/rk3FacaS2U")
          .setLabel("Soporte")
      );

      if (
        command?.category === "NSFW" &&
        !(message.channel as TextChannel).nsfw
      ) {
        return message.reply(
          "Para ver información sobre este comando debes usar el comando en un canal NSFW"
        );
      } else if (
        command?.devOnly === true &&
        message.author.id !== process.env.botOwner
      ) {
        return message.reply(
          "No puedes ver información sobre este comando por que aún está en fase de desarrollo."
        );
      } else {
        const cmdEmbed = new MessageEmbed()
          .setTitle(
            `Información del comando ${command?.name.toString().toLowerCase()}`
          )
          .setColor("WHITE")
          .setTimestamp()
          .setFooter(
            "Sintaxis: <> = necesario, [] = opcional",
            `${client.user?.avatarURL()}`
          )
          .setDescription(
            [
              `> **Nombre: \`${command?.name}\`**`,
              `> **Categoria: \`${command?.category?.toString()}\`**`,
              `> **Descripcion: \`${capitalizeFirstLetter(
                command?.description || "Este comando no tiene descripción."
              )}\`**`,
              `> **Uso: \`${p}${
                command?.usage ||
                `No hay instrucciones de uso sobre este comando.`
              }\`**`,
              `> **Alias: \`${
                command?.aliases?.length
                  ? command?.aliases?.map((a) => `${a}`).join("`, `")
                  : "Ninguno"
              }\`**`,
              `>  **Aclaraciones: \`No se deben usar los "<>" ni los "[]" puestos abajo o en las instrucciones de uso, son indicaciones.\`**`,
            ].join("\n")
          );
        message.reply({ embeds: [cmdEmbed], components: [row] });
      }
    } else {
      const mainRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setURL("https://discord.gg/rk3FacaS2U")
          .setLabel("Soporte")
      );

      const mainEmbed = new MessageEmbed()
        .setTitle(`Comandos de ${client.user?.username}`)
        .setColor("WHITE")
        .addField(
          `Comandos de ${client.user?.username} en Total:`,
          `\`${client.commands.size} Comandos\``
        )
        .setDescription(
          `
				El prefix de este server es \`${p}\` recuerda que puedes cambiarlo con \`${p}set-prefix\`
				Para más información en un comando especifíco, escribe \`${p}help <comando>\`.`
        )
        .setFooter(
          `${client.user?.username} Help`,
          `${client.user?.avatarURL()}`
        )
        .setTimestamp();

      let categories;
      if (message.author.id !== process.env.botOwner) {
        categories = [
          ...new Set(
            client.commands
              .filter((command) => command?.category !== "Zzz")
              .map((command) => command?.category)
          ),
        ];
      } else {
        categories = [
          ...new Set(client.commands.map((command) => command?.category)),
        ];
      }

      for (const id of categories) {
        const category = client.commands.filter(
          (command) => command?.category === id
        );

        if (id == "NSFW" && !(message.channel as TextChannel).nsfw) {
          mainEmbed.addField(
            `NSFW`,
            "***`Para ver los comandos de esta categoria ejecuta este comando en un canal NSFW`***"
          );
        } else {
          mainEmbed.addField(
            `${id} (${category.size})`,
            category.map((command) => `\`${command?.name}\``).join(" ")
          );
        }
      }
      try {
        return message.reply({ embeds: [mainEmbed], components: [mainRow] });
      } catch (err) {
        console.log(err);
      }
    }
  };
}
