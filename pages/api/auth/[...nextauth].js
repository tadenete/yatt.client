import NextAuth from "next-auth/next";
import CredentialsProvider from "next-auth/providers/credentials";
import { isJwtExpired } from "jwt-check-expiration";

async function refreshAccessToken(token) {
  try {
    //do a silent refresh
      const res = await fetch("http://localhost:5000/refresh", {
      method: "POST",
      body: JSON.stringify({ refreshToken: token.refreshToken }),
      headers: {
        "Content-Type": "application/json",
        Authorization: `Bearer ${token.accessToken}`,
      },
    });
    const newToken = await res.json();
    if (!res.ok) {
      throw newToken;
    }
    return {
      ...token,
      accessToken: newToken.accessToken,
      refreshToken: newToken.refreshToken,
    };
  } catch (error) {
    return {
      ...token,
      error: "RefreshAccessTokenError",
    };
  }
}

export default NextAuth({
  providers: [
    CredentialsProvider({
      name: "Credentials",
      authorize: async (credentials) => {
        //send auth request to Identity service
        const response = await fetch("http://localhost:5000/login", {
          method: "POST",
          body: JSON.stringify({
            email: credentials.email,
            password: credentials.password,
          }),
          headers: { "Content-Type": "application/json" },
        });
        const user = await response.json();

        //check for successful authentication
        if (!response.ok) {
          throw new Error(user.message || "Unable to signin!");
        }

        return user;
      },
    }),
  ],

  callbacks: {
    //Getting the JWT token from the API response
    async jwt({ token, user }) {

      //initial signin
      if (user) {
        return { ...user };
      }

      //refresh access token if expired
      if (isJwtExpired(token.accessToken)) {
        console.log("Access token expired! sending a slient refresh");
        return refreshAccessToken(token);
      }

      return token;
    },

    async session({ session, token }) {
      session.accessToken = token.accessToken;
      session.error = token.error;
      return session;
    },
  },
});
