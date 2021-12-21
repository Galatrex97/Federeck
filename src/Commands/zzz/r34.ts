import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import clientnt from "nekos.life";
import * as booru from "booru";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "rule34",
  aliases: ["r34"],
  usage: "rule34 <tags>",
  dev: false,
  category: "NSFW",
  description: "Busca algo en la rule",

  run: async (client, message, args) => {
    if (!(message.channel as TextChannel).nsfw)
      return message.reply(
        "Este canal no es NSFW, abstienete de usar esos comandos aqui"
      );
    const tags = args.join("_"); //los tags que buscaremos
    if (!tags) return message.reply("Escribe algo a buscar en la r34");
    booru
      .search("rule34", [tags], { limit: 1, random: true }) //el primero es para buscar en la rule 34, luego se busca con los tags, luego agarramos una sola imagen y que sea una imagen aleatoria
      .then((posts) => {
        //el json como toda la informacion
        for (let post of posts) {
          //luego la parte post de posts
          const embed = new Discord.MessageEmbed() //creamos el embed
            .setColor("WHITE")
            .setTitle(`Resultado de la busqueda: ${tags}`)
            .setImage(post.fileUrl as string); //fileUrl es el URL directo de la imagen
          message.channel.send({ embeds: [embed] }); //mandamos el embed
        }
      })
      .catch((e) => {
        message.reply(`Ha ocurrido un error: ${e} `);
      }); //un catch por si da error
  },
};
