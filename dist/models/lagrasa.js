"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
let la_grasa = new mongoose_1.Schema({
    sdlg: {
        type: Boolean,
        required: false,
        default: false,
    },
    guildId: {
        type: String,
        required: true,
    },
});
exports.default = (0, mongoose_1.model)("grasaxdxd", la_grasa);
