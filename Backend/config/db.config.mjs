import mongoose from "mongoose";

export async function connectDB() {
  const uri = `mongodb+srv://isuruakalanka071:pMIlV5ojDlO69tMx@learning.1yo64vy.mongodb.net/medi_care?retryWrites=true&w=majority`;
  mongoose.set("strictQuery", true);

  try {
    await mongoose.connect(uri);
    console.log("MongoDB Connected");
  } catch (err) {
    console.log(`Atlas Server Connection Error ${err}`);
  }
}
