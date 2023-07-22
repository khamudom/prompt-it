import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import { connectToDatabase } from '@utils/database';
import User from '@models/user';

// console.log({
//   GOOGLE_CLIENT_ID: process.env.GOOGLE_CLIENT_ID,
//   GOOGLE_CLIENT_SECRET: process.env.GOOGLE_CLIENT_SECRET,
// });

const handler = NextAuth({
  providers: [
    GoogleProvider({
      clientId: process.env.GOOGLE_CLIENT_ID,
      clientSecret: process.env.GOOGLE_CLIENT_SECRET,
    }),
  ],
  callbacks: {
    async session({ session, token, trigger, newSession }) {
      const sessionUser = await User.findOne({ email: session.user.email });

      session.user.id = sessionUser._id.toString();

      return session;
    },

    async signIn({ profile }) {
      try {
        await connectToDatabase();
        // check if the user already exists in the database
        const userExists = await User.findOne({ email: profile.email });

        // if not, create a new user and save it to the database
        if (!userExists) {
          const newUser = await User.create({
            email: profile.email,
            username: profile.name.replace(' ', '').toLowerCase(),
            image: profile.image,
          });
          await newUser.save();
        }

        return true;
      } catch (error) {
        console.log(error);
        return false;
      }
    },
  },
});

export { handler as GET, handler as POST };
