import Client from "../Client"; //Importamos el ExtendedCLient.
import { readdirSync } from "fs";
import {
  Command,
  Event,
  interactionCommand,
  interactionMenu,
  PlayerEvent,
} from "../Interfaces";
import { connect } from "mongoose";

export function runAll(client: Client) {
  //Exportamos la función runAll.

//Avoid crashes
process.on("unhandledRejection", async(reason, promise) => {
  console.log("------- There was an unhandled rejection at -------")
  console.log(promise)
  console.log("------- Reason -------")
  console.log(reason)
  console.log("------- End -------")
})

process.on("uncaughtException", async(error, origin) => {
  console.log("------- Error -------")
  console.log(error.stack)
  console.log("------- Exception origin -------")
  console.log(origin)
  console.log("------- End -------")
})

  //Commands
  readdirSync("./src/Commands/").forEach((dir) => {
    //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
    readdirSync("./src/Commands/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
      .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
      .forEach((file) => {
        //Y un forEach.
        let { command } = require(`../Commands/${dir}/${file}`); //Requerimos el comando de los comandos.
        client.commands.set((command as Command).name, command as Command);
        if (command.aliases && Array.isArray(command.aliases)) {
          command.aliasCs.forEach((alias: string) =>
            client.aliases.set(alias, command.name)
          );
        } //Y lo establecemos en el Collection.
      }); //Cerramos forEach de archivCs.
  }); //Cerramos forEach de categorías

  //Events
  readdirSync("./src/Events/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
    .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
    .forEach((file) => {
      //Y un forEach.
      let { event } = require("../Events/" + file); //Requerimos el evento de los eventos.
      client.on((event as Event).name, (event as Event).run.bind(null, client)); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
    }); //Cerramos forEach.E
  //Music Events
  readdirSync("./src/Player/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
    .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
    .forEach((file) => {
      //Y un forEachE
      let { dmpEvent } = require("../Player/" + file); //Requerimos el evento de los eventos.
      client.player.on(
        (dmpEvent as PlayerEvent).name,
        (dmpEvent as PlayerEvent).run.bind(null, client)
      ); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
    });

  //unhandledRejection = Básicamente esto sirve para que tu bot no se apague al instante si hay un error, sólo enviará un error a la consola, más no lo apagará.

let interactionxD: any = [];

  //Interactions (commands)

readdirSync(__dirname.replace("\Utils", "\Interaction-commands")).forEach(dir => {
  const commands = readdirSync(`${__dirname.replace("\Utils", "\Interaction-commands")}/${dir}/`).filter(file => file.endsWith(".ts"));

for(let file of commands) {
  let { Interaction } = require(`${__dirname.replace("\Utils", "\Interaction-commands")}/${dir}/${file}`);

  client.slashCommands.set((Interaction as interactionCommand).name, Interaction as interactionCommand)
interactionxD.push(Interaction as interactionCommand);


}

})

  //Interactions (Menus)
  readdirSync(__dirname.replace("\Utils", "\Interaction-menus")).forEach(dir => {
    const commands = readdirSync(`${__dirname.replace("\Utils", "\Interaction-menus")}/${dir}/`).filter(file => file.endsWith(".ts"));
  
  for(let file of commands) {
    let { InteractionMenu } = require(`${__dirname.replace("\Utils", "\Interaction-menus")}/${dir}/${file}`);
  
    client.contextMenus.set((InteractionMenu as interactionMenu).name, InteractionMenu as interactionMenu)
  interactionxD.push(InteractionMenu as interactionMenu);


  }
  
  })

      client.on("ready", async() => {
    await client.application?.commands.set(interactionxD)
  })


  //Mongoose
  //Cerramos catch
} //Cerramos la función exportada, runALl.
