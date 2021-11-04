"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const gg = new mongoose_1.Schema({
    jaja: {
        type: Boolean,
        required: false,
        default: false,
    },
    guild: {
        type: String
    },
});
exports.default = (0, mongoose_1.model)("antilinkzzz", gg);
