const { createClient } = require('@supabase/supabase-js');
const fs = require('fs');

const env = fs.readFileSync('.env.local', 'utf8');
const supabaseUrl = env.match(/NEXT_PUBLIC_SUPABASE_URL=(.*)/)?.[1]?.trim().replace(/\/rest\/v1\/?$/i, '').replace(/\/+$/, '');
const serviceRoleKey = env.match(/SUPABASE_SERVICE_ROLE_KEY=(.*)/)?.[1]?.trim();

if (!supabaseUrl || !serviceRoleKey) {
  console.error('Missing env vars');
  process.exit(1);
}

const supabase = createClient(supabaseUrl, serviceRoleKey);

const coreSections = [
  {
    name: 'عن الكنيسة',
    slug: 'about-church',
    description: 'تعريف بتاريخ وقيم ومكانة كنيسة مارجرجس الأثرية بسندبيس.',
    display_order: 1,
    is_active: true,
    categories: [
      { name: 'تعريف عن الكنيسة', slug: 'about-intro', description: 'تعريف عام برعوية وخدمة الكنيسة.', display_order: 1 },
      { name: 'نبذة عن تاريخ الكنيسة', slug: 'church-history', description: 'تاريخ عريق من الإيمان والخدمة الممتدة في سندبيس.', display_order: 2 },
      { name: 'الكنيسة الأثرية', slug: 'heritage-church', description: 'تراث كنسي وأثري يربط بين الأصالة والخدمة المعاصرة.', display_order: 3 },
      { name: 'مكان الكنيسة', slug: 'location', description: 'العنوان الجغرافي وخريطة الكنيسة بسندبيس.', display_order: 4 },
    ],
  },
  {
    name: 'الخدمات الروحية',
    slug: 'spiritual-services',
    description: 'القداسات والاجتماعات والنهضات السنوية والمناسبات الروحية.',
    display_order: 2,
    is_active: true,
    categories: [
      { name: 'القداسات والصلوات', slug: 'masses-prayers', description: 'صلوات القداسات الإلهية والعشيات والتسابيح.', display_order: 1 },
      { name: 'الاجتماعات', slug: 'spiritual-meetings', description: 'اجتماعات الشباب، الخريجين، الأسرات، والسيدات.', display_order: 2 },
      { name: 'المناسبات والنهضات', slug: 'spiritual-events', description: 'نهضات أعياد القديسين وصوم العذراء مريم والصوم الكبير.', display_order: 3 },
    ],
  },
  {
    name: 'التعليم والتنشئة',
    slug: 'education-nurture',
    description: 'التربية الكنسية ومدارس الأحد ومدرسة الشمامسة والدورات.',
    display_order: 3,
    is_active: true,
    categories: [
      { name: 'التربية الكنسية', slug: 'church-education', description: 'تنشئة كنسية إيمانية لأبناء الكنيسة.', display_order: 1 },
      { name: 'مدارس الأحد', slug: 'sunday-school', description: 'فصول مدارس الأحد لكافة المراحل الدراسية.', display_order: 2 },
      { name: 'مدرسة الشمامسة', slug: 'deacons-school', description: 'تعليم الطقوس والألحان واللغة القبطية.', display_order: 3 },
      { name: 'الكورسات', slug: 'educational-courses', description: 'دورات تثقيفية وورش تنمية المهارات.', display_order: 4 },
    ],
  },
  {
    name: 'الأنشطة الكنسية',
    slug: 'church-activities',
    description: 'الكورال، الكشافة البحرية، الرحلات، وبيوت المؤتمرات.',
    display_order: 4,
    is_active: true,
    categories: [
      { name: 'الكورال', slug: 'church-choir', description: 'فرق الكورال والتسابيح والترانيم الكنسية.', display_order: 1 },
      { name: 'الكشافة', slug: 'scouts', description: 'المجموعة الكشفية لبناء النظام والخدمة والروح الانضباطية.', display_order: 2 },
      { name: 'الرحلات', slug: 'trips-tours', description: 'رحلات وزيارات للأديرة والكنائس الأثرية.', display_order: 3 },
      { name: 'بيت الخلوة والمؤتمرات', slug: 'retreat-house', description: 'بيوت الخلوة والمؤتمرات الروحية.', display_order: 4 },
    ],
  },
  {
    name: 'الخدمات العامة والدعم',
    slug: 'public-support-services',
    description: 'العيادات، مكتبات الاستعارة، الاستضافات، وخدمة إخوة الرب.',
    display_order: 5,
    is_active: true,
    categories: [
      { name: 'العيادة', slug: 'medical-clinic', description: 'خدمات عيادات الكنيسة الطبية والرعاية الصحية.', display_order: 1 },
      { name: 'مكتبة الاستعارة', slug: 'lending-library', description: 'استعارة الكتب الروحية والطقسية والآبائية.', display_order: 2 },
      { name: 'الاستضافات', slug: 'hospitality', description: 'استضافة المغتربين والأنشطة الإنسانية.', display_order: 3 },
      { name: 'التبرعات', slug: 'donations-support', description: 'دعم إخوة الرب وخدمة الرعية.', display_order: 4 },
      { name: 'الدفع والتبرع لتطوير المحتوى', slug: 'digital-development-support', description: 'المساهمة في تطوير الخدمات الرقمية ووسائل الإيضاح.', display_order: 5 },
    ],
  },
  {
    name: 'متجر الكنيسة',
    slug: 'church-store',
    description: 'الكانتين والمنتجات الكنسية والألعاب وورش المشغولات.',
    display_order: 6,
    is_active: true,
    categories: [
      { name: 'منتجات الكنيسة والكانتين', slug: 'canteen-products', description: 'منتجات كنسية، كتب صور، وهدايا.', display_order: 1 },
      { name: 'الألعاب الكنسية', slug: 'church-games', description: 'ألعاب ومسابقات كنسية للأطفال.', display_order: 2 },
      { name: 'ورش العمل', slug: 'handicraft-workshops', description: 'مشغولات يدوية وحرفية صنع أبناء الخدمة.', display_order: 3 },
    ],
  },
];

async function seed() {
  console.log('Seeding core sections and categories into Supabase...');

  for (const secData of coreSections) {
    const { categories, ...sectionObj } = secData;

    let { data: existingSec } = await supabase
      .from('sections')
      .select('id')
      .eq('slug', sectionObj.slug)
      .single();

    let sectionId = existingSec?.id;

    if (!sectionId) {
      const { data: insertedSec, error: secErr } = await supabase
        .from('sections')
        .insert(sectionObj)
        .select('id')
        .single();

      if (secErr) {
        console.error(`Failed inserting section ${sectionObj.name}:`, secErr.message);
        continue;
      }
      sectionId = insertedSec.id;
      console.log(`Inserted Section: ${sectionObj.name} (${sectionId})`);
    } else {
      console.log(`Section already exists: ${sectionObj.name} (${sectionId})`);
    }

    for (const catData of categories) {
      const { data: existingCat } = await supabase
        .from('categories')
        .select('id')
        .eq('section_id', sectionId)
        .eq('slug', catData.slug)
        .single();

      if (!existingCat) {
        const { error: catErr } = await supabase.from('categories').insert({
          ...catData,
          section_id: sectionId,
        });
        if (catErr) {
          console.error(`Failed inserting category ${catData.name}:`, catErr.message);
        } else {
          console.log(`  -> Inserted Category: ${catData.name}`);
        }
      } else {
        console.log(`  -> Category exists: ${catData.name}`);
      }
    }
  }

  console.log('Done Seeding!');
}

seed().catch(console.error);
