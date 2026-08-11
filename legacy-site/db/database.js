const sqlite3 = require('sqlite3').verbose();
const { open } = require('sqlite');
const bcrypt = require('bcryptjs');

async function initDB() {
    const db = await open({
        filename: './stgeorge.db',
        driver: sqlite3.Database
    });

    // Create Tables
    await db.exec(`
        CREATE TABLE IF NOT EXISTS users (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            username TEXT UNIQUE,
            password TEXT
        );

        CREATE TABLE IF NOT EXISTS pages (
            id TEXT PRIMARY KEY,
            title TEXT,
            content TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );

        CREATE TABLE IF NOT EXISTS services (
            id INTEGER PRIMARY KEY AUTOINCREMENT,
            category TEXT,
            name TEXT,
            icon TEXT,
            content TEXT,
            updated_at DATETIME DEFAULT CURRENT_TIMESTAMP
        );
    `);

    // Seed Admin User (admin / admin123)
    const adminExists = await db.get('SELECT * FROM users WHERE username = ?', ['admin']);
    if (!adminExists) {
        const hash = await bcrypt.hash('admin123', 10);
        await db.run('INSERT INTO users (username, password) VALUES (?, ?)', ['admin', hash]);
    }

    // Seed Pages
    const pages = [
        { id: 'home', title: 'الرئيسية', content: 'مرحباً بكم في كنيسة الشهيد العظيم مارجرجس بسندبيس.' },
        { id: 'about', title: 'عن الكنيسة', content: 'كنيسة الشهيد العظيم مارجرجس بسندبيس هي إحدى كنائس إيبارشية شبرا الخيمة وتوابعها...' },
        { id: 'masses', title: 'المواعيد', content: 'الجمعة: 6 ص - 8:30 ص\nالأحد: 7 ص - 9:30 ص' },
        { id: 'donate', title: 'تبرع', content: 'فودافون كاش: 000000000\nبنك أهلي: EG000000000000000000' }
    ];

    for (let p of pages) {
        const exists = await db.get('SELECT id FROM pages WHERE id = ?', [p.id]);
        if (!exists) {
            await db.run('INSERT INTO pages (id, title, content) VALUES (?, ?, ?)', [p.id, p.title, p.content]);
        }
    }

    // Seed 23 Services
    const initialServices = [
        { category: "عن الكنيسة", items: [
            { name: "تعريف عن الكنيسة", icon: "fa-church" },
            { name: "نبذة عن تاريخ الكنيسة", icon: "fa-history" },
            { name: "الكنيسة الأثرية", icon: "fa-landmark" },
            { name: "مكان الكنيسة", icon: "fa-map-marker-alt" }
        ]},
        { category: "الخدمات الروحية", items: [
            { name: "القداسات والصلوات", icon: "fa-pray" },
            { name: "الاجتماعات", icon: "fa-users" },
            { name: "المناسبات والنهضات", icon: "fa-calendar-alt" }
        ]},
        { category: "التعليم والتنشئة", items: [
            { name: "التربية الكنسية", icon: "fa-child" },
            { name: "مدارس الأحد", icon: "fa-book-open" },
            { name: "مدرسة الشمامسة", icon: "fa-music" },
            { name: "الكورسات", icon: "fa-laptop-code" }
        ]},
        { category: "الأنشطة الكنسية", items: [
            { name: "الكورال", icon: "fa-microphone" },
            { name: "الكشافة", icon: "fa-campground" },
            { name: "الرحلات", icon: "fa-bus" },
            { name: "بيت الخلوة والمؤتمرات", icon: "fa-home" }
        ]},
        { category: "الخدمات العامة والدعم", items: [
            { name: "العيادة", icon: "fa-clinic-medical" },
            { name: "مكتبة الاستعارة", icon: "fa-book" },
            { name: "الاستضافات", icon: "fa-bed" },
            { name: "التبرعات", icon: "fa-hand-holding-heart" },
            { name: "الدفع والتبرع لتطوير المحتوى", icon: "fa-credit-card" }
        ]},
        { category: "متجر الكنيسة", items: [
            { name: "منتجات الكنيسة والكانتين", icon: "fa-shopping-basket" },
            { name: "الألعاب الكنسية", icon: "fa-puzzle-piece" },
            { name: "ورش العمل", icon: "fa-tools" }
        ]}
    ];

    const servicesCount = await db.get('SELECT COUNT(*) as count FROM services');
    if (servicesCount.count === 0) {
        for (let group of initialServices) {
            for (let item of group.items) {
                await db.run(
                    'INSERT INTO services (category, name, icon, content) VALUES (?, ?, ?, ?)', 
                    [group.category, item.name, item.icon, `مرحباً بك في صفحة ${item.name}. (محتوى تجريبي قابل للتعديل)`]
                );
            }
        }
    }

    return db;
}

module.exports = { initDB };
