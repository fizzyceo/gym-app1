//a better option to be used for later
import { PrismaClient } from '@prisma/client';

// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { useremail } = req.query;

  const user = await prisma.user.findUnique({
    where: {
      email: useremail,
    },
  });

  res.status(200).json({ user: user });
}
