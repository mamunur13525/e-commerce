import NextAuth from "next-auth";
import GoogleProvider from "next-auth/providers/google";
import CredentialsProvider from "next-auth/providers/credentials";
import User from "../../../models/user";

export const authOptions = {
  providers: [
    // Google Provider
    GoogleProvider({
      name: "google",
      clientId: process.env.GOOGLE_ID,
      clientSecret: process.env.GOOGLE_SECRET,
      profile: async (profile) => {
        const { name, email, given_name, family_name, picture, sub } = profile;

        // Check if the user already exists
        const existingUser = await User.findOne({ email });

        if (!existingUser) {
          // If user does not exist, create a new one
          await User.create({
            firstName: given_name,
            lastName: family_name,
            fullName: name,
            email,
            password: null,
            method: 'google', // Method of login
          });

          // Returning user data after creation
          return {
            id: sub,
            name,
            email,
            image: picture || null,
          };
        }

        // Return existing user's info if found
        return {
          id: existingUser._id.toString(),
          name: existingUser.fullName,
          email: existingUser.email,
          image: existingUser.image || null,
        };
      },
    }),

    // Credentials Provider (Login via email and password, etc.)
    CredentialsProvider({
      name: "credentials",
      credentials: {
        email: { label: "Email", type: "email" },
        password: { label: "Password", type: "password" }
      },

      async authorize(credentials) {

        return {
          name: credentials.name,
          email: credentials.email,
          image: null,
          id: 1
        }
      }
    }),
  ],

  session: {
    strategy: "jwt", // Use JWT for session management
  },

  callbacks: {
    async redirect({ url, baseUrl }) {
      if (url.startsWith(baseUrl)) return url;
      if (url.startsWith('/')) return `${baseUrl}${url}`;
      return baseUrl;
    },

    async jwt({ token, user }) {
      // If user is passed (on sign in), save it to the token
      if (user) {
        token.id = user.id;
        token.email = user.email;
        token.name = user.name;
        token.image = user.image;
      }

      return token;
    },

    async session({ session, token }) {
      // Persist the token's properties into the session
      if (token) {
        session.user.id = token.id;
        session.user.email = token.email;
        session.user.name = token.name;
        session.user.image = token.image;
      }

      return session;
    },
  },

  secret: process.env.NEXT_AUTH_SECRET, // Ensure the secret is set for JWT encryption

  pages: {
    signIn: '/login',
    error: '/login',
  },
};

export default NextAuth(authOptions);
