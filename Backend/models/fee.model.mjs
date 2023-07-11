import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const FeeSchema = new Schema({
  key: String,
  consultation: {
    type: Number,
    required: true,
  },
  service: {
    type: Number,
    required: true,
  },
  tax: {
    type: Number,
    required: true,
  },
});

FeeSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = uuidv4();
  }
  next();
});

const feeModel = model("Fee", FeeSchema);
export default feeModel;
