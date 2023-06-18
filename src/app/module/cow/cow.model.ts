import { Schema, model } from "mongoose";
import { CowModel, ICow } from "./cow.interface";
import { cowBreed, cowCategory, cowLabel, cowLocation } from "./cow.constant";

const cowSchema = new Schema<ICow>({
  name: { type: String, required: true, trim: true },
  age: { type: Number, required: true, trim: true },
  price: { type: Number, required: true, trim: true },
  weight: { type: Number, required: true, trim: true },
  breed: {
    type: String,
    enum: cowBreed,
    required: true,
    trim: true,
  },
  location: {
    type: String,
    enum: cowLocation,
    required: true,
    trim: true,
  },
  category: {
    type: String,
    enum: cowCategory,
    required: true,
    trim: true,
  },
  label: {
    type: String,
    enum: cowLabel,
    required: true,
    trim: true,
  },
  seller: { type: Schema.Types.ObjectId, ref: "User", required: true },
});

const Cow = model<ICow, CowModel>("Cow", cowSchema);

export default Cow;
