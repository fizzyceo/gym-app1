import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { UserId } = req.body;

  const userfavors = await prisma.userfavorite.findMany({
    where: {
      UID: UserId,
    },
  });

  res.status(200).json({ userfavors: userfavors });
}
