import Discord from "discord.js";
import { Message, MessageEmbed } from "discord.js";
import Lyon from "../../Client";
import BaseCommand from "../../Structures/Command";

export default class UptimeCommand extends BaseCommand {
  constructor() {
    super({
      name: "uptime",
      aliases: [],
      description: "Muestra el tiempo que ha pasado desde que fui encendido.",
      usage: "uptime",
      category: "Info",
      cooldown: 0,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  run = async (client: Lyon, message: Message, args) => {
    let days = Math.floor((client.uptime as any) / 86400000);
    let hours = Math.floor((client.uptime as any) / 3600000) % 24;
    let minutes = Math.floor((client.uptime as any) / 60000) % 60;
    let seconds = Math.floor((client.uptime as any) / 1000) % 60;

    let daysCount = days > 0 ? `\`${days} días\`` : "";
    let hoursCount = hours > 0 ? `\`${hours} horas\`` : "";
    let minutesCount = minutes > 0 ? `\`${minutes} minutos\`` : "";

    const time = new MessageEmbed()
      .setTitle("**Tiempo online**")
      .setDescription(
        `:clock1: ${daysCount} ${hoursCount} ${minutesCount} \`${seconds} segundos\``
      )
      .setColor("WHITE")
      .setFooter("Tiempo que ha pasado desde que fui encendido")
      .setTimestamp();

    try {
      message.reply({ embeds: [time] });
    } catch (err) {
      console.log(err);
    }
  };
}
