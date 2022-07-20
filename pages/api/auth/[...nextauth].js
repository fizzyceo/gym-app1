// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
import NextAuth from 'next-auth/next';
import GoogleProvider from 'next-auth/providers/google';
import FacebookProvider from 'next-auth/providers/facebook';
import { PrismaAdapter } from '@next-auth/prisma-adapter';
import { PrismaClient } from '@prisma/client';
import CredentialsProvider from 'next-auth/providers/credentials';
const prisma = new PrismaClient();

export default function handler(req, res) {
  NextAuth(req, res, {
    adapter: PrismaAdapter(prisma),

    providers: [
      /*    CredentialsProvider({
        // The credentials is used to generate a suitable form on the sign in page.
        // You can specify whatever fields you are expecting to be submitted.
        // e.g. domain, username, password, 2FA token, etc.
        // You can pass any HTML attribute  to the <input> tag through the object.
        credentials: {
          username: { label: 'Username', type: 'text', placeholder: 'jsmith' },
          password: { label: 'Password', type: 'password' },
        },
        async authorize(credentials) {
          // Add logic here to look up the user from the credentials supplied
        },
      }),*/
      GoogleProvider({
        clientId: process.env.GOOGLE_CLIENT_ID,
        clientSecret: process.env.GOOGLE_CLIENT_SECRET,
      }),
      FacebookProvider({
        clientId: process.env.FACEBOOK_CLIENT_ID,
        clientSecret: process.env.FACEBOOK_CLIENT_SECRET,
      }),
    ],

    secret: process.env.SECRET || 'anyretogijo-121AQHegmkemrg._',
    jwt: {
      secret: 'GOCSPXweferewfwefwefewhtrmkytjlmtyjlkm76otykjotymjuj-V',
    },
  });
}
