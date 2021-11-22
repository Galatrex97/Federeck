import Discord, { Message, MessageEmbed } from "discord.js";
import { Command } from "../../Interfaces";
import Canvas from "canvas";
export const command: Command = {
  name: "sus",
  aliases: [],
  category: "Fun",
  usage: "sus [user]",
  description: "Kinda sus",

  run: async (client, message, args) => {
    const member = message.mentions.members?.first() || message.member;
    const pfp: any = member?.user.displayAvatarURL({ format: "jpg" })
    const avatar = await Canvas.loadImage(pfp);
    let bg = await Canvas.loadImage("https://github.com/katie07/Imagayes/blob/main/AMOGUS.png?raw=true%22%22")
    let knife = await Canvas.loadImage("https://github.com/katie07/Imagayes/blob/main/KNFIE.png?raw=true%22%22")
    const canvas = Canvas.createCanvas(1000, 1000);
    const ctx = canvas.getContext("2d");
    ctx.drawImage(avatar, 440, 200, 500, 290);
    ctx.drawImage(bg, 0, 0, 1000, 1000);
    ctx.drawImage(knife, 630, 400, 300, 300);
    
    const attachment = new Discord.MessageAttachment(canvas.toBuffer(), 'ARCHIE.jpg');
    message.channel.send({
        files: [attachment]
    });

  },
};