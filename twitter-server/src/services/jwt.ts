import JWT from "jsonwebtoken";
import { User } from "@prisma/client";
import { JWTUser } from "../interfaces";

const JWT_SECRET = "karan321";

class JWTService {
  public static generateTokenForUser(user: User) {
    const payload: JWTUser = {
      id: user?.id,
      email: user?.email,
    };
    const token = JWT.sign(payload, JWT_SECRET);
    return token;
  }

  public static decodeToken(token:string){
    console.log("decode token",token)
    return JWT.verify(token, JWT_SECRET) as JWTUser;
  }
}

export default JWTService;
