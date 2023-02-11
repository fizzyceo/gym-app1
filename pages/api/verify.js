import { supabaseNextAuth } from '../../utils/SupabaseCLI';

export default async function handler(req, res) {
  const { userid } = req.body;
  const { data, error } = await supabaseNextAuth
    .from('users')
    .update({ emailVerified: new Date() })
    .eq('id', userid);
  if (error) throw error.message;
  console.log(data);
  res.status(200).json({ message: 'verified successfully' });
}
