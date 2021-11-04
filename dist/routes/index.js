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
const express = require("express");
const passport = require("passport");
let { auth } = require("../middleware/auth");
module.exports = (client) => __awaiter(void 0, void 0, void 0, function* () {
    client.router = express.Router();
    client.router.get("/", (req, res) => {
        res.render('index', { commandsnum: client.commands.size, servers: client.guilds.cache.size, users: client.users.cache.size, avatar: client.user.displayAvatarURL() });
    });
    client.router.get("/login", passport.authenticate("discord"), (req, res) => {
        res.redirect("/dashboard");
    });
    client.router.get("/dashboard", auth, (req, res) => {
        let guilds = req.user.guilds.filter(xD => (xD.permissions & 8) === 8);
        let servidores = Array();
        for (let key in guilds) {
            if (client.guilds.cache.get(guilds[key])) {
                servidores.push({
                    esta: true,
                    id: client.guilds.cache.get(guilds[key]).id,
                    name: client.guilds.cache.get(guilds[key]).name,
                    icon: client.guilds.cache.get(guilds[key]).icon
                });
            }
            else {
                servidores.push({
                    esta: false,
                    id: client.guilds.cache.get(guilds[key]).id,
                    name: client.guilds.cache.get(guilds[key]).name,
                    icon: client.guilds.cache.get(guilds[key]).icon
                });
            }
        }
        res.render("dashboard", {
            user: req.user,
            servidores,
        });
    });
    client.router.get("/dashboard/:id", auth, (req, res) => {
        let id = req.params.id;
        let servidor = client.guilds.cache.get(id);
        let canales = servidor.channels.cache;
        let avatarxd = client.user.displayAvatarURL();
        res.render("dashboard", {
            user: req.user,
            servidor,
            canales,
            avatarxd
        });
    });
});
