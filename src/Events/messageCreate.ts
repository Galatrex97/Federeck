import afkSchema from "../Models/afk";
import la_grasa from "../Models/lagrasa";
import antilink from "../Models/antilinkbv";
import Discord, { Message, Collection } from "discord.js";
import moment from "moment";
let prefix = process.env.prefix as string;
import { Event } from "../Interfaces";
import { is_url } from "../functions";
import { myMention, randomsPacmansReplies, randomizePacmanReplies, pacmansReplies } from "../resources";

export const event: Event = {
  name: "messageCreate",
  run: async (client, message) => {
    //Returns & Conditionals
    if(message.author.bot) return;
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
    const someConfigParams = {
      userId: message.author.id,
      guildId: message.guild?.id,
    };

    const pacmansParams = {
      guildId: message.guild?.id
    }

    const antilinkConfigParams = {
      guild: message.guild?.id,
    };

    const afkMentParams = {
      userId: message.mentions.members.first()?.id,
      guildId: message.guild?.id,
    };

    //Definitions
    let AFKData =
      (await afkSchema.findOne(someConfigParams)) ||
      (await afkSchema.create(someConfigParams));

    let tiempoAusente = moment(AFKData.timeAgo).locale("es").fromNow();

    let idleReason = AFKData.AFK_Reason;

    let pacmansConfig = await la_grasa.findOne(pacmansParams) || await new la_grasa(pacmansParams);

    let antilinkConfig =
      (await antilink.findOne(antilinkConfigParams)) ||
      (await antilink.create(antilinkConfigParams));

    if (pacmansConfig.sdlg == true && message.content === ":v") {
      message.channel.send(pacmansReplies[Math.floor(
        Math.random() * pacmansReplies.length
      )]);
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
          .then((m: Message) => m.channel.send({ embeds: [noLinksEmbed] }).then(m => {
            setTimeout(() => {
              m.delete();
            }, 10000)
          }));
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

        message.channel.send({
          content:
          `Volviste **${
            message.member?.nickname || message.author.username
          }**, estuviste AFK **${tiempoAusente}** por **${idleReason}**`,
          allowedMentions: {
            parse: ["users"]
          }
        }).then(m => {
          setTimeout(() => {
            m.delete();
          }, 10000)
        });
      } else if (!AFKData.AFK_Reason) {
        AFKData.AFK = false;
        AFKData.AFK_Reason = null;
        await AFKData.save();

        message.channel.send({
          content:
          `Volviste **${
            message.member?.nickname || message.author.username
          }**, estuviste AFK **${tiempoAusente}**`,
          allowedMentions: {
            parse: ["users"]
          }
        }).then(m => {
          setTimeout(() => {
            m.delete();
          }, 10000)
        })
      }
    }

    if (message.mentions.members?.first()) {
      let AFKMentData =
        (await afkSchema.findOne(afkMentParams)) ||
        (await afkSchema.create(afkMentParams));

      if (AFKMentData.AFK === true) {
        tiempoAusente = moment(AFKMentData.timeAgo).locale("es").fromNow();

        if (AFKMentData.AFK_Reason) {
          message.channel.send({ content:
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk por: **${
              AFKMentData.AFK_Reason
            }** desde **${tiempoAusente}**`,
            allowedMentions: {
              parse: []
            }
          }).then(m => {
            setTimeout(() => {
              m.delete();
            }, 60000)
          });
        }
        if (!AFKMentData.AFK_Reason) {
          message.channel.send({
            content:
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk desde **${tiempoAusente}**`,
            allowedMentions: {
              parse: []
            }
          }).then(m => {
            setTimeout(() => {
              m.delete();
            }, 60000)
          });
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
    if (!message.content.startsWith(p) || message.author.bot) return;
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
        ).then(m => {
          setTimeout(() => {
            m.delete();
          }, 10000)
        });
      }
    }

    cooldownTimestamps.set(message.author.id, actualTime);
    setTimeout(
      () => cooldownTimestamps.delete(message.author.id),
      cooldownAmount
    );

    //Beta & Unstable Commands
    if (cmd?.dev === true && message.author.id !== process.env.botOwner)
      return message.reply(`Ese comando está en "Reconstrucción" `).then(m => {
        setTimeout(() => {
          m.delete();
        }, 10000)
      });

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
