import {
  Client,
  CommandInteraction,
  Guild,
  GuildMember,
  MessageEmbed,
  User,
} from "discord.js";
import Klar from "../../Client";
import { interactionCommand } from "../../Interfaces";
export const Interaction: interactionCommand = {
  name: "kick",
  description: "Expulsa a alguien del servidor",
  options: [
    {
      name: "user",
      description: "Usuario a expulsar",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Razón de la expulsión",
      type: "STRING",
      required: false,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: CommandInteraction) => {
    let si = interaction.member as GuildMember;

    let user = interaction.options.getUser("user") as User;

    let xd = interaction.options.getString("reason") as string;

    let guild = interaction.guild as Guild;

    const member =
      interaction.guild?.members.cache.get(user?.id) ||
      ((await interaction.guild?.members
        .fetch(user.id)
        .catch((err) => {})) as GuildMember);

    const owner = (await guild.fetchOwner()).user.id;

    if (!si.permissions.has("KICK_MEMBERS")) {
      return interaction.reply({
        content: "No puedes realizar esta acción por falta de permisos",
        ephemeral: true,
      });
    }

    if (!interaction.guild?.me?.permissions.has("KICK_MEMBERS")) {
      return interaction.reply({
        content:
          "No tengo el permiso para expulsar miembros, así que no se puede usar ese comando.",
        ephemeral: true,
      });
    }

    if (user.id === owner && user.id === interaction.user.id) {
      return interaction.reply({
        content:
          "No te puedes expulsar a ti mismo, además tu eres el dueño del servidor.",
        ephemeral: true,
      });
    }

    if (user.id === interaction.user.id) {
      return interaction.reply({
        content:
          "No puedes expulsarte a ti mismo ||A no ser que abandones el servidor||",
        ephemeral: true,
      });
    }
    if (user.id === owner) {
      return interaction.reply({
        content: "No puedes expulsar al dueño del servidor.",
        ephemeral: true,
      });
    }

    if (client.user?.id === member?.id) {
      return interaction.reply({ content: "XDn't", ephemeral: true });
    }
    /*    if (interaction.member.roles.highest.position <= member.roles.highest.position) {
                   return interaction.reply({content: 'No puedes expulsar a una persona con un mayor o igual rango que tú.', ephemeral: true})
        } */
    if (!user.bot) {
      try {
        member.kick(xd);
        interaction.reply({
          content: `El usuario **${user}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}\nRazón: **${
            xd ? xd : "No se dió una razón"
          }**`,
          ephemeral: false,
        });
      } catch (err: any) {
        console.log(err);
      }
    } else if (user.bot) {
      try {
        member.kick(xd);
      } catch (err: any) {
      }

      interaction.reply({
        content: `El bot **${user}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}\nRazón: **${
          xd ? xd : "No se dió una razón"
        }**`,
        ephemeral: false,
      });
    }
  },
};
