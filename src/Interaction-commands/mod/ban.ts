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
  name: "ban",
  description: "Banea un usuario",
  options: [
    {
      name: "user",
      description: "Usuario a banear",
      type: "USER",
      required: true,
    },
    {
      name: "reason",
      description: "Razón del baneo",
      type: "STRING",
      required: true,
    },
  ],
  /**
   *
   * @param {Client} client
   * @param {CommandInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: CommandInteraction) => {
    let thisUser = interaction.member;
    const thisGuild = interaction.guild as Guild;
    const guildOwner: any = (await thisGuild.fetchOwner()).user.id;
    const banReason = interaction.options.getString("reason") as string;
    const userSelected = interaction.options.getUser("user") as User;
    const memberSelected: any =
      interaction.guild?.members.cache.get(userSelected.id) ||
      (await interaction.guild?.members.fetch(userSelected.id).catch((err) => {}));
    if (userSelected?.id === guildOwner && userSelected?.id === interaction.user.id) {
      return interaction.reply({
        content:
          "No te puedes banear a ti mismo, además tu eres el dueño del servidor.",
        ephemeral: true,
      });
    }
    if (memberSelected?.id === guildOwner) {
      return interaction.reply({
        content: "No puedes banear al dueño del servidor.",
        ephemeral: true,
      });
    }
    if (memberSelected?.id === interaction.user.id) {
      return interaction.reply({
        content: "No te puedes banear a ti mismo.",
        ephemeral: true,
      });
    }
    if (!interaction.guild?.me?.permissions.has("BAN_MEMBERS")) {
      return interaction.reply({
        content:
          "No tengo el permiso para banear miembros, así que no se puede usar ese comando.",
        ephemeral: true,
      });
    }
    if (!(interaction.member as GuildMember).permissions.has("BAN_MEMBERS")) {
      return interaction.reply({
        content: "No tienes el permiso para **Banear miembros**.",
        ephemeral: true,
      });
    }
    if (client.user?.id === userSelected?.id) {
      return interaction.reply({
        content: "No me puedes banear.",
        ephemeral: true,
      });
    } /*  else if (interaction.member.roles.highest.position <= member.roles.highest.position) {
		        return interaction.reply({content: 'No puedes banear a una persona con un mayor o igual rango que tú.', ephemeral: true})
	 } */
    if (!userSelected?.bot) {
      const greetingsEmbed = new MessageEmbed()
        .setTitle("Adiós.")
        .setDescription(
          `Has sido baneado de **${interaction.guild?.name}** por el Moderador: **${interaction.user.username}**.\nLa razón de tu baneo fue: **${banReason}**.`
        )
        .setTimestamp()
        .setFooter("Hasta pronto.");
      try {
        memberSelected?.ban({ reason: banReason });
        memberSelected?.send({ embeds: [greetingsEmbed] });
        interaction.reply({
          content: `El usuario **${userSelected}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`,
          ephemeral: false,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
    if (userSelected?.bot) {
      try {
        memberSelected?.ban({ reason: banReason });
        interaction.reply({
          content: `El bot **${userSelected}** ha sido Baneado.\nModerador: ${interaction.user.toString()}\nRazón: **${banReason}**`,
          ephemeral: false,
        });
      } catch (err: any) {
        console.log(err);
      }
    }
  },
};
