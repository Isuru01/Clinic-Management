import { Schema, SchemaType, model } from "mongoose";

const SpecializationSchema = new Schema({
  categoryHeader: {
    type: String,
    required: true,
    unique: true,
  },
  categoryDesc: String,
});

const SpecializationModel = model("Specialization", SpecializationSchema);
export default SpecializationModel;
