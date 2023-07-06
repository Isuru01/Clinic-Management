import mongoose, { Schema, SchemaType, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const DoctorSchema = new Schema(
  {
    key: {
      type: String,
      unique: true,
    },
    docFName: {
      type: String,
      required: true,
    },
    docLName: {
      type: String,
      required: true,
    },
    docEmail: {
      type: String,
      unique: true,
      required: true,
    },
    available: [{ type: String }],
    docGender: String,
    docProfilePic: String,
    docLiscense: {
      type: String,
      required: true,
      unique: true,
    },
    docPhone: {
      type: String,
      required: true,
    },
    sessions: [{ type: Schema.Types.ObjectId, ref: "Session" }],
    description: String,
    docSpecialization: {
      type: Schema.Types.ObjectId,
      ref: "Specialization",
      required: true,
    },
    docHospital: String,
    docActiveYears: String,
    docQualification: [
      {
        qualification: String,
        institute: String,
        year: String,
      },
    ],
  },
  {
    toObject: { virtuals: true },
    toJSON: { virtuals: true },
  }
);

DoctorSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = uuidv4();
  }
  next();
});

DoctorSchema.virtual("docName").get(function () {
  return this.docFName + " " + this.docLName;
});

const DoctorModel = model("Doctor", DoctorSchema);
export default DoctorModel;
