import mongoose, { Schema, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const EventSchema = new Schema({
  key: {
    type: String,
    unique: true,
  },
  date: {
    type: String,
    required: true,
  },
  day: {
    type: String,
  },
  doctor: {
    type: Schema.Types.ObjectId,
    ref: "Doctor",
  },
  specialization: {
    type: Schema.Types.ObjectId,
    ref: "Specialization",
  },
  status: {
    type: Boolean,
    default: true,
  },
  fee: {
    type: Schema.Types.ObjectId,
    ref: "Fee",
  },
  start: {
    type: String,
    required: true,
  },
  end: {
    type: String,
    required: true,
  },
  maxPatients: {
    type: Number,
    required: true,
  },
  countPatient: {
    type: Number,
    default: 0,
  },
  bookings: [{ type: Schema.Types.ObjectId, ref: "User" }],
});

EventSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = uuidv4();
  }
  next();
});

const eventModel = model("Event", EventSchema);
export default eventModel;
