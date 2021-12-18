import Discord, {
  Client,
  MessageEmbed,
  MessageActionRow,
  MessageButton,
  Message,
} from "discord.js";
import Klar from "../../Client";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ban-button",
  aliases: ["bban"],
  usage: "ban-button <@usuario>",
  category: "Mod",
  description: "Ban button Bv",

  run: (client: Klar, message: Message, args: String[]) => {
    const row = new MessageActionRow().addComponents(
      new MessageButton().setCustomId("yBan").setLabel("Si").setStyle("SUCCESS"),
      new MessageButton().setCustomId("nBan").setLabel("No").setStyle("DANGER")
    );

    const user = message.mentions.members?.first();

    let userX = message.member?.id;

    let mentionedUser = message.mentions.members?.first()?.id;

    if (userX === mentionedUser) {
      return message.channel.send(
        "No puedes usar este comando contigo mismo(a)."
      );
    }

    if (!user) return message.reply("Debes mencionar a alguien");

    if (!message.member?.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS"))
      return message.reply(
        "Debes tener permiso de administrador o banear miembros"
      );

    if (!message.guild?.me?.permissions.has("ADMINISTRATOR" || "BAN_MEMBERS"))
      return message.reply(
        "No puedo banear, ya que no tengo el permiso de **Banear miembros**. Para continuar, dame un rol con los permisos adecuados o modifica mis permisos actuales."
      );

    const razon = args.join(" ").slice(22);
    if (!razon) return message.reply("Debes decir una razón");

    message.reply({
      content: "Estás seguro que quieres banear a este usuario?",
      components: [row],
    });

    const filter = (interaction) => {
      if (interaction.user.id === message.author.id) return true;
      return interaction.reply({
        content: "No puedes tomar esta decisión por otra persona.",
        ephemeral: true,
      });
    };

    const collector: any = message.channel.createMessageComponentCollector({
      filter,
      max: 1,
    });

    collector.on("end", (ButtonInteraction) => {
      ButtonInteraction.first().deferUpdate();

      const id = ButtonInteraction.first().customId;
      if (id === "yBan") {
        try {
          user.ban({ reason: razon });
          message.reply(`Se ha baneado con éxito a ${user} por **${razon}**`);
        } catch (err) {
          console.log(err);
        }
      } else if (id === "nBan") {
        return message.reply("El baneo ha sido cancelado");
      }
    });
  },
};
