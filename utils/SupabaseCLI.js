import { createClient } from '@supabase/supabase-js';

const supabaseUrl = process.env.NEXT_PUBLIC_SUPABASE_URL ?? '';
const supabaseKey = process.env.NEXT_PUBLIC_SUPABASE_ANON_KEY ?? '';
const supabaseSecret = process.env.SUPABASE_SERVICE_ROLE_KEY ?? '';
const options = {
  db: { schema: 'next_auth' },
};
const supabase = createClient(supabaseUrl, supabaseKey);

export const supabaseNextAuth = createClient(
  supabaseUrl,
  supabaseSecret,
  options
);
export default supabase;
