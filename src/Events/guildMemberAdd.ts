import Discord, { GuildMember } from "discord.js";
import { model } from "mongoose";
import welcomeChannelSchema from "../Models/add";
import Canvas from "canvas";
import { registerFont } from "canvas";
import Klar from "../Client";
import { Event } from "../Interfaces";
registerFont("./font/KGHAPPY.ttf", { family: "My Olivin" });

let welcomeCanvas: any = {};
welcomeCanvas.create = Canvas.createCanvas(1024, 500);
welcomeCanvas.context = welcomeCanvas.create.getContext("2d");
welcomeCanvas.context.font = "45px My Olivin";
welcomeCanvas.context.fillStyle = "#FFFFFF";

Canvas.loadImage("./maxresdefault.jpg").then(async (img) => {
  welcomeCanvas.context.drawImage(img, 0, 0, 1024, 500);
  welcomeCanvas.context.fillText("Bienvenido/a ", 360, 360);
  welcomeCanvas.context.beginPath();
  welcomeCanvas.context.arc(512, 166, 128, 0, Math.PI * 2, true);
  welcomeCanvas.context.stroke();
  welcomeCanvas.context.fill();
});

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client, member) => {
    let welcomeData = await welcomeChannelSchema.findOne({
      Guild: member.guild.id,
    });


    let memberUser = member.guild.members.cache.get(member.user.id).user;

    let welcomeChannel;

    if (welcomeData && welcomeData?.Channel) {
      welcomeChannel = member.guild.channels.cache.get(welcomeData.Channel);
    }
    let canvas = welcomeCanvas;

    (canvas.context.font = "42px My Olivin"),
      (canvas.context.textAlign = "center");
    canvas.context.fillText(memberUser.username.toUpperCase()+"#"+memberUser.discriminator, 512, 410);
    canvas.context.font = "32px My Olivin";
    canvas.context.fillText(
      `Eres el miembro número ${member.guild.memberCount}° `,
      512,
      455
    );
    canvas.context.beginPath();
    canvas.context.arc(512, 166, 119, 0, Math.PI * 2, true);
    canvas.context.closePath();
    canvas.context.clip();

    await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png", size: 1024 })
    ).then((img) => {
      canvas.context.drawImage(img, 385, 35, 250, 250);

      let attachment = new Discord.MessageAttachment(
        canvas.create.toBuffer(),
        `NuevoMiembro.png`
      );

      const newMemberAvatar = member.user.displayAvatarURL();
      const serverIconUrl = member.guild.iconURL() as string;
      const welcomembed = new Discord.MessageEmbed()
        .setTitle("¡Nuevo miembro!")
        .setDescription(
          `El usuario ** ${member}** se ha unido al server y ahora somos ${member.guild.memberCount} personas!`
        )
        .setThumbnail(`${newMemberAvatar}`)
        .setColor("WHITE")
        .setImage("attachment://NuevoMiembro.png")
        .setTimestamp()
        .setFooter(`Gracias por unirte a nuestro server`, serverIconUrl);

      try {
        if (welcomeChannel) {
          welcomeChannel.send({ embeds: [welcomembed], files: [attachment] });
        }
      } catch (err) {
        console.log(err);
      }
    });
  },
};
