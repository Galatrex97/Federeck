import {
  Client,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
} from "discord.js";
import https from "https";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "mc-server",
  description: "Muestra la información sobre un server de minecraft",
  options: [
    {
      name: "ip",
      description: "La ip del server de minecraft",
      type: "STRING",
      required: true,
    },
    {
      name: "port",
      description: "El puerto del server",
      type: "STRING",
      required: false,
    }
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {

      const ip = interaction.options.getString("ip");
      const optPort = interaction.options.getString("port");
    const options = {
      hostname: "api.mcsrvstat.us",
      port: optPort || 443,
      path: "/2/" + ip,
      method: "GET",
    };

const request = https.request(options, (response) => {
      let str: string = "";
      response.on("data", (data) => {
        str += data;
      });
      response.on("end", () => {
        let resp: any = JSON.parse(str);
        console.log(resp)
        if (!resp || !resp.hostname) {
         return interaction.reply({ content:"No encontré un server con la ip " + ip, ephemeral: true});
        }
        //create answer message with default offline data

let embed = new MessageEmbed()
.setTitle(`${ip}`)
.setColor("WHITE")
.setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
.setImage(`https://api.mcsrvstat.us/icon/${ip}`)
.setTimestamp()
.setFooter("La información se actualiza cada 5 minutos")
.addFields(
  {
    name: "Dirección IP",
    value: `${resp[0].ip ? resp[0].ip : "No hay información"}`
  },
  {
    name: "Puerto",
    value: `${resp[0].port ? resp[0].port : "No hay información"}`
  },
    {
        name: "Estado",
        value: "Offline",
    },
    {
        name: "Motd",
        value: `${resp.motd ? resp.motd.clean.join("\n") : "Ninguno"}`
    },
    {
        name: "Jugadores online",
        value: `${resp.players ? resp.players.online + "/" + resp.players.max : "No hay información"}`
    },
    {
        name: "Versión",
        value: `${Array.isArray(resp.version) ? resp.version[0] : resp.version || "No hay información"}`,
    },
    {
        name: "Plugins",
        value: `${resp.plugins ? resp.plugins.names.join(", ") : "Ninguno"}`
    },
    {
        name: "Mods",
        value: `${resp.mods ? resp.mods.names.join(", ") : "Ninguno"}`
    }
)

        /* let embed: any = {
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
        }; */
        //fill with data if it's online
        if (resp.online) {
          embed.fields[0].value = "Online";
/*           embed.fields.push({
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
          }); */
        }
        //send answer
        try {
          interaction.reply({ embeds: [embed] });
        } catch (err) {
          console.log(err);
        }
      });
    });
    //error handling
    request.on("error", (err) => {
      console.log(err);
      interaction.reply({ content: "Ha ocurrido un error intentando obtener la información del server.", ephemeral: true });
    });
    //close request
    request.end();


  },
};