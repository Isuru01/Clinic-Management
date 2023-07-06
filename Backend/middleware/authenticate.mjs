import jwt from "jsonwebtoken";

export default (req, res, next) => {
  const token = req.cookies.token;

  try {
    const decoded = jwt.verify(token, process.env.JWT_SECRET);
    console.log(decoded);
    req.user = decoded;

    next();
  } catch (err) {
    res.status(200).json({ url: "/" });
  }
};
