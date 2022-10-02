export const myMention = new RegExp(`^<@!?849395994973700117>( |)$`); //Acá tenemos una expresión regular (o regex) de menciones hacia mi, esto nos sirve para responder cuando nos mencionan.

export let pacmansReplies = [
    //Un array que contiene las respuestas a los pacmans.
    ":v",
    "#HailGrasa",
    "La grasa no muere, evoluciona...",
    "Viva la grasa",
    "En la grasa habian buenos momos :pensive:",
    "El shitposting es un pasatiempo, la grasa es un sentimiento.",
    "¿Quieres ser el : de mi v?",
  ];
  export let randomizePacmanReplies = Math.floor(
    Math.random() * pacmansReplies.length //Hacemos las respuestas randoms para más variedad.
  );

  export const randomsPacmansReplies = pacmansReplies[randomizePacmanReplies];

  export const otp = {
        deafenOnJoin: true,
        leaveOnEmpty: true,
        leaveOnEnd: true,
        leaveOnStop: true,
        timeout: 3000,
        volume: 100,
        quality: "high",
  }

  export let intents = [
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
        label: "Guild Invites",
        description: "Intent de las invites de un servidor, desbloquea 2 eventos, puedes verlos arriba.",
        value: "guild_invites"
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
]

export let values = {
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


export let events = {
  "default": [
      "ready",
      "resumed",
      "voiceServerUpdate",
      "userUpdate",
      "applicationCommandCreate",
      "applicationCommandUpdate",
      "applicationCommandDelete",
      "interactionCreate",
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
      "stageInstanceDelete\n",
  ],
  "guild_members": [
      "guildMemberAdd",
      "guildMemberUpdate",
      "guildMemberRemove",
      "ThreadMembersUpdate (con GUILDS intent)\n",
  ],
  "guild_bans": [
      "guildBanAdd",
      "guildBanRemove\n",
  ],
  "guild_emojis_and_stickers": [
      "guildEmojisUpdate",
      "guildStickersUpdate\n",
  ],
  "guild_integrations": [
      "guildIntegrationsUpdate",
      "integrationCreate",
      "integrationUpdate",
      "integrationDelete\n",
  ],
  "guild_webhooks": [
      "webhooksUpdate\n",
  ],
  "guild_invites": [
      "inviteCreate",
      "inviteDelete\n",
  ],
  "guild_voice_states": [
      "voiceStateUpdate\n",
  ],
  "guild_presences": [
      "presenceUpdate\n",
  ],
  "guild_messages": [
      "messageCreate",
      "messageUpdate",
      "messageDelete",
      "messageDeleteBulk\n",
  ],
  "guild_message_reactions": [
      "messageReactionAdd",
      "messageReactionRemove",
      "messageReactionRemoveAll",
      "messageReactionRemoveEmoji\n",
  ],
  "guild_message_typings": [
      "typingStart\n"
  ],
  "direct_messages": [
      "messageCreate",
      "messageUpdate",
      "messageDelete",
      "messageDeleteBulk\n",
  ],
  "direct_message_reactions": [
      "messageReactionAdd",
      "messageReactionRemove",
      "messageReactionRemoveAll",
      "messageReactionRemoveEmoji\n",
  ],
  "direct_message_typings": [
      "typingStart\n",
  ],
  "guild_scheduled_events": [
      "guildScheduledEventCreate",
      "guildScheduledEventUpdate",
      "guildScheduledEventDelete",
      "guildScheduledEventUserAdd",
      "guildScheduledEventUserRemove\n",
  ]
}