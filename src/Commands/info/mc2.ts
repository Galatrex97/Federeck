import https from "https";
import { Message, MessageEmbed } from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class MinecraftSvCommand extends BaseCommand {
  constructor() {
    super({
      name: "mc-server",
      aliases: ["mc"],
      description:
        "Busca un servidor de Minecraft en los servidores de Mojang. (inestable)",
      usage: "mc-server <link/ip del server>",
      category: "Info",
      cooldown: 10,
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

  run = async (client: Lyon, message: Message, args) => {
    //check if there're arguments
    if (!args.length) {
      message.reply("Por favor especifica la ip de un server.");
      return;
    }
    //create new request
    const options = {
      hostname: "api.mcsrvstat.us",
      port: 443,
      path: "/2/" + args[0],
      method: "GET",
    };
    const request = https.request(options, (response) => {
      let str: string = "";
      response.on("data", (data) => {
        str += data;
      });
      response.on("end", () => {
        let resp: any = JSON.parse(str);
        if (!resp.hostname) {
          message.channel.send("No encontré un server con la ip " + args[0]);
          return;
        }
        //create answer message with default offline data

        let embed: any = {
          color: "WHITE",
          title: args[0],
          thumbnail: {
            url: "https://api.mcsrvstat.us/icon/" + args[0],
          },
          fields: [{ name: "Estado", value: "Offline" }],
          image: {
            url: "https://api.mcsrvstat.us/icon/" + args[0],
          },
          timestamp: new Date(),
          footer: {
            text: "La información se actualiza cada 5 minutos",
          },
        };
        //fill with data if it's online
        if (resp.online) {
          embed.fields[0].value = "Online";
          embed.fields.push({
            name: "Motd",
            value: resp.motd ? resp.motd.clean.join("\n") : "Ninguno",
          });
          embed.fields.push({
            name: "Players online",
            value: resp.players.online + "/" + resp.players.max,
          });
          embed.fields.push({
            name: "Version",
            value: Array.isArray(resp.version) ? resp.version[0] : resp.version,
          });
          embed.fields.push({
            name: "Plugins",
            value: resp.plugins ? resp.plugins.names.join(", ") : "Ninguno",
          });
          embed.fields.push({
            name: "Mods",
            value: resp.mods ? resp.mods.names.join(", ") : "Ninguno",
          });
        }
        //send answer
        try {
          message.channel.send({ embeds: [embed] });
        } catch (err) {
          console.log(err);
        }
      });
    });
    //error handling
    request.on("error", (err) => {
      console.log(err);

      message.channel.send(
        "Ha ocurrido un error intentando obtener la información del server."
      );
    });
    //close request
    request.end();
  };
}
