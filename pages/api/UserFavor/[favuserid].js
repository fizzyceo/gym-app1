import { PrismaClient } from '@prisma/client';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const UserId = req.query.favuserid;

  console.log('the uid :');
  console.log(req.query);
  if (req.method === 'GET') {
    const userfavors = await prisma.Userfavorite.findMany({
      where: {
        UID: UserId,
      },
    });
    console.log('im here :wefwefwefewfwef');
    console.log(userfavors);

    res.status(200).json({ userfavors: userfavors });
  } else if (req.method === 'POST') {
    const { exoId } = req.body;
    console.log(req.body);
    const exofav = await prisma.userfavorite.create({
      data: {
        UID: UserId,
        exo_Id: exoId,
      },
    });

    res.status(201).json({ exofav: exofav });
  } else if (req.method === 'DELETE') {
    const { exoId } = req.body;
    console.log(req.body);
    const exofav = await prisma.userfavorite.delete({
      where: {
        UID_exo_Id: {
          exo_Id: exoId,
          UID: UserId,
        },
      },
    });
    console.log('the deleted data');
    console.log(exofav);
    res.status(201).json({ exofav: exofav });
  }
}
