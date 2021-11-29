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

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "help",
  aliases: ["commands"],
  cooldown: 5,
  category: "Info",
  description: `Muestra la página <Ayuda> o Información sobre un comando especifíco`,
  usage: "help [comando/categoria]",
  run: async (client, message, args, p) => {
    
let catArray = [];

    let categorias;
    if (message.author.id !== process.env.botOwner) {
      categorias = [
        ...new Set(
          client.commands
            .filter((command) => command.category !== "Zzz")
            .map((command) => command.category)
        ),
      ];
    } else {
      categorias = [
        ...new Set(client.commands.map((command) => command.category)),
      ];
    }

    for(var ids of categorias) {
      var catego = client.commands.filter(
        (command) => command.category === ids
      );
    }

    if (args.join(" ") && args.join(" ") !== ids) {
      const command =
        client.commands.get(args.join(" ").toLowerCase()) ||
        client.commands.get(
          client.aliases?.get(args.join(" ").toLowerCase() as string) as string
        );
      if (!command.usage) {
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
        command?.dev === true &&
        message.author.id !== process.env.botOwner
      ) {
        return message.reply(
          "No puedes ver información sobre este comando por que aún está en fase de desarrollo."
        );
      } else {
        const h_embed = new MessageEmbed()
          .setTitle(
            `Información del comando ${command.name.toString().toLowerCase()}`
          )
          .setColor("WHITE")
          .setTimestamp()
          .setFooter(
            "Sintaxis: <> = necesario, [] = opcional",
            `${client.user?.avatarURL()}`
          )
          .setDescription(
            [
              `> **Nombre: \`${command.name}\`**`,
              `> **Categoria: \`${command.category?.toString()}\`**`,
              `> **Descripcion: \`${capitalizeFirstLetter(
                command.description || "Este comando no tiene descripción."
              )}\`**`,
              `> **Uso: \`${p}${
                command.usage ||
                `No hay instrucciones de uso sobre este comando.`
              }\`**`,
              `> **Alias: \`${
                command.aliases?.length
                  ? command.aliases?.map((a) => `${a}`).join("`, `")
                  : "Ninguno"
              }\`**`,
              `>  **Aclaraciones: \`No se deben usar los "<>" ni los "[]" puestos abajo o en las instrucciones de uso, son indicaciones.\`**`,
            ].join("\n")
          );
        message.reply({ embeds: [h_embed], components: [row] });
      }
    } else if(args.join(" ") == ids) {

      let categoriar;
      if (message.author.id !== process.env.botOwner) {
        categoriar = [
          ...new Set(
            client.commands
              .filter((command) => command.category !== "Zzz")
              .map((command) => command.category)
          ),
        ];
      } else {
        categoriar = [
          ...new Set(client.commands.map((command) => command.category)),
        ];
      }
  
      for(var ide of categoriar) {

      }
        const categoriaz = client.commands.filter(
          (command) => command.category === ide
        );
const someEmbed = new MessageEmbed()
.setTitle("Comandos de la categoría "+ids)
.setDescription(`Con un total de **${categoriaz.size}** comandos la categoría **${ide}** tiene los siguientes comandos: \n**${categoriaz.map((command) => `\`${command.name}\``).join("\n")}**`)


    } else {
      const general_row = new MessageActionRow().addComponents(
        new MessageButton()
          .setStyle("LINK")
          .setURL("https://discord.gg/rk3FacaS2U")
          .setLabel("Soporte")
      );

      const embed = new MessageEmbed()
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
              .filter((command) => command.category !== "Zzz")
              .map((command) => command.category)
          ),
        ];
      } else {
        categories = [
          ...new Set(client.commands.map((command) => command.category)),
        ];
      }

      for (const id of categories) {
        const category = client.commands.filter(
          (command) => command.category === id
        );

        if (id == "NSFW" && !(message.channel as TextChannel).nsfw) {
          embed.addField(
            `NSFW`,
            "***`Para ver los comandos de esta categoria ejecuta este comando en un canal NSFW`***"
          );
        } else {
          embed.addField(
            `${id} (${category.size})`,
            category.map((command) => `\`${command.name}\``).join(" ")
          );
        }
      }
      try {
        return message.reply({ embeds: [embed], components: [general_row] });
      } catch (err) {
        let errmsg = new (require("discord.js").MessageEmbed)()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${err}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setFooter("Tipico")
          .setColor("WHITE")
          .setTimestamp();

        console.log(err);
      }
    }
  },
};
