"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
exports.runAll = void 0;
const fs_1 = require("fs");
const mongoose_1 = require("mongoose");
function runAll(client) {
    //Exportamos la función runAll.
    //Commands
    (0, fs_1.readdirSync)("./src/Commands/").forEach((dir) => {
        //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
        (0, fs_1.readdirSync)("./src/Commands/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
            .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
            .forEach((file) => {
            //Y un forEach.
            let { command } = require(`../Commands/${dir}/${file}`); //Requerimos el comando de los comandos.
            client.commands.set(command.name, command);
            if (command.aliases && Array.isArray(command.aliases)) {
                command.aliases.forEach((alias) => client.aliases.set(alias, command.name));
            } //Y lo establecemos en el Collection.
        }); //Cerramos forEach de archivos.
    }); //Cerramos forEach de categorías
    //Events
    (0, fs_1.readdirSync)("./src/Events/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
        .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
        .forEach((file) => {
        //Y un forEach.
        let { event } = require("../Events/" + file); //Requerimos el evento de los eventos.
        client.on(event.name, event.run.bind(null, client)); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
    }); //Cerramos forEach.
    //Distube Events
    (0, fs_1.readdirSync)("./src/Distube/") //Entramos a la carpeta Events, creamos la carpeta Djs, y hacemos un readdirSync para obtener todos sus archivos.
        .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
        .forEach((file) => {
        //Y un forEach.
        let { distubeEvent } = require("../Distube/" + file); //Requerimos el evento de los eventos.
        client.distube.on(distubeEvent.name, distubeEvent.run.bind(null, client)); //Y lo guardamos en caché, para que se emitan al cumplirse cada evento.
    });
    //unhandledRejection = Básicamente esto sirve para que tu bot no se apague al instante si hay un error, sólo enviará un error a la consola, más no lo apagará.
    process.on("unhandledRejection", async (rejection) => {
        //Ejecutamos el evento con el parámetro rejection.
        logReject(); //Ejecutamos la función logReject.
        function logReject() {
            //Abrimos la función
            console.log("Unhandled Rejection:", rejection); //Y enviamos a la consola el error.
            process.stdout.clearLine(1); //Eliminamos una línea de la consola.
        } //Cerramos la función.
    }); //Cerramos el evento.
    //Interactions (commands)
    (0, fs_1.readdirSync)("./src/Interaction-commands/").forEach((dir) => {
        //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
        (0, fs_1.readdirSync)("./src/Interaction-commands/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
            .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
            .forEach((file) => {
            //Y un forEach.
            let { Interaction } = require(`../Interaction-commands/${dir}/${file}`); //Requerimos el comando de los comandos.
            client.interactionz.set(Interaction.name, Interaction); //Y lo establecemos en el Collection.
        }); //Cerramos forEach de archivos.
    }); //Cerramos
    //Interactions (Menus)
    (0, fs_1.readdirSync)("./src/Interaction-menus/").forEach((dir) => {
        //Entramos a la carpeta Commands, creamos la carpeta Cmd, y hacemos un readdirSync, para obtener todas sus categorias, retornando el parámetro dir
        (0, fs_1.readdirSync)("./src/Interaction-menus/" + dir) //Luego de eso entramos al mismo directorio, pero con el parámetro dir añadido.
            .filter((f) => f.endsWith(".ts")) //Filtro de sólo archivos TypeScript.
            .forEach((file) => {
            //Y un forEach.
            let { InteractionMenu } = require(`../Interaction-menus/${dir}/${file}`); //Requerimos el comando de los comandos.
            client.interactiony.set(InteractionMenu.name, InteractionMenu); //Y lo establecemos en el Collection.
        }); //Cerramos forEach de archivos.
    });
    //Mongoose
    (0, mongoose_1.connect)(`${process.env.mongoGOD}`, {
        useNewUrlParser: true,
        useUnifiedTopology: true,
    }) //Conectamos con Mongose, si les sale en rojo, intenten solo dejando "connect(process.env.MONGO)".
        .then(() => console.log("✅ | Conectado a Mongoose")) //Si todo salió bien, envía el mensaje a la consola.
        .catch(
    //De lo contrario
    (e //Parámetro "e", de error.
    ) => console.error("❌ | Ocurrió un error al conectarme a Mongoose:", e) //Si hay un error, envía el mensaje y error al mismo.
    ); //Cerramos catch
} //Cerramos la función exportada, runALl.
exports.runAll = runAll;
//# sourceMappingURL=runner.js.map