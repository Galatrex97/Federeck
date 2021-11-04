"use strict";
var __createBinding = (this && this.__createBinding) || (Object.create ? (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    Object.defineProperty(o, k2, { enumerable: true, get: function() { return m[k]; } });
}) : (function(o, m, k, k2) {
    if (k2 === undefined) k2 = k;
    o[k2] = m[k];
}));
var __setModuleDefault = (this && this.__setModuleDefault) || (Object.create ? (function(o, v) {
    Object.defineProperty(o, "default", { enumerable: true, value: v });
}) : function(o, v) {
    o["default"] = v;
});
var __importStar = (this && this.__importStar) || function (mod) {
    if (mod && mod.__esModule) return mod;
    var result = {};
    if (mod != null) for (var k in mod) if (k !== "default" && Object.prototype.hasOwnProperty.call(mod, k)) __createBinding(result, mod, k);
    __setModuleDefault(result, mod);
    return result;
};
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const discord_js_1 = __importStar(require("discord.js"));
const moment_1 = __importDefault(require("moment"));
const google_play_scraper_1 = __importDefault(require("google-play-scraper"));
module.exports = {
    name: "play-store",
    aliases: ["playstore"],
    usage: 'play-store <app>',
    category: 'Misceláneo',
    description: '',
    run: (client, message, args) => __awaiter(void 0, void 0, void 0, function* () {
        let busqueda = args.join(" ");
        if (!busqueda) {
            return message.reply({ content: "Que quieres buscar?" });
        }
        google_play_scraper_1.default.search({
            term: busqueda,
            num: 1
        }).then(aa => {
            google_play_scraper_1.default.app({
                appId: aa[0].appId,
                lang: "es"
            }).then((gg) => __awaiter(void 0, void 0, void 0, function* () {
                const numb = gg.reviews;
                function separator(numb) {
                    let str = numb.toString().split(".");
                    str[0] = str[0].replace(/\B(?=(\d{3})+(?!\d))/g, ".");
                    return str.join(".");
                }
                let jaj = (0, moment_1.default)(gg.updated).locale("es").fromNow();
                const row = new discord_js_1.MessageActionRow().addComponents(new discord_js_1.MessageButton()
                    .setCustomId("playstore_text")
                    .setStyle("PRIMARY")
                    .setLabel("Descripción completa"), new discord_js_1.MessageButton()
                    .setURL(gg.url)
                    .setStyle("LINK")
                    .setLabel("App URL"), new discord_js_1.MessageButton()
                    .setURL(gg.developerWebsite + "")
                    .setStyle("LINK")
                    .setLabel("Sitio web de " + gg.title));
                const embed = new discord_js_1.default.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle("Aplicación")
                    .setThumbnail(gg.icon)
                    .addField("Nombre", gg.title, true)
                    .addField("Puntuación", `${gg.scoreText} ⭐`, true)
                    .addField("Resumen", gg.summary, true)
                    .addField("Reseñas", `${separator(numb)}`, true)
                    .addField("Descargas", gg.installs, true)
                    .addField("Precio", `${gg.priceText.replace("Free", "Gratis")}`, true)
                    .addField("ID (Nombre del paquete)", gg.appId, true)
                    .addField("Actualizado", gg.updated ? jaj : "No hay datos", true)
                    .addField("Género", `${gg.genre}`, true)
                    .addField("Creado el", gg.released ? `${gg.released} (${(0, moment_1.default)(new Date(gg.released.replace("abr", "apr").replace("ago", "aug").replace("ene", "jan").replace("dic", "dec"))).locale("es").fromNow()})` : "No hay datos", true)
                    .addField("Descripción (recortada)", `${gg.description.split(".")[0].slice(0, 256)}.`)
                    .addField("Creador", "Nombre: " + gg.developer + "\n" + "Gmail: " + gg.developerEmail + "\n" + "Dirección: " + `${gg.developerAddress || "No hay datos"}` + "\n" + "ID: " + gg.developerId)
                    .addField("Novedades", `${gg.recentChanges ? gg.recentChanges.replace(/<br>/g, "\n").replace(/&quot;/g, `"`) : "No hay datos"}`)
                    .setFooter("Encontré la aplicación")
                    .setTimestamp();
                let msg = yield message.reply({ embeds: [embed], components: [row] });
                const desc = new discord_js_1.MessageEmbed()
                    .setColor("WHITE")
                    .setTitle(`Descripcion completa de ${gg.title}`)
                    .setDescription(`${gg.description}`)
                    .setThumbnail(gg.icon);
                const collector = msg.createMessageComponentCollector({
                    componentType: "BUTTON",
                    time: 7500
                });
                collector.on("collect", (interactionxd) => {
                    interactionxd.deferUpdate();
                    const id = interactionxd.customId;
                    if (id === "playstore_text") {
                        interactionxd.user.send({ embeds: [desc] });
                        msg.channel.send(`${interactionxd.user} he enviado la descripción completa de la aplicación ${gg.title} a tu MD`);
                    }
                });
                collector.on("end", () => {
                    msg.channel.send("Se han acabado los 7 segundos para ver la descripción.");
                });
            })).catch(error => {
                message.reply({ content: `Ha ocurrido un error con la búsqueda: ${busqueda}` });
                let errmsg = new (require('discord.js')).MessageEmbed()
                    .setTitle('Ha ocurrido un error')
                    .setDescription(`**Tengo el siguiente error:** ${error.stack}`)
                    .setThumbnail(`https://media.giphy.com/media/mq5y2jHRCAqMo/giphy.gif`)
                    .setFooter('Tipico')
                    .setColor("WHITE")
                    .setTimestamp();
                client.channels.cache.get('901550991923630130').send({ embeds: [errmsg] });
                console.log(error);
            });
        });
    })
};
