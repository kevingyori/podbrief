const { createClient } = require("@supabase/supabase-js");
require("dotenv").config({ path: require("find-config")(".env") });

const supabaseUrl = "https://qcqfhwyxvoqaqxgawien.supabase.co";
const supabaseApiKey = process.env.SUPABASE_KEY;

// Create a Supabase client instance
export const supabase = createClient(supabaseUrl, supabaseApiKey, {
  auth: {
    persistSession: false,
  },
});

module.exports = supabase;
