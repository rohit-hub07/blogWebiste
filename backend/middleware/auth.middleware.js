import jwt from "jsonwebtoken";

export const isAuthenticated = async (req,res, next) => {
  const token = req.cookies?.token;
  console.log("token inside of auth: ", token)
  if (!token) {
    return res.status(403).json({
      message: "Please login!",
      success: false,
    });
  }
  console.log("Token inside of authMiddleware: ", token);
  try {
    const decoded = jwt.verify(token, process.env.JWTSECRET);
    console.log("Decoded value: ", decoded);
    req.userId = decoded.id;
    next();
  } catch (error) {
    console.log("Error authenticating the user: ", error);
    return res.status(401).json({
      message: "Invalid or expired token!",
      success: false,
    });
  }
};
