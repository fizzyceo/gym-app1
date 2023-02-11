import { PrismaClient } from '@prisma/client';
import { getSession, useSession } from 'next-auth/react';
// Next.js API route support: https://nextjs.org/docs/api-routes/introduction
const prisma = new PrismaClient();
export default async function handler(req, res) {
  const session = await getSession({ req });
  //console.log(session);
  const user = await prisma.user
    .findUnique({
      where: {
        email: session.user.email,
      },
    })
    .then((response) => {
      res.statusCode = 200;
      res.setHeader('Content-Type', 'application/json');
      res.setHeader('Cache-Control', 'max-age=180000');
      res.end(JSON.stringify(response));
      resolve();
    })
    .catch((error) => {
      res.json(error);
      res.status(405).end();
      resolve(); // in case something goes wrong in the catch block (as vijay commented)
    });

  // res.status(200).json({ user: user });
}
