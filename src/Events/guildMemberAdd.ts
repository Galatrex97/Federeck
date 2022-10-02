import Discord, { GuildMember } from "discord.js";
import { model } from "mongoose";
import welcomeChannelSchema from "../Models/add";
import Canvas from "canvas";
import { registerFont } from "canvas";
import Klar from "../Client";
import { Event } from "../Interfaces";
registerFont("./font/KGHAPPY.ttf", { family: "My Olivin" });

export const event: Event = {
  name: "guildMemberAdd",
  run: async (client, member: GuildMember) => {

let canvas = Canvas.createCanvas(1024, 500);
let ctx = canvas.getContext("2d");
ctx.font = "45px My Olivin";
ctx.fillStyle = "#FFFFFF";

Canvas.loadImage("./maxresdefaultja.jpg").then(async (img) => {
  ctx.drawImage(img, 0, 0, 1024, 500);
  ctx.fillText("Bienvenido/a ", 360, 360);
  ctx.beginPath();
  ctx.arc(512, 166, 128, 0, Math.PI * 2, true);
  ctx.stroke();
  ctx.fill();
});


    let welcomeData = await welcomeChannelSchema.findOne({
      Guild: member.guild.id,
    });


    let memberUser = member.guild.members.cache.get(`${member.user.id}`);

    let welcomeChannel;

    if (welcomeData && welcomeData?.Channel) {
      welcomeChannel = member.guild.channels.cache.get(welcomeData.Channel);
    }

    (ctx.font = "42px My Olivin"),
      (ctx.textAlign = "center");
    ctx.fillText(memberUser?.user.username.toUpperCase()+"#"+memberUser?.user.discriminator, 512, 410);
    ctx.font = "32px My Olivin";
    ctx.fillText(
      `Eres el miembro número ${member.guild.memberCount}° `,
      512,
      455
    );
    ctx.beginPath();
    ctx.arc(512, 166, 119, 0, Math.PI * 2, true);
    ctx.closePath();
    ctx.clip();

    await Canvas.loadImage(
      member.user.displayAvatarURL({ format: "png", size: 1024 })
    ).then((img) => {
      ctx.drawImage(img, 385, 35, 250, 250);

      let attachment = new Discord.MessageAttachment(
        canvas.toBuffer(),
        `new.png`
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
        .setImage("attachment://new.png")
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
