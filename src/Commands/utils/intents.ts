import {
  Message,
  MessageEmbed,
  MessageActionRow,
  MessageSelectMenu,
  MessageAttachment,
  MessageButton,
} from "discord.js";
import BaseCommand from "../../Structures/Command";
import Lyon from "../../Client";
export default class IntentsMenuCommand extends BaseCommand {
  constructor() {
    super({
      name: "intents",
      aliases: [],
      description:
        "Calcula los intents que vas a necesitar para tu Client (bot) de Discord",
      usage: "intents",
      category: "Útil",
      cooldown: 27,
      botPerms: ["SEND_MESSAGES"],
      userPerms: [],
      devOnly: false,
      guildOnly: false,
    });
  }

  /**
   *
   * @param { Lyon } client
   * @param { Message } message
   * @param { String[] } args
   */

  run = async (client: Lyon, message: Message, args) => {
    let menuRow = new MessageActionRow().addComponents(
      new MessageSelectMenu()
        .setCustomId("intents_menu")
        .setPlaceholder("Selecciona tus intents aquí")
        .setMaxValues(16)
        .addOptions([
          {
            label: "Guilds",
            description:
              "Intent de los servidores, desbloquea 15 eventos, puedes verlos arriba.",
            value: "guilds",
          },
          {
            label: "Guild Members",
            description:
              "(Privilegiado) Intent de los miembros de los servidores, desbloquea 4 eventos, puedes verlos arriba.",
            value: "guild_members",
          },
          {
            label: "Guild Bans",
            description:
              "Intent de los baneos de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
            value: "guild_bans",
          },
          {
            label: "Guild Emojis and Stickers",
            description:
              "Intent de los emojis y stickers de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
            value: "guild_emojis_and_stickers",
          },
          {
            label: "Guild Integrations",
            description:
              "Intent de las integraciones de los servidores, desbloquea 1 evento, puedes verlo arriba.",
            value: "guild_integrations",
          },
          {
            label: "Guild Webhooks",
            description:
              "Intent de las webhooks de un servidor, desbloquea 1 evento, puedes verlo arriba.",
            value: "guild_webhooks",
          },
          {
            label: "Guild Invites",
            description:
              "Intent de las invites de un servidor, desbloquea 2 eventos, puedes verlos arriba.",
            value: "guild_invites",
          },
          {
            label: "Guild Voice States",
            description:
              "Intent de los estados de actividad de voz, desbloquea 1 evento, puedes verlo arriba.",
            value: "guild_voice_states",
          },
          {
            label: "Guild Presences",
            description:
              "(Privilegiado) Intent de las presencias de un usuario, desbloquea 1 evento, puedes verlo arriba.",
            value: "guild_presences",
          },
          {
            label: "Guild Messages",
            description:
              "(Privilegiado en 2022) Intent de los mensajes, desbloquea 4 eventos, puedes verlos arriba.",
            value: "guild_messages",
          },
          {
            label: "Guild Message Reactions",
            description:
              "Intent de las reacciones de un mensaje, desbloquea 4 eventos, puedes verlos arriba.",
            value: "guild_message_reactions",
          },
          {
            label: "Guild Message Typings",
            description:
              'Intent del estado "Escribiendo", desbloquea 1 evento, puedes verlo arriba.',
            value: "guild_message_typings",
          },
          {
            label: "Direct Messages",
            description:
              "Intent de los mensajes directos, puedes revisar arriba.",
            value: "direct_messages",
          },
          {
            label: "Direct Message Reactions",
            description:
              "Intent de las reacciones de un mensaje directo, puedes revisar arriba.",
            value: "direct_message_reactions",
          },
          {
            label: "Direct Message Typings",
            description: 'Intent de "Escribiendo", puedes revisar arriba.',
            value: "direct_message_typings",
          },
          {
            label: "Guild Scheduled Events",
            description:
              "Intent de los eventos programados de un servidor, desbloquea 5 eventos, puedes verlos arriba.",
            value: "guild_scheduled_events",
          },
        ])
    );

    let btnRow = new MessageActionRow().addComponents(
      new MessageButton()
        .setCustomId("clear_int")
        .setDisabled(true)
        .setLabel("Clear Intents")
        .setStyle("SECONDARY")
    );

    let values = {
      guilds: 1,
      guild_members: 2,
      guild_bans: 4,
      guild_emojis_and_stickers: 8,
      guild_integrations: 16,
      guild_webhooks: 32,
      guild_invites: 64,
      guild_voice_states: 128,
      guild_presences: 256,
      guild_messages: 512,
      guild_message_reactions: 1024,
      guild_message_typings: 2048,
      direct_messages: 4096,
      direct_message_reactions: 8192,
      direct_message_typings: 16384,
      guild_scheduled_events: 65536,
    };
    let events = {
      default: [
        "ready",
        "resumed",
        "voiceServerUpdate",
        "userUpdate",
        "applicationCommandCreate",
        "applicationCommandUpdate",
        "applicationCommandDelete",
        "interactionCreate",
      ],
      guilds: [
        "guildCreate",
        "guildUpdate",
        "guildDelete",
        "guildRoleCreate",
        "guildRoleUpdate",
        "guildRoleDelete",
        "channelCreate",
        "channelUpdate",
        "channelDelete",
        "channelPinsUpdate",
        "threadCreate",
        "threadUpdate",
        "threadDelete",
        "threadListSync",
        "threadMemberUpdate",
        "threadMembersUpdate (con GUILD_MEMBERS intent)",
        "stageInstanceCreate",
        "stageInstanceUpdate",
        "stageInstanceDelete\n",
      ],
      guild_members: [
        "guildMemberAdd",
        "guildMemberUpdate",
        "guildMemberRemove",
        "ThreadMembersUpdate (con GUILDS intent)\n",
      ],
      guild_bans: ["guildBanAdd", "guildBanRemove\n"],
      guild_emojis_and_stickers: ["guildEmojisUpdate", "guildStickersUpdate\n"],
      guild_integrations: [
        "guildIntegrationsUpdate",
        "integrationCreate",
        "integrationUpdate",
        "integrationDelete\n",
      ],
      guild_webhooks: ["webhooksUpdate\n"],
      guild_invites: ["inviteCreate", "inviteDelete\n"],
      guild_voice_states: ["voiceStateUpdate\n"],
      guild_presences: ["presenceUpdate\n"],
      guild_messages: [
        "messageCreate",
        "messageUpdate",
        "messageDelete",
        "messageDeleteBulk\n",
      ],
      guild_message_reactions: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji\n",
      ],
      guild_message_typings: ["typingStart\n"],
      direct_messages: [
        "messageCreate",
        "messageUpdate",
        "messageDelete",
        "messageDeleteBulk\n",
      ],
      direct_message_reactions: [
        "messageReactionAdd",
        "messageReactionRemove",
        "messageReactionRemoveAll",
        "messageReactionRemoveEmoji\n",
      ],
      direct_message_typings: ["typingStart\n"],
      guild_scheduled_events: [
        "guildScheduledEventCreate",
        "guildScheduledEventUpdate",
        "guildScheduledEventDelete",
        "guildScheduledEventUserAdd",
        "guildScheduledEventUserRemove\n",
      ],
    };

