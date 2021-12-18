import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../client";

import { Command } from "../../interfaces";

export const command: Command = {
  name: "phcomment",
  aliases: ["hubcomment"],
  usage: "phcomment/hubcomment <args>",
  category: "Fun",
  description: "XDD",

  run: (client: Klar, message: Message, args: String[]) => {
    let txt = args.join("%20"); //Argumentos
    if (txt.includes("@"))
      return message.reply(
        "Intenta no mencionar, esto puede provocar errores."
      );
    if (!txt) return message.reply("Olvidaste colocar el comentario."); //Si no hay argumentos...
    if(txt.length > 30) return message.reply("El texto debe ser menor a 30 carácteres.")   
    let autor = message.author; //Definimos autor

    let attachment = new Discord.MessageAttachment(
      `https://nekobot.xyz/api/imagegen?type=phcomment&image=${autor.displayAvatarURL()}&text=${txt}&username=${
        autor.username
      }&raw=1`,
      "logo.png"
    ); //Pedimos la imagen

    try {
      message.reply({ files: [attachment] }); //La enviamos
    } catch (err) {
      let errmsg = new MessageEmbed()
        .setTitle("Ha ocurrido un error")
        .setDescription(`**Tengo el siguiente error:** ${err}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter("Tipico")
        .setColor("WHITE")
        .setTimestamp();

      console.log(err);
    }
  }, //Fin del codigo :D
};
