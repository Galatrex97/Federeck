import Discord from "discord.js";
const {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
} = require("discord.js");

import { Command } from "../../Interfaces";

export const command: Command = {
  name: "userinfo",
  aliases: [],
  usage: "userinfo",
  category: "Info",
  description: "",

  run: async (client, message, args) => {
    let user =
      message.mentions.members?.first() ||
      message.guild?.members.cache.get(args[0]) ||
      message.member; // Definimos usuario, si mencionamos a alguien se obtendra su informacion, si no mencionamos a nadie se obtendra la informacion de "Nosotros"

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setURL(`${user?.user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setLabel("Link del avatar")
    );

    let activitiesArray: any = [];
    let activityType;
    if(!user?.user.bot && user?.presence?.activities[0] && user?.presence?.activities[0].id == "custom" && user?.presence?.activities[1]) {
    switch(user?.presence?.activities[1].type) {
      case "PLAYING":
        activityType = "Jugando a";
        break;
      case "STREAMING":
        activityType = "Transmitiendo";
        break;
      case "LISTENING":
        activityType = "Escuchando";
        break;
      case "WATCHING":
        activityType = "Viendo";
        break;
      case "COMPETING":
        activityType = "Compitiendo en";
        break;
    }
    } else if(user?.user.bot || user?.presence?.activities[0] && user?.presence?.activities[0].id !== "custom") {
          switch(user?.presence?.activities[0].type) {
      case "PLAYING":
        activityType = "Jugando a";
        break;
      case "STREAMING":
        activityType = "Transmitiendo";
        break;
      case "LISTENING":
        activityType = "Escuchando";
        break;
      case "WATCHING":
        activityType = "Viendo";
        break;
      case "COMPETING":
        activityType = "Compitiendo en";
        break;
    }
    }

    let estado = "Sin estado"
    if(user?.presence?.activities[0]) {
 estado = `${user.presence.activities[0].state || "Sin estado"}`
}

    let final;
    if(!user?.user.bot && user?.presence?.activities[0] && user?.presence?.activities[0].id == "custom") {
    if(activityType == "Jugando a") {
      final = `${activityType} ${user.presence.activities[1].name}`;
    } else if(activityType == "Transmitiendo") {
      if(!user.user.bot && user.presence.activities[1].url) {
      final = `${activityType} en Twitch\nLink: [\`Stream\`](${user.presence.activities[1].url})`
      } else {
        final = `${activityType} en Twitch`
      }
    } else if(activityType == "Escuchando") {
      if(user.presence.activities[1].name == "Spotify") {
      final = `\`Escuchando Spotify\nNombre: ${user.presence.activities[1].details}\nArtista: ${user.presence.activities[1].state}\n` + `Link:\`[\`Click Aquí\`](https://open.spotify.com/track/${user.presence.activities[0].syncId})`;
      } else {
        final = `Èscuchando ${user.presence.activities[1].name}`;
      }
    } else if(activityType == "Viendo") {
      final = `Viendo ${user.presence.activities[1].name}`;
    } else if(activityType == "Compitiendo en") {
      final = `Compitiendo en ${user.presence.activities[1].name}`;
    }
    } else if(user?.user.bot || user?.presence?.activities[0] && user?.presence?.activities[0].id !== "custom") {
      if(activityType == "Jugando a") {
      final = `${activityType} ${user.presence?.activities[0].name}`;
    } else if(activityType == "Transmitiendo") {
      if(!user.user.bot && user?.presence?.activities[0].url) {
      final = `${activityType} en Twitch\nLink: [\`Stream\`](${user.presence.activities[0].url})`
      } else {
        final = `${activityType} en Twitch`
      }
    } else if(activityType == "Escuchando") {
      if(user?.presence?.activities[0].name == "Spotify") {
      final = `\`Escuchando Spotify\nNombre: ${user.presence.activities[0].details}\nArtista: ${user.presence.activities[0].state}\n` + `Link: \`[\`Click Aquí\`](https://open.spotify.com/track/${user.presence.activities[0].syncId})`;
      } else {
        final = `\`Escuchando ${user.presence?.activities[0].name}\``;
      }
    } else if(activityType == "Viendo") {
      final = `Viendo ${user?.presence?.activities[0].name}`;
    } else if(activityType == "Compitiendo en") {
      final = `Compitiendo en ${user?.presence?.activities[0].name}`;
    }
    } 
    let status; // Hacemos un let vacio
    switch (
      user?.presence?.status // Hacemos un switch de la funcion Presencia
    ) {
      case "online": // En el caso online..
        status = "🟢 En linea"; // hacemos que el status online pase a decir lo siguiente...
        break;
      case "dnd": // En el caso dnd..
        status = "⛔ No molestar"; // hacemos que el status dnd pase a decir lo siguiente...
        break;
      case "idle": // En el caso idle..
        status = "🌙 Ausente"; // hacemos que el status idle pase a decir lo siguiente...
        break;
      case "offline": // En el caso offline..
        status = "⚪ Desconectado"; // hacemos que el status offline pase a decir lo siguiente...
        break;
    }

    const embed = new MessageEmbed() // Hacemos un nuevo embed
      .setTitle(`Informacion del usuario ${user?.user.username}`) // Titulo - Recibimos el "user" y decimos su "username"
      .setColor(`WHITE`) // Color para hacerlo mas bonito <3
      .setThumbnail(user?.user.displayAvatarURL({ dynamic: true })) // Un Thumbnail de la foto de perfil del "user".
      .addFields(
        // Hacemos nuevas Fields
        {
          name: "Username: ",
          value: `\`${user?.user.username}\``,
          inline: false
        },
        {
          name: "Nickname: ", // Nombre - Titulo - Caso 1
          value: user?.nickname ? `\`${user.nickname}\`` : "\`No tiene apodo\`", // En linea: SI
          inline: false
        },
        {
          name: "#️⃣ Tag: ", // Nombre - Titulo - Caso 1
          value: `\`#${user?.user.discriminator}\``, // En linea: SI
          inline: false
        },
        {
          name: "🆔 ID: ", // Nombre - Titulo - Caso 1
          value: `\`${user?.user.id}\``, // Del "user" sacamos su ID
          inline: false
        },
        {
          name: "Avatar: ", // Nombre - Titulo - Caso 1
          value: `[\`Click Aquí\`](${user?.user.displayAvatarURL({ dynamic: true, size: 4096 })})`, // Del "user" obtenemos su Avatar Link, Hacemos que dentro del Array se encuentre el Link y cuando se de Click te reenviara una pagina viendo el avatar del "user"
          inline: false
        },
        {
          name: "Status actual: ", // Nombre - Titulo - Caso 1
          value: user?.presence?.status ? `\`${status}\`` : "\`⚪ Desconectado\`", // Acá se obtiene el estado del "user" con los casos ya dichos y explicado anteriormente.
          inline: false, // En linea: SI
        },
        {
          name: "Estado: ", // Nombre - Titulo - Caso 1
          value: user?.presence?.activities[0].state
            ? `\`${estado}\``
            : "\`Sin estado\`", // Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
            inline: false,
        },
        {
          name: "Actividad actual",
          value: activityType ? `${final || "No hay información sobre la actividad de este usuario"}` : "No hay información sobre la actividad de este usuario"
        },
        {
          name: "Fecha de creación de la cuenta: ", // Nombre - Titulo - Caso 1
          value: `\`${user?.user.createdAt.toLocaleDateString("es-co")}\``, // Del "user" obtenemos su Fecha de creacion y hacemos que el dato local sea a ES-PE, Esto va en codigo segun por lenguaje - EJEMPLOS: es = español , en = english
          inline: false, // En linea: SI
        },
        {
          name: "Fecha de entrada al server: ", // Nombre - Titulo - Caso 1
          value: `\`${user?.joinedAt?.toLocaleDateString("es-co")}\``, // En linea: SI
          inline: false
        },
        {
          name: "Roles del usuario: ", // Nombre - Titulo - Caso 1
          value: user?.roles.cache.map((role) => role.toString()).join(" ") // En linea: SI
        },
        // {
        //   name: "Permisos del usuario: ",
        //   value: user?.permissions.toArray().map(perm => perm.toString()).join(", ")
        // }
      );

    try {
      message.reply({ embeds: [embed], components: [row] }); // Y enviamos el mensaje
    } catch (err) {
      console.log(err);
    }
  },
};
