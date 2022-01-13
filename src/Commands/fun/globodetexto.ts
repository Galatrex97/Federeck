import Discord, {
  Channel,
  Client,
  MessageEmbed,
  Message,
  TextChannel,
} from "discord.js";
import Klar from "../../Client";
import Canvas from "canvas";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";

export default class TextBallCommand extends BaseCommand {
  constructor() {
    super({
      name: "globo",
      aliases: ["globo-de-texto"],
      description:
        "Hace un globo de texto a partir de la imagen que el usuario da.",
      usage: "globo <insertar imagen<",
      category: "Fun",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES", "ATTACH_FILES"],
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
    if (!message.attachments.first())
      return message.reply({
        content: " Debes enviar un archivo de imagen adjunto al comando",
        allowedMentions: {
          repliedUser: false,
        },
      });

    let img = message.attachments.first() as any;
    let relation = img.width / img.height;
    let link = img?.url;
    let format = link.split(".").pop();
    let validfmt = ["png", "jpg", "jpeg", "gif"];

    if (!validfmt.includes(format))
      return message.reply({
        content: " Formato de archivo inválido",
        allowedMentions: {
          repliedUser: false,
        },
      });

    const button = new Discord.MessageButton()
      .setLabel("Editor online")
      .setStyle("LINK")
      .setURL("https://www.online-image-editor.com/");

    const actionrow = new Discord.MessageActionRow().addComponents([button]);

    if (relation < 0.2 || relation > 5)
      return message.reply({
        content:
          " Imagen muy estirada, elige otra con una relación de aspecto mas cuadrada o modifícala.",
        components: [actionrow],
        allowedMentions: {
          repliedUser: false,
        },
      });

    if (img.size > 1048576)
      return message.reply({
        content:
          " Imagen muy pesada, elige otra con un tamaño inferior a 1MB o comprime la imagen.",
        components: [actionrow],
        allowedMentions: {
          repliedUser: false,
        },
      });

    const canvas = Canvas.createCanvas(img.width, img.height + img.width / 3);
    const ctx = canvas.getContext("2d");
    let ballon = await Canvas.loadImage("https://i.imgur.com/gH1gbIT.png");
    let image = await Canvas.loadImage(
      (message.attachments.first() as any).url
    );
    ctx.drawImage(ballon, 0, 0, img.width, img.width / 3);
    ctx.drawImage(image, 0, img.width / 3, img.width, img.height);

    const attachment = new Discord.MessageAttachment(
      canvas.toBuffer(),
      "textball.png"
    );

    try {
      message.reply({
        files: [attachment],
        allowedMentions: {
          repliedUser: false,
        },
      });
    } catch (err) {
      console.log(err);
    }
  };
}
