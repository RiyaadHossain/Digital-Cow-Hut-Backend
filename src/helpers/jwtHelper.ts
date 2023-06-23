import jwt, { JwtPayload, Secret } from "jsonwebtoken";
import { JWTPayload } from "../interface/common";

const generateToken = (
  payload: JWTPayload,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token: string, secret: Secret): JwtPayload => {
  return jwt.verify(token, secret) as JwtPayload;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
