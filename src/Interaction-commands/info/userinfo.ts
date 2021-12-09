import {
  Client,
  CommandInteraction,
  MessageEmbed,
  TextChannel,
  MessageActionRow,
  MessageButton,
  GuildMember
} from "discord.js";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "userinfo",
  description: "Muestra información detallada sobre ti o un usuario, si lo elegiste.",
  options: [
    {
      name: "user",
      description: "Para ver la información de un usuario especifico.",
      type: "",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client, interaction) => {

let user = interaction.options.getMember("user") as GuildMember;
if(!user) {
  user = interaction.member as GuildMember;
}

    const row = new MessageActionRow().addComponents(
      new MessageButton()
        .setStyle("LINK")
        .setURL(`${user?.user.displayAvatarURL({ dynamic: true, size: 4096 })}`)
        .setLabel("Link del avatar")
    );

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
          value: user?.presence?.activities[0]
            ? `\`${user.presence.activities[0].state}\``
            : "\`Sin estado\`", // Si el "user" tiene actividad se envia, si no la tiene se envia "Sin Estado"
            inline: false,
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
      interaction.followUp({ embeds: [embed], components: [row] }); // Y enviamos el mensaje
    } catch (err) {
      console.log(err);
    }


  },
};