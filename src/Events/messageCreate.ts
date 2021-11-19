import afkSchema from "../Models/afk"; //Importamos el model de AFK para el sistema de AFK
import lagrasa from "../Models/lagrasa"; //Importamos un model de configuración para respuestas a pacmans.
import antilink from "../Models/antilinkbv"; //Importamos el model de antilinks para el sistema de antilinks.
import Discord, { Message, Collection } from "discord.js"; //Importamos esto desde el módulo de discord.js
let prefix = process.env.prefix as string; //Definimos prefix como una string.
import { Event } from "../Interfaces"; //Importamos la interfaz de eventos.
import { is_url } from "../functions"; //Importamos una función para saber si una string es un link.

export const event: Event = {
  name: "messageCreate",
  run: async (client, message) => {
    if (message.author.bot) return; //Si el autor de el mensaje es un bot retornamos, por que no quiero responder a mensajes de bots.
    if (message.author.bot && message.channel.type === "DM") return; //Retornamos si un bot nos envía un mensaje directo.
    if (message.channel.type === "DM" && message.content.startsWith(prefix)) {
      //Si el mensaje empieza por el prefix por defecto (ya que no se puede personalizar en mensajes directos) retornamos, ya que no quiero ejecutar comandos en mensajes directos por ahora.
      try {
        return message.reply("Los comandos en MD no están soportados aún."); //Respuesta.
      } catch (err) {
        console.log(err); //Si hay un error lo mostramos en la consola.
      }
    } else if (message.channel.type === "DM") {
      //Pero si, por el contrario, es solo un mensaje, retornamos sin más.
      return;
    }

    let myMention = new RegExp(`^<@!?${client.user?.id}>( |)$`); //Acá tenemos una expresión regular (o regex) de menciones hacia mi, esto nos sirve para responder cuando nos mencionan.

    let AFKData: any; //Obtenemos información del estado de los usuarios sobre su AFK, buscamos en nuestra base de datos con la id del autor del mensaje y el server.
    try {
      AFKData = await afkSchema.findOne({
        //Intentamos encontrar datos.
        userId: message.author.id,
        guildId: message.guild?.id,
      });
      if (!AFKData)
        AFKData = await afkSchema.create({
          //Pero si no hay los creamos.
          userId: message.author.id,
          guildId: message.guild?.id,
        });
    } catch (error) {
      console.log(error); //Si hay algún error encontrando los datos mostramos el error en la consola.
    }

    let fechaDeAusencia = (AFKData.timeAgo / 1000).toFixed(0); //Esto es la fecha del momento en el que un usuario usa el comando afk para decir que está ausente.

    let idleReason = AFKData.AFK_Reason; //La razón de su ausencia, si no da ninguna, no habrá.

    let pacmansConfig: any; //La configuración sobre la respuesta a los pacmans, que por defecto está desactivada. Buscamos en nuestra base de datos con la id del server y según los datos que obtenemos hacemos o no algo.
    try {
      pacmansConfig = await lagrasa.findOne({
        //Intentamos encontrar un dato.
        guildId: message.guild?.id,
      });
      if (!pacmansConfig)
        pacmansConfig = await lagrasa.create({
          //Pero si no hay creamos un dato con solamente la id del server.
          guildId: message.guild?.id,
        });
    } catch (err) {
      console.log(err); //Si ocurre un error obteniendo los datos lo mostramos en la consola.
    }

    if (pacmansConfig.sdlg === true && message.content === ":v") {
      //Si se configuró en el server que se responda a los pacmans, entonces hará esto:
      let pacmansReplies = [
        //Un array que contiene las respuestas a los pacmans.
        ":v",
        "#HailGrasa",
        "La grasa no muere, evoluciona...",
        "Viva la grasa",
        "En la grasa habian buenos momos :pensive:",
        "El shitposting es un pasatiempo, la grasa es un sentimiento.",
        "¿Quieres ser el : de mi v?",
      ];
      let randomizePacmanReplies = Math.floor(
        Math.random() * pacmansReplies.length //Hacemos las respuestas randoms para más variedad.
      );

      message.channel.send(pacmansReplies[randomizePacmanReplies]); //Y aquí las envíamos.
    }

    let antilinksConfig: any; //La configuración sobre los antilinks, buscamos en nuestra base de datos con la id del server.
    try {
      antilinksConfig = await antilink.findOne({
        //Intentamos encontrar un dato.
        guild: message.guild?.id,
      });
      if (!antilinksConfig)
        antilinksConfig = await antilink.create({
          //Pero si no hay lo creamos.
          guild: message.guild?.id,
        });
    } catch (err) {
      console.log(err); //Si hay un error, lo mostramos en la consola.
    }

    const embed = new Discord.MessageEmbed() //El embed de respuesta si el antilink está activado en el server y un miembro envió un link.
      .setTitle("Antilink activado")
      .setDescription("No puedes enviar links, el antilink está activado.")
      .setFooter(
        `${client.user?.username} antilink`,
        client.user?.displayAvatarURL()
      )
      .setColor("WHITE");

    if (
      antilinksConfig.switch === true && //Si los antilinks están activados y
      is_url(message.content) && //El mensaje tiene un link y
      !message.member?.permissions.has("ADMINISTRATOR") //El usuario que envió el link no es un administrador entonces hacemos esto:
    ) {
      try {
        message
          .delete() //Borramos el mensaje
          .then((m: Message) => m.channel.send({ embeds: [embed] })); //Y enviamos el embed.
      } catch (error) {
        console.log(error); //Si hay un error, lo mostramos en la consola.
      }
    }

    if (AFKData.AFK === true) {
      //Si el usuario envió un mensaje y estaba ausente entonces hacemos esto:
      if (AFKData.AFK_Reason) {
        //Si dió una razón de su ausencia hacemos esto:
        AFKData.AFK = false; //Hacemos que ya no esté más ausente.
        AFKData.AFK_Reason = null; //Hacemos que su razón de ausencia sea null.

        await AFKData.save(); //Guardamos los datos.

        message.channel.send(
          `Volviste **${
            message.member?.nickname || message.author.username //Si el usuario tiene un nick o apodo en el server lo mostramos, si no, en su lugar mostramos el nombre de usuario.
          }**, estuviste AFK **<t:${fechaDeAusencia}:R>** por **${idleReason}**`
        ); //Le respondemos al usuario tras haber vuelto.
      }

      //Pero si no la dió hacemos esto:

      AFKData.AFK = false; //Hacemos que ya no esté más ausente.
      AFKData.AFK_Reason = null; //Hacemos que su razón de ausencia sea null.
      await AFKData.save(); //Guardamos los datos.

      message.channel.send(
        `Volviste **${
          message.member?.nickname || message.author.username
        }**, estuviste AFK **<t:${fechaDeAusencia}:R>**`
      ); //Le respondemos al usuario tras haber vuelto.
    }

    if (message.mentions.members?.first()) {
      //Si hay una mención hacia un miembro entonces:
      let AFKInfo: any; //Esto es como AFKData, solo que llamada AFKInfo. Buscamos en nuestra base de datos con el id del usuario mencionado y la id del servidor.
      try {
        AFKInfo = await afkSchema.findOne({
          //Intentamos encontrar datos.
          userId: message.mentions.members.first()?.id,
          guildId: message.guild?.id,
        });
        if (!AFKInfo)
          AFKInfo = await afkSchema.create({
            //Y si no hay los creamos.
            userId: message.mentions.members.first()?.id,
            guildId: message.guild?.id,
          });
      } catch (error) {
        console.log(error); //Si hay un error lo mostramos en la consola.
      }
      if (AFKInfo.AFK === true) {
        //Si el usuario mencionado está ausente hacemos lo siguiente:
        let tiempoAusente = (AFKInfo.timeAgo / 1000).toFixed(0); //Este es el tiempo que pasó desde su ausencia.

        if (AFKInfo.AFK_Reason) {
          //Si el usuario mencionado ausente dió una razón, hacemos esto:
          message.channel.send(
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk por: **${
              AFKInfo.AFK_Reason
            }** desde **<t:${tiempoAusente}:R>**`
          );
        }
        if (!AFKInfo.AFK_Reason) {
          //Pero si no la dió hacemos esto:
          message.channel.send(
            `**${
              message.mentions.members.first()?.nickname ||
              message.mentions.members.first()?.user.username
            }** está afk desde **<t:${tiempoAusente}:R>**`
          );
        }

        AFKInfo.save(); //Guardamos los datos.
      }
    }

    const p = await client.prefix(message); //Obtenemos un prefix (pro defecto o personalizado) para los comandos.

    if (message.content.match(myMention))
      // Si nos mencionan hacemos esto:
      try {
        return message.reply(
          `Mi prefix es \`${p}\` si necesitas más ayuda utiliza \`${p}help\``
        ); //Le respondemos con esto.
      } catch (error) {
        console.log(error); //Si hay un error lo mostramos en consola.
      }

    if (message.content === p) return; //Si el mensaje solo contiene el prefix retornamos.
    if (!message.content.startsWith(p)) return; //Si el mensaje no empieza por el prefix retornamos.
    const args: any = message.content.slice(p.length).trim().split(/ +/g); //Definimos los argumentos, los cuales son muy útiles en los comandos para determinar acciones, entre otra cosas.
    const command = args.shift().toLowerCase(); //Definimos lo que puede ser un comando.
    const cmd = //Y este es el comando real, lo obtenemos con el nombre o alias en nuestra colección commands.
      client.commands.get(command) ||
      client.commands.get(client.aliases.get(command) as string);

    let cooldowns = client.cooldowns; //Definimos cooldowns como nuestra colección cooldowns. Los cooldowns son útiles para evitar que determinados comandos que requieran recursos elevados se usen constantemente.

    if (!cooldowns.has(cmd?.name)) {
      client.cooldowns.set(cmd?.name, new Collection());
    }

    let actualTime = Date.now(); //Definimos la fecha actual.
    let cooldownTimestamps = cooldowns.get(cmd?.name); //NO SE PARA QUE SIRVE ESTO XD
    let cooldownAmount: any; //Esto es el tiempo de cooldown.
    if (cmd && cmd?.cooldown) {
      cooldownAmount = cmd?.cooldown * 1000; //Convertimos los segundos que dimos en la opción cooldown de los comandos a milisegundos.
    }

    if (cooldownTimestamps?.has(message.author.id)) {
      //¯\_(ツ)_/¯
      // ...
      let cooldownExpiration = //La expiración del cooldown
        cooldownTimestamps.get(message.author.id) + cooldownAmount;

      if (actualTime < cooldownExpiration) {
        //Si el tiempo actual es menor que el tiempo de expiración del cooldown, hacemos esto:
        let timeLeft = (cooldownExpiration - actualTime) / 1000; //Esto es el tiempo restante antes de que se acabe el cooldown.
        return message.reply(
          `Por favor espera **${timeLeft.toFixed(
            1
          )} segundos** antes de volver a usar el comando \`${cmd?.name}\`.`
        ); //Si todavía falta tiempo para que se acabe el cooldown le respondemos.
      }
    }

    cooldownTimestamps.set(message.author.id, actualTime);
    setTimeout(
      //Con esto eliminamos el cooldown en los segundos de cooldown.
      () => cooldownTimestamps.delete(message.author.id),
      cooldownAmount
    );

    if (cmd?.dev === true && message.author.id !== process.env.botOwner)
      //Si en un comando la opción dev es true y el id del autor del mensaje no es la id de mi owner, hacemos esto:
      return message.reply(`Ese comando está en "Reconstrucción" `); //Le respondemos con esto.

    try {
      if (cmd) {
        cmd.run(client, message, args, p); //Ejecutamos el comando con estos parámetros.
      }
    } catch (e) {
      console.log(e); //Si hay un error ejecutando un comando, entonces mostramos en la consola el error.
    }

    if (!cmd) {
      //Si no se encontró el comando:
      return message.reply(
        `No tengo un comando llamado \`${command}\` pero puedes usar \`${p}help\``
      ); //Le respondemos con esto.
    }
  },
};
