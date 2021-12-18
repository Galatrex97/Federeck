import { Message, MessageEmbed } from "discord.js";
import Klar from "../../client";

 import { Command } from "../../interfaces";

export const command: Command = {
    name: "left",
    description: "Muestra los servidores restantes para la verificación",
    category: "Misceláneo",
    cooldown: 5,
    usage: "left",
    aliases: [],

    async run(client: Klar, message: Message, args: String[]) {

let si = (75-client.guilds.cache.size);

        let embed = new MessageEmbed()
        .setTitle("Servidores restantes")
        .setColor("WHITE")
        .setTimestamp()

if(si > 75) {
    embed.setDescription("Hemos sobrepasado la meta para solicitar mi verificación.")
    embed.setFooter("Lo hemos logrado, gracias a todos.")
} else if (si === 75) {
    embed.setDescription("Hemos alcanzado la meta, tenemos los 75. Ya puedo solicitar mi verificación.")
    embed.setFooter("Gracias a todos, no lo hubiera logrado sin ustedes.")
} else {
    embed.setDescription(`Faltan \`${si} servidores\` para solicitar mi verificación`)
    embed.setFooter("Ya casi")
}

message.reply({ embeds: [embed], allowedMentions: { repliedUser: false } })

    }
}