"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
exports.event = void 0;
const mongoose_1 = __importDefault(require("mongoose"));
const uri = process.env.mongoGOD;
exports.event = {
    name: "ready",
    run: async (client) => {
        //Defines mongoose
        mongoose_1.default.connect(uri, {
            useNewUrlParser: true,
            useUnifiedTopology: true
        })
            .then(() => console.log('Conectado a MongoDB')) //Con esto, hacemos un console.log() para saber que si nos conectamos y todo está bien.
            .catch((err) => console.log(err));
        const presencias = [
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
                });
            }
            presence();
        }, 105000);
        console.log('Todo piola');
        console.log("Estoy listo");
        //Con esto hacemos una función para la presencia, que es la actividad, o el estado.
        const fecha = new Date("May 31, 2021");
    }
};
//# sourceMappingURL=ready.js.map