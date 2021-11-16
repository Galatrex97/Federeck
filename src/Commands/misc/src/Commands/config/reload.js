const Discord = require("discord.js");
const { Client, MessageEmbed, MessageActionRow, MessageButton } = require("discord.js");
const glob = require("glob");
const fs = require("fs");
 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "reload",
  aliases: [],
  usage: 'reload',
  category: 'Útil',
  description: 'Actualiza los cambios del bot, se necesita ser el desarrollador del bot',

run: (client, message, args) => {

if(message.author.id !== process.env.botOwner) return;

glob(`${__dirname}/../**/*.js`, async(err, filePaths) => {
    if(err) { 
        console.log(err)
        
        let errmsg = new (require('discord.js')).MessageEmbed()
        .setTitle('Ha ocurrido un error')
        .setDescription(`**Tengo el siguiente error:** ${err.stack}`)
        .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
        .setFooter('Tipico')
        .setColor("WHITE")
        .setTimestamp()
         

    }
    filePaths.forEach((file) => {
    delete require.cache[require.resolve(file)];

    const pull = require(file);

        if(pull.name) {
            client.commands.set(pull.name, pull);
        }

        if(pull.aliases && Array.isArray(pull.aliases)) {
            pull.aliases.forEach((alias) => {
                client.aliases.set(alias, pull.name);
            })
        }


    })
})

try {
     message.react("✅")
} catch (err) {
    console.log(err)
}

 }

}