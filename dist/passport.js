"use strict";
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
const passport_1 = __importDefault(require("passport"));
const passport_discord_1 = require("passport-discord");
const clientID = process.env.clientID;
const clientSecret = process.env.clientSecret;
const callbackURL = process.env.callbackURL;
const scopes = ["identify", "guilds"];
passport_1.default.serializeUser((user, done) => {
    done(null, user);
});
passport_1.default.deserializeUser((obj, done) => {
    done(null, obj);
});
passport_1.default.use(new passport_discord_1.Strategy({
    clientID,
    clientSecret,
    callbackURL: callbackURL + "/login",
    scopes,
}, (a, r, profile, cb) => {
    process.nextTick(() => {
        return cb(null, profile);
    });
}));
module.exports = passport_1.default;
