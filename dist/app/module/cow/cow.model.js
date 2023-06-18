"use strict";
Object.defineProperty(exports, "__esModule", { value: true });
const mongoose_1 = require("mongoose");
const cow_constant_1 = require("./cow.constant");
const cowSchema = new mongoose_1.Schema({
    name: { type: String, required: true, trim: true },
    age: { type: Number, required: true, trim: true },
    price: { type: Number, required: true, trim: true },
    weight: { type: Number, required: true, trim: true },
    breed: {
        type: String,
        enum: cow_constant_1.cowBreed,
        required: true,
        trim: true,
    },
    location: {
        type: String,
        enum: cow_constant_1.cowLocation,
        required: true,
        trim: true,
    },
    category: {
        type: String,
        enum: cow_constant_1.cowCategory,
        required: true,
        trim: true,
    },
    label: {
        type: String,
        enum: cow_constant_1.cowLabel,
        required: true,
        trim: true,
    },
    seller: { type: mongoose_1.Schema.Types.ObjectId, ref: "User", required: true },
});
const Cow = (0, mongoose_1.model)("Cow", cowSchema);
exports.default = Cow;
