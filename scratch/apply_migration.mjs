import { createClient } from '@supabase/supabase-js';
import fs from 'fs';

const envContent = fs.readFileSync('.env.local', 'utf8');
const envVars = {};
envContent.split('\n').forEach(line => {
  const match = line.match(/^\s*([\w.-]+)\s*=\s*(.*)?\s*$/);
  if (match) {
    let value = match[2] || '';
    if (value.startsWith('"') && value.endsWith('"')) value = value.slice(1, -1);
    if (value.startsWith("'") && value.endsWith("'")) value = value.slice(1, -1);
    envVars[match[1]] = value.trim();
  }
});

const supabaseUrl = envVars.NEXT_PUBLIC_SUPABASE_URL?.replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
const serviceRoleKey = envVars.SUPABASE_SERVICE_ROLE_KEY;

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

async function run() {
  console.log('Testing Supabase migration tables...');
  const { data, error: testErr } = await supabase.from('content_items').select('id').limit(1);

  if (testErr && testErr.code === '42P01') {
    console.log('content_items table does not exist yet. Please run migration SQL in Supabase SQL Editor if direct DDL fails.');
    console.log('SQL file path: g:/John/st-george/supabase/migrations/20260811010000_content_system_upgrade.sql');
  } else if (testErr) {
    console.log('Error checking content_items:', testErr.message);
  } else {
    console.log('content_items table is active in Supabase!');
  }
}

run().catch(console.error);
