import jwt from "jsonwebtoken";
import User from "../models/user.model.js";

export const protectRoute = async (req, res, next) => {
  try {
    const token = req.cookies.jwt;

    if (!token) {
      return res
        .status(401)
        .json({ message: "User not Authorized from protectRoute" });
    }

    const decoded = jwt.verify(token, process.env.JWT_SECRET);

    if (!decoded)
      return res.status(401).json({ message: "Unauthorized - Invalid Token" });

    const user = await User.findById(decoded.userId).select("-password");

    if (!user) return res.status(404).json({ message: "No user Found" });

    req.user = user;
    next();
  } catch (error) {
    res.status(500).json({ message: "Error in ProtectRoute middleware" });
    console.log("Error in ProtectRoute middleware");
  }
};