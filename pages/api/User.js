import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const session = await getSession({ req });
  //console.log(session);
  const user = await prisma.user.findUnique({
    where: {
      email: session.user.email,
    },
  });

  res.status(200).json({ user: user });
}
