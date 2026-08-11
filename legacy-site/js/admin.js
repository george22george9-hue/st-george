// Admin Dashboard Logic

const API_BASE = '/api';
let currentToken = localStorage.getItem('admin_token');

// DOM Elements
const loginSection = document.getElementById('login-section');
const dashboardSection = document.getElementById('dashboard-section');
const loginForm = document.getElementById('login-form');
const loginError = document.getElementById('login-error');
const saveStatus = document.getElementById('save-status');

// Initialize
if (currentToken) {
    showDashboard();
}

// Login
loginForm.addEventListener('submit', async (e) => {
    e.preventDefault();
    const username = document.getElementById('username').value;
    const password = document.getElementById('password').value;

    try {
        const res = await fetch(`${API_BASE}/login`, {
            method: 'POST',
            headers: { 'Content-Type': 'application/json' },
            body: JSON.stringify({ username, password })
        });
        
        const data = await res.json();
        
        if (res.ok) {
            currentToken = data.token;
            localStorage.setItem('admin_token', currentToken);
            showDashboard();
        } else {
            loginError.textContent = data.error;
            loginError.classList.remove('hidden');
        }
    } catch (err) {
        loginError.textContent = 'حدث خطأ في الاتصال بالخادم';
        loginError.classList.remove('hidden');
    }
});

// Logout
document.getElementById('logout-btn').addEventListener('click', () => {
    localStorage.removeItem('admin_token');
    currentToken = null;
    dashboardSection.classList.add('hidden');
    loginSection.classList.remove('hidden');
});

// Tab Switching
document.querySelectorAll('.sidebar a[data-target]').forEach(link => {
    link.addEventListener('click', (e) => {
        e.preventDefault();
        
        // Update active class
        document.querySelectorAll('.sidebar a').forEach(a => a.classList.remove('active'));
        e.currentTarget.classList.add('active');
        
        // Show target tab
        document.querySelectorAll('.tab-content').forEach(tab => tab.classList.add('hidden'));
        document.getElementById(e.currentTarget.dataset.target).classList.remove('hidden');
        
        // Update Title
        document.getElementById('dashboard-title').textContent = e.currentTarget.textContent;
    });
});

// Load Dashboard Data
async function showDashboard() {
    loginSection.classList.add('hidden');
    dashboardSection.classList.remove('hidden');
    
    await loadPages();
    await loadServices();
}

// Show success message
function showSuccess() {
    saveStatus.style.opacity = '1';
    setTimeout(() => { saveStatus.style.opacity = '0'; }, 3000);
}

// --- Pages Logic ---
async function loadPages() {
    const res = await fetch(`${API_BASE}/pages`);
    const pages = await res.json();
    
    const list = document.getElementById('pages-list');
    list.innerHTML = '';
    
    pages.forEach(page => {
        const a = document.createElement('a');
        a.className = 'list-group-item list-group-item-action cursor-pointer';
        a.textContent = page.title;
        a.onclick = () => editPage(page);
        list.appendChild(a);
    });
}

function editPage(page) {
    document.getElementById('page-editor').classList.remove('hidden');
    document.getElementById('edit-page-id').value = page.id;
    document.getElementById('edit-page-title').value = page.title;
    document.getElementById('edit-page-content').value = page.content;
    
    // Highlight active list item
    const items = document.getElementById('pages-list').children;
    for(let item of items) {
        if(item.textContent === page.title) item.classList.add('active');
        else item.classList.remove('active');
    }
}

document.getElementById('page-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-page-id').value;
    const title = document.getElementById('edit-page-title').value;
    const content = document.getElementById('edit-page-content').value;

    const res = await fetch(`${API_BASE}/pages/${id}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ title, content })
    });

    if (res.ok) {
        showSuccess();
        loadPages();
    } else if (res.status === 401 || res.status === 403) {
        alert('انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مجدداً');
        document.getElementById('logout-btn').click();
    }
});

// --- Services Logic ---
async function loadServices() {
    const res = await fetch(`${API_BASE}/services`);
    const groupedServices = await res.json();
    
    const list = document.getElementById('services-list');
    list.innerHTML = '';
    
    groupedServices.forEach(group => {
        // Group Header
        const header = document.createElement('div');
        header.className = 'list-group-item bg-light fw-bold text-primary';
        header.textContent = group.title;
        list.appendChild(header);
        
        group.items.forEach(item => {
            const a = document.createElement('a');
            a.className = 'list-group-item list-group-item-action ps-4 cursor-pointer';
            a.innerHTML = `<i class="fas ${item.icon} me-2 text-muted"></i> ${item.name}`;
            a.onclick = async () => {
                // Fetch full details
                const detailRes = await fetch(`${API_BASE}/services/${item.id}`);
                const fullService = await detailRes.json();
                editService(fullService, a);
            };
            list.appendChild(a);
        });
    });
}

function editService(service, linkElement) {
    document.getElementById('service-editor').classList.remove('hidden');
    document.getElementById('edit-service-id').value = service.id;
    document.getElementById('edit-service-name').value = service.name;
    document.getElementById('edit-service-icon').value = service.icon;
    document.getElementById('edit-service-content').value = service.content;
    
    // Highlight active list item
    const items = document.getElementById('services-list').children;
    for(let item of items) {
        item.classList.remove('active');
    }
    linkElement.classList.add('active');
}

document.getElementById('service-form').addEventListener('submit', async (e) => {
    e.preventDefault();
    const id = document.getElementById('edit-service-id').value;
    const name = document.getElementById('edit-service-name').value;
    const icon = document.getElementById('edit-service-icon').value;
    const content = document.getElementById('edit-service-content').value;

    const res = await fetch(`${API_BASE}/services/${id}`, {
        method: 'POST',
        headers: { 
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${currentToken}`
        },
        body: JSON.stringify({ name, icon, content })
    });

    if (res.ok) {
        showSuccess();
        loadServices();
    } else if (res.status === 401 || res.status === 403) {
        alert('انتهت صلاحية الجلسة، الرجاء تسجيل الدخول مجدداً');
        document.getElementById('logout-btn').click();
    }
});
