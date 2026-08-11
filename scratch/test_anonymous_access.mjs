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
const anonKey = envVars.NEXT_PUBLIC_SUPABASE_ANON_KEY;

if (!supabaseUrl || !anonKey) {
  console.error('Missing env vars');
  process.exit(1);
}

// Create anonymous client (NO SESSION, NO COOKIES, NO ADMIN LOGIN)
const supabaseAnon = createClient(supabaseUrl, anonKey);

async function testAnonAccess() {
  console.log('--- Testing Anonymous Access (No Admin Session) ---');

  const [secRes, catRes, bookRes, mediaRes, contentRes] = await Promise.all([
    supabaseAnon.from('sections').select('*').eq('is_active', true),
    supabaseAnon.from('categories').select('*').eq('is_active', true),
    supabaseAnon.from('books').select('*').eq('is_published', true),
    supabaseAnon.from('media').select('*').eq('is_published', true),
    supabaseAnon.from('content_items').select('*').eq('is_published', true),
  ]);

  console.log('1. Sections count (anon):', secRes.data?.length, 'Error:', secRes.error?.message);
  console.log('2. Categories count (anon):', catRes.data?.length, 'Error:', catRes.error?.message);
  console.log('3. Published Books count (anon):', bookRes.data?.length, 'Error:', bookRes.error?.message);
  console.log('4. Published Media count (anon):', mediaRes.data?.length, 'Error:', mediaRes.error?.message);
  console.log('5. Published Content Items count (anon):', contentRes.data?.length, 'Error:', contentRes.error?.message);
}

testAnonAccess().catch(console.error);
