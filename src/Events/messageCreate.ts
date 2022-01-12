import afkSchema from "../Models/afk";
import la_grasa from "../Models/lagrasa";
import antilink from "../Models/antilinkbv";
import Discord, { Message, Collection, MessageEmbed } from "discord.js";
import moment from "moment";
let prefix = process.env.prefix as string;
import { Event } from "../Interfaces";
import { is_url } from "../functions";
import { myMention, randomsPacmansReplies, randomizePacmanReplies, pacmansReplies } from "../resources";
import { findBestMatch } from "string-similarity"
export const event: Event = {
  name: "messageCreate",
  run: async (client, message) => {
    //Returns & Conditionals
    if(message.author.bot) return;

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
      message.channel.send(pacmansReplies[~~(
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
              parse: ["users"]
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
              parse: ["users"]
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
    const p = await client.prefix(message) || prefix;

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

const latPerms = {
CREATE_INSTANT_INVITE: "Crear invitaciones",
KICK_MEMBERS: "Expulsar miembros",
BAN_MEMBERS: "Banear miembros",
ADMINISTRATOR: "Administrador",
MANAGE_CHANNELS: "Gestionar canales",
MANAGE_GUILD: "Gestionar servidor",
ADD_REACTIONS: "Añadir reacciones a mensajes",
VIEW_AUDIT_LOG: "Ver el registro de auditoría",
PRIORITY_SPEAKER: "Tener prioridad de palabra (Volumen más alto en comparación a los otros miembros en un canal de voz)",
STREAM: "Transmitir",
VIEW_CHANNEL: "Ver canal",
SEND_MESSAGES: "Enviar mensajes",
SEND_TTS_MESSAGES: "Enviar mensajes de texto a voz",
MANAGE_MESSAGES: "Gestionar mensajes (Borrar mensajes y reacciones)",
EMBED_LINKS: "Enviar links con una vista previa",
ATTACH_FILES: "Adjuntar archivos",
READ_MESSAGE_HISTORY: "Leer el historial de mensajes en un canal de texto",
MENTION_EVERYONE: "Mencionar @everyone",
USE_EXTERNAL_EMOJIS: "Utilizar emojis de otro servidor",
VIEW_GUILD_INSIGHTS: "Ver las insignias del servidor",
CONNECT: "Conectarse a un canal de voz",
SPEAK: "Hablar en un canal de voz",
MUTE_MEMBERS: "Silenciar miembros de los canales de voz",
DEAFEN_MEMBERS: "Remover el audio de los miembros en los canales de voz (no escuchar audio en un canal de voz)",
MOVE_MEMBERS: "Mover miembros de un canal de voz a otro",
USE_VAD: "Utilizar Actividad de voz",
CHANGE_NICKNAME: "Cambiar o reestablecer mi propio apodo (nickname)",
MANAGE_NICKNAMES: "Cambiar o reestablecer los apodos (nicknames) de los miembros",
MANAGE_ROLES: "Gestionar los roles del servidor (eliminarlos o cambiar su información)",
MANAGE_WEBHOOKS: "Gestionar las webhooks del servidor, eliminarlas o crear nuevas",
MANAGE_EMOJIS_AND_STICKERS: "Gestionar los emojis y/o stickers del servidor (eliminarlos, crear nuevos o cambiar información de los ya existentes)",
USE_APPLICATION_COMMANDS: "Utilizar Interacciones de los bots (Slash Commands y Context Menus)",
REQUEST_TO_SPEAK: "Permiso para solicitar hablar en un canal de escenario",
MANAGE_EVENTS: "Gestionar los eventos programados de un servidor (eliminarlos, crear nuevos o cambiar información de los ya existentes)",
MANAGE_THREADS: "Gestionar los hilos de los canales (eliminarlos, crear nuevos o cambiar información de los ya existentes)",
CREATE_PUBLIC_THREADS: "Crear hilos públicos en un canal",
CREATE_PRIVATE_THREADS: "Crear hilos cerrados | privados en un canal",
USE_EXTERNAL_STICKERS: "Utilizar stickers de otro servidor",
SEND_MESSAGES_IN_THREADS: "Enviar mensajes en los hilos de un canal",
START_EMBEDDED_ACTIVITIES: "Iniciar una actividad en un canal de voz (exclusivo para bots)",
MODERATE_MEMBERS: "Aislar miembros (mutearlos)"
}

let botPerms = cmd?.botPerms;
let userPerms = cmd?.userPerms;

if(userPerms) {
  let permsHav: Array<string> = [];
  let reqPerms: Array<string> = [];
  let allPerms: Array<string> = [];

  userPerms.forEach(permission => {
allPerms.push(latPerms[permission])
      let dex = message.guild.me.permissions.has(permission);

      if (dex) {
          permsHav.push(latPerms[permission]);
      } else if (!dex) {
          reqPerms.push(latPerms[permission]);
      };



  })

  if (reqPerms.length > 0 && message.guild.me.permissions.has("SEND_MESSAGES")) {

      let reqEmbed = new MessageEmbed()
          .setTitle("Necesitas más permisos para ejecutar este comando")
          .setDescription(`Para ejecutar este comando se necesitan los siguientes permisos:\n\n**Todos los permisos necesarios: **\n\`\`\`${allPerms.join("\n")}\`\`\`\n${permsHav.length > 0 ? `**Permisos que ya tienes: **\n\`\`\`${permsHav.join("\n")}\`\`\`\n` : "" } ${permsHav.length > 0 ? `**Permisos que aún te faltan: **\n\`\`\`${reqPerms.join("\n")}\`\`\`\n` :  "" } Para continuar, es necesario que tengas los permisos que aun te faltan.`)
.setColor("WHITE")


      message.reply({
          embeds: [reqEmbed]
      })
  } 

}

if (botPerms) {
  let permsHav: Array<string> = [];
  let reqPerms: Array<string> = [];
  let allPerms: Array<string> = [];

  botPerms.forEach(permission => {
allPerms.push(latPerms[permission])
      let dex = message.guild.me.permissions.has(permission);

      if (dex) {
          permsHav.push(latPerms[permission]);
      } else if (!dex) {
          reqPerms.push(latPerms[permission]);
      };



  })

  if (reqPerms.length > 0 && message.guild.me.permissions.has("SEND_MESSAGES")) {

      let reqEmbed = new MessageEmbed()
          .setTitle("Necesito más permisos para ejecutar este comando")
          .setDescription(`Para ejecutar este comando se necesitan los siguientes permisos:\n\n**Todos los permisos necesarios: **\n\`\`\`${allPerms.join("\n")}\`\`\`\n${permsHav.length > 0 ? `**Permisos que ya tengo: **\n\`\`\`${permsHav.join("\n")}\`\`\`\n` : "" } ${permsHav.length > 0 ? `**Permisos que aún me faltan: **\n\`\`\`${reqPerms.join("\n")}\`\`\`\n\n` :  "" } Para continuar, es necesario que edites mis permisos o me des un rol con los permisos que aún necesito.`)
.setColor("WHITE")


      message.reply({
          embeds: [reqEmbed]
      })
  } 

}

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
            0
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
    if (cmd?.devOnly && message.author.id !== process.env.botOwner)
      return message.reply(`Ese comando está en modo inestable, solamente el grupo de desarrolladores puede hacer esto.`).then(m => {
        setTimeout(() => {
          m.delete();
        }, 10000)
      });

      if(cmd?.guildOnly && !message.guild) {
        return message.reply("Este comando solo está habilitado para los servidores.")
      }

      if(!message.inGuild) {
        delete cmd?.botPerms;
        delete cmd?.userPerms; 
      }

    try {
      if (cmd) {
        cmd.run(client, message, args, p);
      }
    } catch (e) {
      console.log(e);
    }

    if (!cmd) {

let cmdEmbed = new MessageEmbed()
.setTitle("Comando inexistente o mal escrito")
.setColor("#2f3136")
.setTimestamp()

const commandsArr = client.commands.map(x => x.name);

const res = findBestMatch(command, commandsArr);

const pos = res.bestMatch.rating;

const filter = client.commands.filter(x => x.category == "NSFW").find(y => y.name == res.bestMatch.target)

if(pos < 0.325 || filter && !message.channel.nsfw) {
  cmdEmbed.setDescription(`No tengo un comando llamado \`${command}\`\nTampoco encontramos un comando parecido entre los ${client.commands.size} comandos en total.\nSi crees que pueda existir o estás buscando otro comando, usa ${p}help.`)
  return message.reply({ embeds: [cmdEmbed] })
}
cmdEmbed.setDescription(`No tengo un comando llamado \`${command}\`\nComando más parecido: \`${res.bestMatch.target}\`\nSi crees que este no es el comando que buscas, puedes usar \`${p}help\` para ver mis comandos.`)
return message.reply({ embeds: [cmdEmbed] })
    }
  },
};
