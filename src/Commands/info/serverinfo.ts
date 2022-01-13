import Discord, { Client, MessageEmbed, Guild, Message } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class SVInfoCommand extends BaseCommand {
  constructor() {
    super({
      name: "serverinfo",
      aliases: [],
      description: "Muestra información detallada sobre",
      usage: "serverinfo",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
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
    const owner = (await (message.guild as Guild).fetchOwner()).user;
    let server = message.guild as Guild; //definimos server
    let serverSi: any = server?.premiumSubscriptionCount?.toString();
    const securityLvl = {
      NONE: "Ninguno, ez",
      LOW: "Bajo",
      MEDIUM: "Mediano",
      HIGH: "Alto",
      VERY_HIGH: "Tryhard",
    };
    const regions = {
      "en-US": "Inglesa (Estados Unidos)",
      "en-GB": "Inglesa (Inglaterra)",
      "zh-CN": "China (China)",
      "zh-TW": "China (Taiwan)",
      "pt-BR": "Portugues (Brazil)",
      "es-ES": "Spanish (España)",
      "sv-SE": "Sueca (Suecia)",
      cs: "Checa",
      da: "Danesa",
      nl: "Holandesa",
      fr: "Francesa",
      de: "Alemana",
      el: "Griega",
      hu: "Húngara",
      it: "Italiana",
      ja: "Japonesa",
      ko: "Coreana",
      no: "Noruega",
      pl: "Polaca",
      ru: "Rusa",
      tr: "Turca",
      bg: "Búlgara",
      uk: "Ucraniana",
      fi: "Finlandesa",
      hr: "Croata",
      ro: "Romana",
      lt: "Lituana",
    };

    let serverIcon: any = server?.iconURL() as string;
    let serverName: any = server?.name as string;
    const embed = new Discord.MessageEmbed()
      .setTitle("**Información del server**")
      .setDescription("**Información actual del server**")
      .setThumbnail(serverIcon)
      .setAuthor({ name: serverName, iconURL: serverIcon })
      .addField("**ID del server**", server?.id, true)
      .addField("**Fecha de creación**", `${server?.createdAt}`)
      .addField("**Región:**", regions[server.preferredLocale])
      .addField("**Dueño del server:**", `${owner}`)
      .addField("** ID del dueño:**", `${owner.id}`)
      .addField(
        `**Canales**: ${server?.channels.cache.size}`,
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
        `${message.guild?.members.cache.filter((m) => m.user.bot).size}`
      )
      .addField("**Emojis**", `${message.guild?.emojis.cache.size}`)
      .addField("**Boosts**", serverSi)
      .addField(
        "**Nivel de verificación**",
        `${securityLvl[server?.verificationLevel]}`
      )
      .addField("**Roles**", `${server.roles.cache.size}`, true)
      .setColor("WHITE");
    try {
      message.reply({ embeds: [embed] });
    } catch (err) {
      console.log(err);
    }
  };
}
