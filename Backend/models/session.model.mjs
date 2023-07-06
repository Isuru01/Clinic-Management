import { Schema, SchemaType, model } from "mongoose";
import dayjs from "dayjs";

const SessionSchema = new Schema(
  {
    specialization: {
      type: Schema.Types.ObjectId,
      ref: "Specialization",
      required: true,
    },
    doctor: {
      type: Schema.Types.ObjectId,
      ref: "Doctor",
      required: true,
    },
    fee: {
      type: Schema.Types.ObjectId,
      ref: "Fee",
    },
    day: String,
    startedAt: String,
    sessionTime: String,
    maxPatients: String,
    sessionRoom: String,
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

SessionSchema.virtual("endedAt").get(function () {
  const sessionTime = Number(this.sessionTime);
  const maxPatients = Number(this.maxPatients);
  const startedAt = dayjs(`2022-11-23T${this.startedAt}`, "HH:mm");

  return startedAt.add(sessionTime * maxPatients, "minute").format("HH:mm");
});

const SessionModel = model("Session", SessionSchema);
export default SessionModel;
