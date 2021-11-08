import Client from "../Client"; //Importamos el ExtendedCLient.
import { readdirSync } from "fs";
import { Command, Event, interactionCommand, interactionMenu, DistubeEvent } from "../Interfaces";
import { connect } from "mongoose";

export function runAll(client: Client) {
  //Exportamos la función runAll.

  //Commands
  readdirSync("./src/Commands/").forEach((dir) => {
    //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
    readdirSync("./src/Commands/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
      .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
      .forEach((file) => {
        //Y un forEach.
        let { command } = require(`../Commands/${dir}/${file}`); //Requerimos el comando de los comandos.
        client.commands.set((command as Command).name, command as Command);
        if(command.aliases && Array.isArray(command.aliases)) {
          command.aliases.forEach((alias: string) => client.aliases.set(alias, command.name));
        } //Y lo establecemos en el Collection.
      }); //Cerramos forEach de archivos.
  }); //Cerramos forEach de categorías

  //Events
  readdirSync("./src/Events/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
    .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
    .forEach((file) => {
      //Y un forEach.
      let { event } = require("../Events/" + file); //Requerimos el evento de los eventos.
      client.on((event as Event).name, (event as Event).run.bind(null, client)); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
    }); //Cerramos forEach.

//Distube Events
readdirSync("./src/Distube/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
.filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
.forEach((file) => {
  //Y un forEach.
  let { distubeEvent } = require("../Distube/" + file); //Requerimos el evento de los eventos.
  client.distube.on((distubeEvent as DistubeEvent).name, (distubeEvent as DistubeEvent).run.bind(null, client)); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
});

  //unhandledRejection = Básicamente esto sirve para que tu bot no se apague al instante si hay un error, sólo enviará un error a la consola, más no lo apagará.
  process.on("unhandledRejection", async (rejection: PromiseRejectedResult) => {
    //Ejecutamos el evento con el parámetro rejection.
    logReject(); //Ejecutamos la función logReject.
    function logReject() {
      //Abrimos la función
      console.log("Unhandled Rejection:", rejection); //Y enviamos a la consola el error.
      process.stdout.clearLine(1); //Eliminamos una línea de la consola.
    } //Cerramos la función.
  }); //Cerramos el evento.

//Interactions (commands)
readdirSync("./src/Interaction-commands/").forEach((dir) => {
  //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
  readdirSync("./src/Interaction-commands/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
    .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
    .forEach((file) => {
      //Y un forEach.
      let { Interaction } = require(`../Interaction-commands/${dir}/${file}`); //Requerimos el comando de los comandos.
      client.interactionz.set((Interaction as interactionCommand).name, Interaction as interactionCommand); //Y lo establecemos en el Collection.
    }); //Cerramos forEach de archivos.
}); //Cerramos

//Interactions (Menus)
readdirSync("./src/Interaction-menus/").forEach((dir) => {
  //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
  readdirSync("./src/Interaction-menus/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
    .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
    .forEach((file) => {
      //Y un forEach.
      let { InteractionMenu } = require(`../Interaction-menus/${dir}/${file}`); //Requerimos el comando de los comandos.
      client.interactiony.set((InteractionMenu as interactionMenu).name, InteractionMenu as interactionMenu); //Y lo establecemos en el Collection.
    }); //Cerramos forEach de archivos.
});

  //Mongoose
 //Cerramos catch
} //Cerramos la función exportada, runALl.
