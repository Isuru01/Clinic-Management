import { Schema, SchemaType, model } from "mongoose";
import { v4 as uuidv4 } from "uuid";

const UserSchema = new Schema({
  key: String,
  sub: {
    type: String,
    required: true,
  },
  name: {
    type: String,
    required: true,
  },
  email: {
    type: String,
    required: true,
  },
});

UserSchema.pre("save", function (next) {
  if (!this.key) {
    this.key = uuidv4();
  }
  next();
});

const UserModel = model("User", UserSchema);
export default UserModel;
