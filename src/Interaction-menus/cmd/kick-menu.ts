import {
  Client,
  ContextMenuInteraction,
  Guild,
  MessageEmbed,
  GuildMember,
} from "discord.js";
import Klar from "../../Client";
import { interactionMenu } from "../../Interfaces";
export const InteractionMenu: interactionMenu = {
  name: "Expulsar este usuario",
  type: "USER",
  /**
   *
   * @param {Client} client
   * @param {ContextMenuInteraction} interaction
   * @param {String[]} args
   */
  run: async (client: Klar, interaction: ContextMenuInteraction) => {
    const targetUser = interaction.options.getUser("user", true);
    const target = await interaction.guild?.members.fetch(targetUser.id);
    let thisServer = interaction.guild as Guild;
    const guildOwner = (await thisServer.fetchOwner()).user.id;

    if (!(interaction.member as GuildMember).permissions.has("KICK_MEMBERS")) {
      return interaction.followUp({
        content: "No puedes realizar está acción por falta de permisos",
        ephemeral: true,
      });
    }

    if (target?.id === guildOwner && target.id === interaction.user.id) {
      return interaction.followUp({
        content:
          "No te puedes expulsar a ti mismo, además tu eres el dueño del servidor.",
        ephemeral: true,
      });
    }
    if (target?.id === interaction.user.id) {
      return interaction.followUp({
        content: "No puedes expulsarte a ti mismo.",
        ephemeral: true,
      });
    }
    if (target?.id === guildOwner) {
      return interaction.followUp({
        content: "No puedes expulsar al dueño del servidor.",
        ephemeral: true,
      });
    }
    if (!interaction.guild?.me?.permissions.has("KICK_MEMBERS")) {
      return interaction.followUp({
        content:
          "No tengo el permiso para expulsar miembros, así que no se puede usar ese comando.",
        ephemeral: true,
      });
    }
    if (!(interaction.member as GuildMember).permissions.has("KICK_MEMBERS")) {
      return interaction.followUp({
        content: "No tienes el permiso para **Expulsar miembros**.",
        ephemeral: true,
      });
    }
    if (client.user?.id === target?.id) {
      return interaction.followUp({ content: "XDn't", ephemeral: true });
    }
    /*             if (interaction.member.roles <= target.roles.highest.position) {
                       return interaction.followUp({content: 'No puedes expulsar a una persona con un mayor o igual rango que tú.', ephemeral: true})
            } */
    if (!targetUser?.bot) {
      target?.kick();
      interaction.followUp({
        content: `El usuario **${target}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}`,
        ephemeral: false,
      });
    }
    if (targetUser?.bot) {
      try {
        target?.kick();
      } catch (err: any) {
        console.log(err);
        let errmsg = new MessageEmbed()
          .setTitle("Ha ocurrido un error")
          .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
          .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
          .setFooter("Tipico")
          .setTimestamp()
          .setColor("WHITE");
      }

      interaction.followUp({
        content: `El bot **${target}** ha sido Expulsado.\nModerador: ${interaction.user.toString()}`,
        ephemeral: false,
      });
    }
  },
};
