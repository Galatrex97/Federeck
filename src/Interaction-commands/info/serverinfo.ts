import {
  Client,
  CommandInteraction,
  MessageEmbed,
  Guild,
  TextChannel,
} from "discord.js";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "serverinfo",
  description: "Muestra información sobre este server",
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {

 const owner = (await (interaction.guild as Guild).fetchOwner()).user;
    let server = interaction.guild as Guild; //definimos server
    let serverSi: any = server?.premiumSubscriptionCount?.toString();
    const nya = {
      NONE: "Ninguno, ez",
      LOW: "Bajo",
      MEDIUM: "Mediano",
      HIGH: "Alto",
      VERY_HIGH: "Tryhard",
    };
    const regions = {
      "en-US": "English (United States)",
      "en-GB": "English (Great Britain)",
      "zh-CN": "Chinese (China)",
      "zh-TW": "Chinese (Taiwan)",
      "pt-BR": "Portuguese (Brazil)",
      "es-ES": "Spanish (Spain)",
      "sv-SE": "Swedish",
      cs: "Czech",
      da: "Danish",
      nl: "Dutch",
      fr: "French",
      de: "German",
      el: "Greek",
      hu: "Hungarian",
      it: "Italian",
      ja: "Japanese",
      ko: "Korean",
      no: "Norwegian",
      pl: "Polish",
      ru: "Russian",
      tr: "Turkish",
      bg: "Bulgarian",
      uk: "Ukrainian",
      fi: "Finnish",
      hr: "Croatian",
      ro: "Romanian",
      lt: "Lithuanian",
    };

    let serverIcon: any = server?.iconURL() as string;
    let serverName: any = server?.name as string;
    const embed = new MessageEmbed()
      .setTitle("**Información del server**")
      .setDescription("**Información actual del server**")
      .setThumbnail(serverIcon)
      .setAuthor(serverName, serverIcon)
      .addField("**ID**", server?.id, true)
      .addField("**Fecha de creación**", `${server?.joinedAt}`)
      .addField("**Región:**", regions[server.preferredLocale])
      .addField("**Dueño del server:**", `${owner}`)
      .addField("** ID del dueño :**", `${owner.id}`)
      .addField(
        `**Canales**: ${server?.channels.cache.size}ㅤㅤ`,
        `Categorias:  ${
          server.channels.cache.filter((x) => x.type === "GUILD_CATEGORY").size
        }\nTexto: ${
          server.channels.cache.filter((x) => x.type === "GUILD_TEXT").size
        } \nVoz: ${
          server.channels.cache.filter((x) => x.type === "GUILD_VOICE").size
        }`,
        true
      )
      .addField("**Miembros**", server?.memberCount.toString(), true)
      .addField(
        "**Bots**",
        `${interaction.guild?.members.cache.filter((m) => m.user.bot).size}`
      )
      .addField("**Emojis**", `${interaction.guild?.emojis.cache.size}`)
      .addField("**Boosts**", serverSi)
      .addField(
        "**Nivel de verificación**",
        `${nya[server?.verificationLevel]}`
      )
      .addField("**Roles**", `${server.roles.cache.size}`, true)
      .setColor("WHITE");
    try {
      interaction.followUp({ embeds: [embed] });
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

  },
};