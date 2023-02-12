import supabase from '../../../utils/SupabaseCLI';

export default async function handler(req, res) {
  const UserId = req.query.favuserid;

  console.log('the uid :');
  console.log(req.query);
  if (req.method === 'GET') {
    const userfavors = await supabase
      .from('user_fav')
      .select('*')
      .eq('id', UserId);

    console.log(userfavors);

    res.status(200).json({ userfavors: userfavors.data });
  } else if (req.method === 'POST') {
    const { exoId } = req.body;
    console.log(req.body);

    const exofav = await supabase
      .from('user_fav')
      .insert([{ id: UserId, exo_id: parseInt(exoId) }]);

    console.log('posted ', exofav);
    res.status(201).json({ exofav: exofav });
  } else if (req.method === 'DELETE') {
    const { exoId } = req.body;
    const exoDeleted = await supabase
      .from('user_fav')
      .delete()
      .eq('exo_id', exoId);

    res.status(201).json({ exoDeleted: exoDeleted });
    console.log('the deleted data');
    console.log('Deleted ', exoDeleted);
  }
}
