import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";

export const authOptions = {
  pages: {
    signIn: '/dashboard/login'
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials){
        try{
          console.log({ credentials })

        }
        catch(err){
          console.log(err)
          return null
        }
      }
    })
  ]
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }