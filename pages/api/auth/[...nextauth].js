import NextAuth from "next-auth"
import GoogleProvider from "next-auth/providers/google"
import CredentialsProvider from "next-auth/providers/credentials"

export const authOptions = {
  // Configure one or more authentication providers
  providers: [
    GoogleProvider({
        name: "google",
        clientId: process.env.GOOGLE_ID,
        clientSecret: process.env.GOOGLE_SECRET,
    }),
    CredentialsProvider({
      name: "credentials",
      credentials: {},

      async authorize(credentials) {
        const { name, email } = credentials

        return {name, email}
      }
    }),
  ],
}
export default NextAuth(authOptions)