import { Message, MessageEmbed, MessageActionRow, MessageSelectMenu, MessageAttachment } from "discord.js";
import { Command } from "../../Interfaces";

export const command: Command = {
  name: "intents",
  aliases: [],
  category: "Útil",
  usage: "intents",
  description: "Calcula los intents que necesitarás",

  run: async(client, message, args) => {

    const row = new MessageActionRow().addComponents(
        new MessageSelectMenu()
        .setCustomId("intents_menu")
        .setPlaceholder("Selecciona tus intents aqui")
        .setMaxValues(15)
        .addOptions([
            {
                label: "Guilds",
                description: "Intent de los servidores, desbloquea 15 eventos, puedes verlos arriba.",
                value: "guilds"
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
                value: "guild_emojis_and_stickers"
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



        let values = {
            "guilds": 1,
            "guild_members": 2,
            "guild_bans": 4,
            "guild_emojis_and_stickers": 8,
            "guild_integrations": 16,
            "guild_webhooks": 32,
            "guild_invites": 64,
            "guild_voice_states": 128,
            "guild_presences": 256,
            "guild_messages": 512,
            "guild_message_reactions": 1024,
            "guild_message_typings": 2048,
            "direct_messages": 4096,
            "direct_message_reactions": 8192,
            "direct_message_typings": 16384,
            "guild_scheduled_events": 65536
        };
        let events = {
            "default": [
                "ready",
                "resumed",
                "voiceServerUpdate",
                "userUpdate",
                "applicationCommandCreate",
                "applicationCommandUpdate",
                "applicationCommandDelete",
                "interactionCreate"
            ],
            "guilds":[
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
                "stageInstanceDelete"
            ],
            "guild_members": [
                "guildMemberAdd",
                "guildMemberUpdate",
                "guildMemberRemove",
                "ThreadMembersUpdate (con GUILDS intent)"
            ],
            "guild_bans": [
                "guildBanAdd",
                "guildBanRemove"
            ],
            "guild_emojis_and_stickers": [
                "guildEmojisUpdate",
                "guildStickersUpdate"
            ],
            "guild_integrations": [
                "guildIntegrationsUpdate",
                "integrationCreate",
                "integrationUpdate",
                "integrationDelete"
            ],
            "guild_webhooks": [
                "webhooksUpdate"
            ],
            "guild_invites": [
                "inviteCreate",
                "inviteDelete"
            ],
            "guild_voice_states": [
                "voiceStateUpdate"
            ],
            "guild_presences": [
                "presenceUpdate"
            ],
            "guild_messages": [
                "messageCreate (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageUpdate (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageDelete (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageDeleteBulk (Desbloqueable también con DIRECT_MESSAGES intent)"
            ],
            "guild_message_reactions": [
                "messageReactionAdd (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageReactionRemove (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageReactionRemoveAll (Desbloqueable también con DIRECT_MESSAGES intent)",
                "messageReactionRemoveEmoji (Desbloqueable también con DIRECT_MESSAGES intent)"
            ],
            "guild_message_typings": [
                "typingStart (Desbloqueable también con DIRECT_MESSAGES intent)"
            ],
            "direct_messages": [
                "messageCreate (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageUpdate (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageDelete (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageDeleteBulk (Desbloqueable también con GUILD_MESSAGES intent)"
            ],
            "direct_message_reactions": [
                "messageReactionAdd (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageReactionRemove (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageReactionRemoveAll (Desbloqueable también con GUILD_MESSAGES intent)",
                "messageReactionRemoveEmoji (Desbloqueable también con GUILD_MESSAGES intent)"
            ],
            "direct_message_typings": [
                "typingStart (Desbloqueable también con GUILD_MESSAGES intent)"
            ],
            "guild_scheduled_events": [
                "guildScheduledEventCreate",
                "guildScheduledEventUpdate",
                "guildScheduledEventDelete",
                "guildScheduledEventUserAdd",
                "guildScheduledEventUserRemove"
            ]
        }
let embed = new MessageEmbed()
.setTitle("Calculadora de Intents")
.setDescription(`**Eventos que recibirás**:\n**${events.default.join("\n")}**\n\n**Tú número de intents**: 0`)
.setColor("WHITE")
.setFooter("Tienes 2 minutos para elegir tus intents")
.setTimestamp()
let m = await message.reply({ embeds: [embed], components: [row] });

const collector = m.createMessageComponentCollector({ time: 120000, componentType: "SELECT_MENU" });

collector.on("collect", async(interaction) => {
    interaction.deferUpdate();
    let main = 0;
    let finalEvent;
    for(let i = 0; i < interaction.values.length; i++) {
        let intent = interaction.values[i];
        let integer = parseInt(values[intent]);
        main = main + integer;
    }

    if(interaction.values.length >= 2) {
    for(let i = 0; i < interaction.values.length - 1; i++) {
        let intents = interaction.values[i];
        finalEvent = events[intents].join("\n") + finalEvent;
    }
    } else {
        for(let i = 0; i < interaction.values.length; i++) {
            let intents = interaction.values[i];
            finalEvent = events[intents].join("\n") + finalEvent;
        }
    }

    embed.setDescription(`**Eventos que recibirás**:\n**${events.default.join("\n") +"\n"+ finalEvent}**\n\n**Tú número de intents**: ${main}`);
    m.edit({ embeds: [embed] });

})

  },
};