import jwt from "jsonwebtoken";

//Import Keys
import { Keys } from "../config/keys";


export const isAuthenticated =  (req, res, next) => {

  const authHeader = req.get('Authorization');
  if (!authHeader) {
    req.isAuth = false;
    return next();
  }

  const token = authHeader.split(' ')[1];
  if (!token || token === "") {
    req.isAuth = false;
    return next();
  }

  let decodedToken = null;
  try {
    decodedToken = jwt.verify(token, Keys.JWT_KEY);
  } catch (error) {
    console.log(error);
    req.isAuth = false;
    return next;
  }

  if (!decodedToken) {
    req.isAuth = false;
    return next();
  }

  req.isAuth = true;
  req.userId = decodedToken.id;
  return next();
}