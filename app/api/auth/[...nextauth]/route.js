import NextAuth from "next-auth";
import CredentialsProvider from "next-auth/providers/credentials";
import connectDB from '../../../../utils/connect'
import User from '@/models/userModel'
import bcrypt from 'bcryptjs';


const login = async (credentials) => {
  try{
    connectDB();
    const user = await User.findOne({email: credentials.email});
    if(!user) throw new Error('Wrong credentials')
    const isCorrect = await bcrypt.compare(credentials.password, user.password);
    if(!isCorrect) throw new Error('Wrong credentials')
    return user;

  }
  catch(err){
    
    throw new Error('Something went wrong');
  }
}

export const authOptions = {
  pages: {
    signIn: '/dashboard/login',
    error: "/dashboard/login",
  },
  providers: [
    CredentialsProvider({
      name: 'credentials',
      credentials: {},
      async authorize(credentials){
        try{
          const user = await login(credentials)
          return user
        }
        catch(err){
          throw new Error('Failed to login ');
        }
      }
    })
  ],
  callbacks: {
    async jwt(token, user){
      if(user){
        token.username = user.username;
        token.email = user.email,
        token.id = user.id
      }
      return token;
    },
    async session(session, token){
      if(token){
        session.user.username = token.username,
        session.user.email = token.email,
        session.user.id = token.id
      }
      return session;
    }
  
  }
}

const handler = NextAuth(authOptions);


export { handler as GET, handler as POST }