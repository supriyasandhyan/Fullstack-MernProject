import JWT from "jsonwebtoken";

const JWT_SECRET = "gvggcfcfxxxxfgggfxfgx"; 

const requireSignIn = (req, res, next) => {
  try {
    const token = req.headers.authorization;

    if (!token) {
      return res.status(401).json({ message: "Authorization token is required" });
    }

    const decoded = JWT.verify(token, JWT_SECRET);
    req.user = decoded; // Attach decoded user information to the request object
    next();
  } catch (error) {
    console.error(error);
    return res.status(401).json({ message: "Invalid or expired token" });
  }
};

export default requireSignIn