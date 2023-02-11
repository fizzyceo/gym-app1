import { PrismaClient } from '@prisma/client';
import supabase from '../../utils/SupabaseCLI';

const prisma = new PrismaClient();
export default async function handler(req, res) {
  const { UserId } = req.body;
  const { data, error } = await supabase
    .from('user_fav')
    .select('*')
    .eq('id', UserId);

  if (error) throw error.message;
  console.log(data);

  // .then((response) => {
  //   res.statusCode = 200;
  //   res.setHeader('Content-Type', 'application/json');
  //   res.setHeader('Cache-Control', 'max-age=180000');
  //   res.end(JSON.stringify(response));
  //   resolve();
  // })
  // .catch((error) => {
  //   res.json(error);
  //   res.status(405).end();
  //   resolve(); // in case something goes wrong in the catch block (as vijay commented)
  // });

  //  res.status(200).json({ userfavors: userfavors });
}
