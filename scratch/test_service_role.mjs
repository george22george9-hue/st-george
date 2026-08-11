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

const supabaseAdmin = createClient(supabaseUrl, serviceRoleKey);

async function testServiceRolePublicQuery() {
  console.log('--- Testing Service Role Server Query for Public Content ---');

  const [secRes, catRes, bookRes, mediaRes] = await Promise.all([
    supabaseAdmin.from('sections').select('*').eq('is_active', true).order('display_order', { ascending: true }),
    supabaseAdmin.from('categories').select('*').eq('is_active', true).order('display_order', { ascending: true }),
    supabaseAdmin.from('books').select('*').eq('is_published', true).order('created_at', { ascending: false }),
    supabaseAdmin.from('media').select('*').eq('is_published', true).order('created_at', { ascending: false }),
  ]);

  console.log('Active Sections count:', secRes.data?.length, 'Error:', secRes.error?.message);
  console.log('Active Categories count:', catRes.data?.length, 'Error:', catRes.error?.message);
  console.log('Published Books count:', bookRes.data?.length, 'Error:', bookRes.error?.message);
  console.log('Published Media count:', mediaRes.data?.length, 'Error:', mediaRes.error?.message);

  if (secRes.data) {
    console.log('Sections Slugs:', secRes.data.map(s => s.slug));
  }
}

testServiceRolePublicQuery().catch(console.error);
