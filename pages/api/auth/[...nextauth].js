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
        const { apiType } = credentials
        if(apiType === 'signin') {
          fetch('http://localhost:5000/signin', {
            method: 'POST',
            headers: {'Content-Type': 'application/json'},
            body: JSON.stringify(credentials)
          })
          .then(res => res.json())
          .then(result => {
            // console.log({result})
            // return {name: 'maruf'}
            const user = {name: 'Maruf2'}
            return (user)
          })
          // const user = {name: 'Maruf'}
          // return user
        }
        else if(apiType === 'register') {
          const user = { name: 'register' }
          return user
        }
        else {
          return null
        }
      }
    }),
  ],
}
export default NextAuth(authOptions)