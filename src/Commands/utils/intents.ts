import { Message, MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "intents",
  aliases: [],
  category: "Útil",
  usage: "intents",
  description: "Calcula los intents que necesitarás",

  run: (client, message, args) => {

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("intents_menu")
        .setPlaceholder("Selecciona tus intents aqui")
        .setMaxValues(15)
        .addOptions([
            {
                label: "Guilds",
                description: "Intent de los servidores, desbloquea 15 eventos, puedes verlos arriba.",
                value: "guilds_intent"
            },
            {
                label: "Guild Members",
                description: "(Privilegiado) Intent de los miembros de los servidores, desbloquea 4 eventos, puedes verlos arriba.",
                value: "guild_members"
            },
            {
                label: "Guild Bans",
                description: "Intent de los baneos de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
                value: "guild_bans"
            },
            {
                label: "Guild Emojis and Stickers",
                description: "Intent de los emojis y stickers de los servidores, desbloquea 2 eventos, puedes verlos arriba.",
                value: "guild_emojis_and_stikers"
            },
            {
                label: "Guild Integrations",
                description: "Intent de las integraciones de los servidores, desbloquea 1 evento, puedes verlo arriba.",
                value: "guild_integrations"
            },
            {
                label: "Guild Webhooks",
                description: "Intent de las webhooks de un servidor, desbloquea 1 evento, puedes verlo arriba.",
                value: "guild_webhooks"
            },
            {
                label: "Guild Voice States",
                description: "Intent de los estados de actividad de voz, desbloquea 1 evento, puedes verlo arriba.",
                value: "guild_voice_states"
            },
            {
                label: "Guild Presences",
                description: "(Privilegiado) Intent de las presencias de un usuario, desbloquea 1 evento, puedes verlo arriba.",
                value: "guild_presences"
            },
            {
                label: "Guild Messages",
                description: "(Privilegiado en 2022) Intent de los mensajes, desbloquea 4 eventos, puedes verlos arriba.",
                value: "guild_messages"
            },
            {
                label: "Guild Message Reactions",
                description: "Intent de las reacciones de un mensaje, desbloquea 4 eventos, puedes verlos arriba.",
                value: "guild_message_reactions"
            },
            {
                label: "Guild Message Typings",
                description: "Intent \"Escribiendo\", desbloquea 1 evento, puedes verlo arriba.",
                value: "guild_message_typings"
            },
            {
                label: "Direct Messages",
                description: "Intent de los mensajes directos, puedes revisar arriba.",
                value: "direct_messages"
            },
            {
                label: "Direct Message Reactions",
                description: "Intent de las reacciones de un mensaje directo, puedes revisar arriba.",
                value: "direct_message_reactions"
            },
            {
                label: "Direct Message Typings",
                description: "Intent de \"Escribiendo\", puedes revisar arriba.",
                value: "direct_message_typings"
            },
            {
                label: "Guild Scheduled Events",
                description: "Intent de los eventos programados de un servidor, desbloquea 5 eventos, puedes verlos arriba.",
                value: "guild_scheduled_events"
            }
        ])
    );

let embed = new MessageEmbed()
.setTitle("Calculadora de Intents")
.setColor("WHITE")
.setTimestamp()

        let valu = {
            "guilds_intent": 1,
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
            direct_messages_reactions: 8192,
            direct_messages_typings: 16384,
            guild_scheduled_events: 65536
        };

const collector = message.channel.createMessageComponentCollector();

collector.on("collector", async(interaction) => {
   message.edit({ content: `${interaction.values}` })
})
message.reply({ embeds: [embed], components: [row] })

  },
};