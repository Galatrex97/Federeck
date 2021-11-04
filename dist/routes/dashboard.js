"use strict";
var __awaiter = (this && this.__awaiter) || function (thisArg, _arguments, P, generator) {
    function adopt(value) { return value instanceof P ? value : new P(function (resolve) { resolve(value); }); }
    return new (P || (P = Promise))(function (resolve, reject) {
        function fulfilled(value) { try { step(generator.next(value)); } catch (e) { reject(e); } }
        function rejected(value) { try { step(generator["throw"](value)); } catch (e) { reject(e); } }
        function step(result) { result.done ? resolve(result.value) : adopt(result.value).then(fulfilled, rejected); }
        step((generator = generator.apply(thisArg, _arguments || [])).next());
    });
};
Object.defineProperty(exports, "__esModule", { value: true });
const auth_1 = require("../middleware/auth");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    client.router.get("/dashboard", auth_1.auth, (req, res) => {
        let guilds = req.user.guilds.filter(xD => (xD.permissions & 8) === 8);
        let servidores = Array();
        for (let key in guilds) {
            if (req.bclient.guilds.cache.get(guilds[key])) {
                servidores.push({
                    esta: true,
                    id: req.bclient.guilds.cache.get(guilds[key]).id,
                    name: req.bclient.guilds.cache.get(guilds[key]).name,
                    icon: req.bclient.guilds.cache.get(guilds[key]).icon
                });
            }
            else {
                servidores.push({
                    esta: false,
                    id: req.bclient.guilds.cache.get(guilds[key]).id,
                    name: req.bclient.guilds.cache.get(guilds[key]).name,
                    icon: req.bclient.guilds.cache.get(guilds[key]).icon
                });
            }
        }
        res.render("dashboard", {
            user: req.user,
            servidores,
        });
    });
    client.router.get("/dashboard/:id", auth_1.auth, (req, res) => {
        let id = req.params.id;
        let servidor = req.bclient.guilds.cache.get(id);
        let canales = servidor.channels.cache;
        let avatarxd = req.bclient.user.displayAvatarURL();
        res.render("dashboard", {
            user: req.user,
            servidor,
            canales,
            avatarxd
        });
    });
});
