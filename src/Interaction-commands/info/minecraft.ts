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
  description: "Muestra la información sobre ",
  options: [
    {
      name: "ip",
      description: "La ip del server de minecraft",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {

      const ip = interaction.options.getString("ip");

    const options = {
      hostname: "api.mcsrvstat.us",
      port: 443,
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
        if (!resp.hostname) {
          interaction.followUp("No encontré un server con la ip " + ip);
          return;
        }
        //create answer message with default offline data

let embed = new MessageEmbed()
.setTitle(`${ip}`)
.setColor("WHITE")
.setThumbnail(`https://api.mcsrvstat.us/icon/${ip}`)
.setImage(`https://api.mcsrvstat.us/icon/${ip}`)
.setTimestamp()
.setFooter("La información e actualiza cada 5 minutos")
.addFields(
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
        value: `${resp.players.online + "/" + resp.players.max}`
    },
    {
        name: "Versión",
        value: `${Array.isArray(resp.version) ? resp.version[0] : resp.version}`,
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
          interaction.followUp({ embeds: [embed] });
        } catch (err) {
          console.log(err);
        }
      });
    });
    //error handling
    request.on("error", (err) => {
      console.log(err);
      interaction.followUp(
        "Ha ocurrido un error intentando obtener la información del server."
      );
    });
    //close request
    request.end();


  },
};