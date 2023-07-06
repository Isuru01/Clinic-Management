import { Schema, SchemaType, model } from "mongoose";

const PatientSchema = new Schema({});

const PatientModel = model("Patient", PatientSchema);
export default PatientModel;
