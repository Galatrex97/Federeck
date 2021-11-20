import afkSchema from "../Models/afk";
import lagrasa from "../Models/lagrasa";
import antilink from "../Models/antilinkbv";
import Discord, { Message, Collection } from "discord.js";
import moment from "moment";
let prefix = process.env.prefix as string;
import { Event } from "../Interfaces";
import { is_url } from "../functions"; 
import { myMention, randomsPacmansReplies } from "../resources";

export const event: Event = {
  name: "messageCreate",
  run: async (client, message) => {
    //Returns & Conditionals
    if (message.author.bot) return;
    if (message.author.bot && message.channel.type === "DM") return;
    if (message.channel.type === "DM" && message.content.startsWith(prefix)) {
      try {
        return message.reply("Los comandos en MD no están soportados aún.");
      } catch (err) {
        console.log(err);
      }
    } else if (message.channel.type === "DM") {
      return;
    }

    //Params Objects
    const afkSearchParams = {
      userId: message.author.id,
      guildId: message.guild?.id,
    };

    let pacmansConfigParams = {
      userId: message.author.id,
      guildId: message.guild?.id,
    };

    let antilinkConfigParams = {
      guild: message.guild?.id,
    };

    let afkMentParams = {
      userId: message.mentions.members.first()?.id,
      guildId: message.guild?.id,
    };

    //Definitions
    let AFKData =
      (await afkSchema.findOne(afkSearchParams)) ||
      (await afkSchema.create(afkSearchParams));

    let fechaDeAusencia = moment(AFKData.timeAgo).locale("es").fromNow();

    let idleReason = AFKData.AFK_Reason;

    let pacmansConfig =
      (await lagrasa.findOne(pacmansConfigParams)) ||
      (await lagrasa.create(pacmansConfigParams));

    let antilinkConfig =
      (await antilink.findOne(antilinkConfigParams)) ||
      (await antilink.create(antilinkConfigParams));

    if (pacmansConfig.sdlg === true && message.content === ":v") {
      message.channel.send(randomsPacmansReplies);
    }

    //Antilink System
    if (
      antilinkConfig.switch === true &&
      is_url(message.content) &&
      !message.member?.permissions.has("ADMINISTRATOR")
    ) {
      try {
        const noLinksEmbed = new Discord.MessageEmbed()
          .setTitle("Antilink activado")
          .setDescription("No puedes enviar links, el antilink está activado.")
          .setFooter(
            `${client.user?.username} antilink`,
            client.user?.displayAvatarURL()
          )
          .setColor("WHITE");

        message
          .delete()
          .then((m: Message) => m.channel.send({ embeds: [noLinksEmbed] }));
      } catch (error) {
        console.log(error);
      }
    }

    //AFK System
    if (AFKData.AFK === true) {
      if (AFKData.AFK_Reason) {
        AFKData.AFK = false;
        AFKData.AFK_Reason = null;
        await AFKData.save();

        message.channel.send(
          `Volviste **${
            message.member?.nickname || message.author.username
          }**, estuviste AFK **${fechaDeAusencia}** por **${idleReason}**`
        );
      }
      if (!AFKData.AFK_Reason) {
        AFKData.AFK = false;
        AFKData.AFK_Reason = null;
        await AFKData.save();

        message.channel.send(
          `Volviste **${
            message.member?.nickname || message.author.username
          }**, estuviste AFK **${fechaDeAusencia}**`
        );
      }
    }

    if (message.mentions.members?.first()) {
      let AFKMentData =
        (await afkSchema.findOne(afkMentParams)) ||
        (await afkSchema.create(afkMentParams));

      if (AFKMentData.AFK === true) {
        let tiempoAusente = moment(AFKMentData.timeAgo).locale("es").fromNow();

        if (AFKMentData.AFK_Reason) {
          message.channel.send(
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk por: **${
              AFKMentData.AFK_Reason
            }** desde **${tiempoAusente}**`
          );
        }
        if (!AFKMentData.AFK_Reason) {
          message.channel.send(
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk desde **${tiempoAusente}**`
          );
        }

        AFKMentData.save();
      }
    }

    //Custom Prefix System
    const p = await client.prefix(message);

    if (message.content.match(myMention))
      try {
        return message.reply(
          `Mi prefix es \`${p}\` si necesitas más ayuda utiliza \`${p}help\``
        );
      } catch (error) {
        console.log(error);
      }

    if (message.content === p) return;
    if (!message.content.startsWith(p)) return;
    const args: any = message.content.slice(p.length).trim().split(/ +/g);
    const command = args.shift().toLowerCase();
    const cmd =
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command) as string);

    //Cooldowns System
    let cooldowns = client.cooldowns;

    if (!cooldowns.has(cmd?.name)) {
      client.cooldowns.set(cmd?.name, new Collection());
    }

    let actualTime = Date.now();
    let cooldownTimestamps = cooldowns.get(cmd?.name);
    let cooldownAmount: any;
    if (cmd && cmd?.cooldown) {
      cooldownAmount = cmd?.cooldown * 1000;
    }

    if (cooldownTimestamps?.has(message.author.id)) {
      let cooldownExpiration =
        cooldownTimestamps.get(message.author.id) + cooldownAmount;

      if (actualTime < cooldownExpiration) {
        let timeLeft = (cooldownExpiration - actualTime) / 1000;
        return message.reply(
          `Por favor espera **${timeLeft.toFixed(
            1
          )} segundos** antes de volver a usar el comando \`${cmd?.name}\`.`
        );
      }
    }

    cooldownTimestamps.set(message.author.id, actualTime);
    setTimeout(
      () => cooldownTimestamps.delete(message.author.id),
      cooldownAmount
    );

    //Beta & Unstable Commands
    if (cmd?.dev === true && message.author.id !== process.env.botOwner)
      return message.reply(`Ese comando está en "Reconstrucción" `);

    try {
      if (cmd) {
        cmd.run(client, message, args, p);
      }
    } catch (e) {
      console.log(e);
    }

    if (!cmd) {
      return message.reply(
        `No tengo un comando llamado \`${command}\` pero puedes usar \`${p}help\``
      );
    }
  },
};
