import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import { is_url } from "../../functions";
import translate from "@iamtraction/google-translate"; //requerimos la API que necesitaremos...
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export class TranslateCommand extends BaseCommand {
  constructor() {
    super({
      name: "translate",
      aliases: [],
      category: "Útil",
      cooldown: 7,
      description: "Traduce",
      usage:
        'translate es Hallo \nEsto traducirá "Hallo" (Hola en alemán) a español.\nResultado: Hola.',
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
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
    const idioma = args[0] as string; //Establecemos el argumento 0 como el idioma al que se traducira
    const texto = args.slice(1).join(" "); //A partir del argumento 1 tomara el texto a traducir

    let def = is_url(texto);

    if (def) {
      return message.reply("No traduzcas links.");
    }

    if (!idioma) {
      //Si no escribio el idioma de la manera correcta
      return message.channel.send(
        "Especifica el idioma al que el texto será traducido"
      );
    }
    if (!texto) {
      //Si solamente escribio el idioma pero no el texto...
      return message.channel.send("Y el texto que quieres traducir?");
    }

    translate(texto, { to: idioma })
      .then((res) => {
        //Hacemos la función de la API que es la traducirá el texto al idioma que se especifico
        let embed = new MessageEmbed() //Me gusta usar embeds xd
          .setTitle("Traductor")
          .addField("Texto a traducir:", texto)
          .addField("Traducción:", res.text)
          .setColor("WHITE"); //Un console log por si las dudas
        message.channel.send({ embeds: [embed] }); //Se envia el embed
      })
      .catch((err) => {
        console.error(err); //En caso de haber un error en este caso seria introducir mal el lenguaje al que se traducirá
      });
    //Nota: el idioma a traducir tiene que ser escrito en ingles, como spanish, japanese, english, etc...
  };
}
