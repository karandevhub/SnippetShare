import axios from "axios";
import { prismaClient } from "../../client/db";
import JWTService from "../../services/jwt";

interface GoogleTokenInfo {
  iss: string; // Issuer
  azp: string; // Authorized party
  aud: string; // Audience
  sub: string; // Subject (user ID)
  email: string; // Email address
  email_verified: string; // Email verification status (use `boolean` if true/false)
  nbf: string; // Not before (epoch time)
  name: string; // Full name
  picture: string; // URL to profile picture
  given_name: string; // Given name
  family_name: string; // Family name
  iat: string; // Issued at (epoch time)
  exp: string; // Expiration (epoch time)
  jti: string; // JWT ID
  alg: string; // Algorithm used
  kid: string; // Key ID
  typ: string; // Token type
}

const queries = {
  verifyGoogleToken: async (parent: any, { token }: { token: string }) => {
    const googleOauthUrl = new URL("https://oauth2.googleapis.com/tokeninfo");
    googleOauthUrl.searchParams.set("id_token", token);
    const { data } = await axios.get<GoogleTokenInfo>(
      googleOauthUrl.toString(),
      {
        responseType: "json",
      }
    );

    const user = await prismaClient.user.findUnique({
      where: {
        email: data?.email,
      },
    });

    if (!user) {
      await prismaClient.user.create({
        data: {
          email: data.email,
          firstName: data.given_name,
          lastName: data.family_name,
          profileImageURL: data.picture,
        },
      });
    }

    const userIndb = await prismaClient.user.findUnique({
      where: {
        email: data.email,
      },
    });

    if (!userIndb) {
      throw new Error("User not found in the database");
    }

    const userToken = JWTService.generateTokenForUser(userIndb);

    return userToken;
  },
};

export const resolvers = { queries };
