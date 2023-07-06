import User from "../models/user.model.mjs";
import jwt from "jsonwebtoken";

const signUp = async () => {
  try {
  } catch {}
};

const signIn = async (req, res, next) => {
  try {
    const { user } = req.body;

    const result = await User.findOneAndUpdate(
      { sub: user.sub },
      { $setOnInsert: user },
      { upsert: true, new: true }
    );

    const token = jwt.sign(
      { sub: result.sub, name: result.name },
      process.env.JWT_SECRET,
      { expiresIn: "2h" }
    );

    console.log(token);
    res
      .status(200)
      .cookie("token", token, {
        httpOnly: true,
        sameSite: "lax",
      })

      .json({ token });
  } catch (err) {
    console.log(err);
    next();
  }
};

export { signIn };
