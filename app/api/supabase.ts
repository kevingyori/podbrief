import { createClient } from "@supabase/supabase-js";

const supabaseUrl = "https://qcqfhwyxvoqaqxgawien.supabase.co";
const supabaseApiKey = process.env.SUPABASE_KEY as string;

const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    persistSession: false,
  },
});

export { supabase };
