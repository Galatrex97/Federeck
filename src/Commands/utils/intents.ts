import { Message, MessageEmbed, MessageActionRow, MessageSelectMenu } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "intents",
  aliases: [],
  category: "Útil",
  usage: "intents",
  description: "Calcula los intents que necesitarás",

  run: (client, message, args) => {

let embed = new MessageEmbed()
.setTitle("Calculadora de Intents")
.setColor("WHITE")
.setTimestamp()

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("intents_menu")
        .setPlaceholder("Selecciona tus intents aqui")
        .setMinValues(1)
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

const collector = message.channel.createMessageComponentCollector({ time: 60000, componentType: "SELECT_MENU" });

collector.on("collector", (interaction) => {
interaction.reply(`${interaction.values}`)
})
message.reply({ embeds: [embed], components: [row] })

  },
};