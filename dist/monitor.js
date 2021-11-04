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
var __importDefault = (this && this.__importDefault) || function (mod) {
    return (mod && mod.__esModule) ? mod : { "default": mod };
};
Object.defineProperty(exports, "__esModule", { value: true });
const express_1 = __importDefault(require("express"));
const server = (0, express_1.default)();
const express_session_1 = __importDefault(require("express-session"));
const passport_1 = __importDefault(require("./passport"));
const path_1 = __importDefault(require("path"));
module.exports = (client) => {
    let host = "0.0.0.0";
    function keepAlive() {
        return __awaiter(this, void 0, void 0, function* () {
            server.listen(process.env.PORT || 3000, () => {
                client.on("ready", () => __awaiter(this, void 0, void 0, function* () {
                    console.log("Página lista.");
                }));
            });
            return true;
        });
    }
    server.use(express_1.default.static("views"));
    server.use((0, express_session_1.default)({
        secret: "lyondashboard",
        resave: false,
        saveUninitialized: false,
    }));
    server.use(passport_1.default.initialize());
    server.use(passport_1.default.session());
    server.use((req, res, next) => {
        req.bclient = client;
        next();
    });
    server.use(client.router);
    server.set('view engine', 'ejs');
    server.set('views', path_1.default.join(__dirname, 'views'));
    keepAlive();
    /*
  client.monitor = new Monitor({
        website: 'Clark.galatrex.repl.co',
      title: 'Vektor',
      interval: 5,
  }) */
};
