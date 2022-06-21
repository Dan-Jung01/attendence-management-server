import jwt from "jsonwebtoken";
import jwtObj from "../config/jwt-secret-key";

export const authChecker = (req, res, next) => {
  if (req.headers.authorization) {
    const token = req.headers.authorization.split("Bearer ")[1];

    jwt.verify(token, jwtObj.secret, (err) => {
      if (err) {
        console.log(err.name);
        res.status(401).json({ error: "Auth Error from authChecker" });
      } else {
        next();
      }
    });
  } else {
    res.status(401).json({ error: "Auth Error from authChecker" });
  }
};
