import mongoose from 'mongoose';
const uri: any = process.env.mongoGOD;
import { Event } from "../Interfaces";

export const event: Event = {
name: "ready",
run: async(client) => {
//Defines mongoose

mongoose.connect(uri, {
    useNewUrlParser: true,
    useUnifiedTopology: true
})
.then(() => console.log('Conectado a MongoDB')) //Con esto, hacemos un console.log() para saber que si nos conectamos y todo está bien.
.catch((err: any) => console.log(err));

const presencias: any = [
{
    name: "actualizando code...",
    type: "WATCHING"
},
{
    name: "Lyon | v0.3",
    type: "PLAYING"
},
{
    name: `${client.guilds.cache.size} servidores`,
    type: "COMPETING"
}
];
 //presencias


setInterval(() => {
function presence() {
client.user?.setPresence({
status: 'online',
activities: [
    presencias[Math.floor(Math.random() * presencias.length)]
],
})
}
presence()
}, 105000);
console.log('Todo piola')
console.log("Estoy listo")

//Con esto hacemos una función para la presencia, que es la actividad, o el estado.

const fecha = new Date("May 31, 2021");


}




}
