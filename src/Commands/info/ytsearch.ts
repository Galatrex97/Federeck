import Discord from "discord.js";
const { Client, MessageEmbed } = require("discord.js");

 import { Command } from "../../Interfaces";

export const command: Command = {
  name: "ytsearch",
  aliases: ["yt"],
  usage: 'ytsearch <args>',
  category: 'Útil',
  description: 'Busca un video en youtube',

run: (client, message, args) => {


const YouTube = require('youtube-node');
let youTube = new YouTube();

//Necesita tener una clave para usar la API de YouTube Data API v3
//video tutorial: https://www.youtube.com/watch?v=VxQPG991YUs 

youTube.setKey(process.env.youtubeApi); //Acá ponen su API-KEY

let nombreyt = args.join(" ") //Definimos: nombreyt
if(!nombreyt) return  message.reply('Que quieres buscar?'); //Si no tiene un nombre de vídeo en yt, retornar.

message.reply('<a:xdd:841332542220927016> | Buscando..!') 
.then(m => {
    youTube.search(args.join(' '), 2, function(err, result){
        if(err){
            return console.log(err); 

        }
        if(result.items[0]["id"].videoId == undefined){
            return message.reply('No he encontrado un video, relacionado con tu busqueda.'); //Si el vídeo no existe, retornar

        } else{
            let link = `https://www.youtube.com/watch?v=${result.items[0]["id"].videoId}`
            m.edit(link); //Editar el mensaje ''Búscando'' por el link del vídeo

        }
    })
}).catch(error => {
    console.log(error)
    let errmsg = new (require('discord.js')).MessageEmbed()
    .setTitle('Ha ocurrido un error')
    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
    .setFooter('Tipico')
    .setColor("WHITE")
    .setTimestamp()
     
    message.channel.send("Ha ocurrido un error.")
  })
}//Cerramos código
 
 }
