import jwt, { Secret } from "jsonwebtoken";
import { JWTPayload } from "../interface/common";

const generateToken = (
  payload: JWTPayload,
  secret: Secret,
  expireTime: string
) => {
  const token = jwt.sign(payload, secret, { expiresIn: expireTime });
  return token;
};

const verifyToken = (token: string, secret: Secret) => {
  const decoded = jwt.verify(token, secret);
  return decoded;
};

export const jwtHelper = {
  generateToken,
  verifyToken,
};