    let embed = new MessageEmbed()
      .setTitle("Calculadora de Intents")
      .setDescription(
        `**Eventos que recibirás**:\n\n**${events.default.join(
          "\n"
        )}**\n\n**Tu número de intents**: 0`
      )
      .setColor("WHITE")
      .setFooter("Tienes 2 minutos para elegir tus intents")
      .setTimestamp();
    let iEmbed = new MessageEmbed()
      .setTitle("Calculadora de Intents")
      .setDescription(
        `**Eventos que recibirás**:\n\n**${events.default.join(
          "\n"
        )}**\n\n**Tu número de intents**: 0`
      )
      .setColor("WHITE")
      .setFooter("Tienes 2 minutos para elegir tus intents")
      .setTimestamp();
    let m = await message.reply({
      embeds: [embed],
      components: [menuRow, btnRow],
    });
    const menuCollector = m.createMessageComponentCollector({
      time: 120000,
      componentType: "SELECT_MENU",
    });
    const btnCollector = m.createMessageComponentCollector({
      time: 120000,
      componentType: "BUTTON",
    });
    menuCollector.on("collect", async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        return interaction.reply({
          content: `${interaction.user} no puedes interactuar con el menú de otro usuario.`,
          ephemeral: true,
        });
      }

      interaction.deferUpdate();

      let main = 0;
      let finalEvent = "";
      for (let i = 0; i < interaction.values.length; i++) {
        let intent = interaction.values[i];
        let integer = parseInt(values[intent]);
        main += integer;
      }

      for (let i = 0; i < interaction.values.length; i++) {
        let intents = interaction.values[i];
        finalEvent += events[intents].join("\n");
      }

      let finalEvents: any = [];
      let array = finalEvent.split("\n");
      array.forEach((x) => {
        if (finalEvents.includes(x) && x !== "threadMembersUpdate") return;
        finalEvents.push(x);
      });

      btnRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("clear_int")
          .setDisabled(false)
          .setLabel("Clear Intents")
          .setStyle("SECONDARY")
      );

      finalEvents = finalEvents.join("\n");
      embed.setDescription(
        `**Eventos que recibirás**:\n\n**${
          events.default.join("\n") + "\n" + finalEvents
        }**\n**Tú número de intents**: ${main}`
      );
      m.edit({ embeds: [embed], components: [menuRow, btnRow] });
    });

    menuCollector.on("end", async (collected) => {
      menuRow = new MessageActionRow().addComponents(
        new MessageSelectMenu()
          .setCustomId("intents_menu")
          .setPlaceholder("Selecciona tus intents aqui")
          .setMaxValues(16)
          .addOptions([
            {
              label: "Guilds",
              description:
                "Intent de los servidores, desbloquea 15 eventos, puedes verlos arriba.",
              value: "guilds",
            },
            {
              label: "Guild Members",
              description:
                "(Privilegiado) Intent de los miembros de los servidores, desbloquea 4 eventos, puedes verlos arriba.",
              value: "guild_members",
            },
            {
              label: "Guild Bans",
              description:
                "Intent de los baneos de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
              value: "guild_bans",
            },
            {
              label: "Guild Emojis and Stickers",
              description:
                "Intent de los emojis y stickers de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
              value: "guild_emojis_and_stickers",
            },
            {
              label: "Guild Integrations",
              description:
                "Intent de las integraciones de los servidores, desbloquea 1 evento, puedes verlo arriba.",
              value: "guild_integrations",
            },
            {
              label: "Guild Webhooks",
              description:
                "Intent de las webhooks de un servidor, desbloquea 1 evento, puedes verlo arriba.",
              value: "guild_webhooks",
            },
            {
              label: "Guild Invites",
              description:
                "Intent de las invites de un servidor, desbloquea 2 eventos, puedes verlos arriba.",
              value: "guild_invites",
            },
            {
              label: "Guild Voice States",
              description:
                "Intent de los estados de actividad de voz, desbloquea 1 evento, puedes verlo arriba.",
              value: "guild_voice_states",
            },
            {
              label: "Guild Presences",
              description:
                "(Privilegiado) Intent de las presencias de un usuario, desbloquea 1 evento, puedes verlo arriba.",
              value: "guild_presences",
            },
            {
              label: "Guild Messages",
              description:
                "(Privilegiado en 2022) Intent de los mensajes, desbloquea 4 eventos, puedes verlos arriba.",
              value: "guild_messages",
            },
            {
              label: "Guild Message Reactions",
              description:
                "Intent de las reacciones de un mensaje, desbloquea 4 eventos, puedes verlos arriba.",
              value: "guild_message_reactions",
            },
            {
              label: "Guild Message Typings",
              description:
                'Intent "Escribiendo", desbloquea 1 evento, puedes verlo arriba.',
              value: "guild_message_typings",
            },
            {
              label: "Direct Messages",
              description:
                "Intent de los mensajes directos, puedes revisar arriba.",
              value: "direct_messages",
            },
            {
              label: "Direct Message Reactions",
              description:
                "Intent de las reacciones de un mensaje directo, puedes revisar arriba.",
              value: "direct_message_reactions",
            },
            {
              label: "Direct Message Typings",
              description: 'Intent de "Escribiendo", puedes revisar arriba.',
              value: "direct_message_typings",
            },
            {
              label: "Guild Scheduled Events",
              description:
                "Intent de los eventos programados de un servidor, desbloquea 5 eventos, puedes verlos arriba.",
              value: "guild_scheduled_events",
            },
          ])
          .setDisabled(true)
      );

      m.edit({ components: [menuRow, btnRow] });
    });

    btnCollector.on("collect", async (interaction) => {
      if (interaction.user.id !== message.author.id) {
        message.reply("No puedes interactuar con un botón que no es tuyo");
        return;
      }
      interaction.deferUpdate();

      btnRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("clear_int")
          .setDisabled(true)
          .setLabel("Clear Intents")
          .setStyle("SECONDARY")
      );

      if (interaction.customId == "clear_int") {
        m.edit({ embeds: [iEmbed], components: [menuRow, btnRow] });
      }
    });

    btnCollector.on("end", (collected) => {
      btnRow = new MessageActionRow().addComponents(
        new MessageButton()
          .setCustomId("clear_int")
          .setDisabled(true)
          .setLabel("Clear Intents")
          .setStyle("SECONDARY")
      );

      m.edit({ components: [menuRow, btnRow] });
    });
  };
}
