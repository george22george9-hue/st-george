import { getSections } from '../src/services/sections/index.ts';
import { getAllCategories } from '../src/services/categories/index.ts';

// Test fetching without session
console.log('--- Testing Fail-safe Public Service Functions ---');

async function run() {
  const sections = await getSections(false);
  console.log('Sections returned:', sections.length);
  console.log('Sections names:', sections.map(s => s.name));

  const categories = await getAllCategories(false);
  console.log('Categories returned:', categories.length);
  console.log('Categories names:', categories.map(c => c.name));
}

run().catch(console.error);
