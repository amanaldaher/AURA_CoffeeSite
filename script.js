// رقم هاتف المدير للواتساب
const ADMIN_WHATSAPP_NUMBER = "963981853998";

// كلمة سر ترخيص الموقع الثابتة
const SYSTEM_MASTER_KEY = "Aura@Homs2026";

// قائمة الأصناف الشاملة (ساخن، بارد، وحلويات ناعمة)
const fullCoffeeMenu = [
    // --- المشروبات الساخنة (Hot Drinks) ---
    { id: 1, category: "hot", name: "Espresso Intenso", desc: "Pure, concentrated single shot of rich dark beans.", basePrice: 2.50, img: "https://images.unsplash.com/photo-1510591509098-f4fdc6d0ff04?w=500&q=80" },
    { id: 2, category: "hot", name: "Spanish Cortado", desc: "Espresso cut with an equal part of warm textured milk.", basePrice: 3.50, img: "https://images.unsplash.com/photo-1534778101976-62847782c213?w=500&q=80" },
    { id: 3, category: "hot", name: "Velvet Flat White", desc: "Double shot espresso folded into silky microfoam.", basePrice: 4.20, img: "https://images.unsplash.com/photo-1577968897966-3d4325b36b61?w=500&q=80" },
    { id: 4, category: "hot", name: "Classic Cappuccino", desc: "Espresso, hot milk, and deep steamed foam blanket.", basePrice: 4.00, img: "https://images.unsplash.com/photo-1572442388796-11668a67e53d?w=500&q=80" },
    { id: 5, category: "hot", name: "Traditional Turkish Coffee", desc: "Finely ground unfiltered coffee with dense rich foam.", basePrice: 3.00, img: "https://images.unsplash.com/photo-1544787219-7f47ccb76574?w=500&q=80" },

    // --- المشروبات الباردة (Cold Drinks) ---
    { id: 6, category: "cold", name: "Iced Caramel Latte", desc: "Chilled espresso, milk, and rich caramel syrup over ice.", basePrice: 4.80, img: "https://images.unsplash.com/photo-1593443320739-77f74939d0da?w=500&q=80" },
    { id: 7, category: "cold", name: "Cold Brew Reserve", desc: "Steeped cold for 24 hours with delicate dark cocoa notes.", basePrice: 4.50, img: "https://images.unsplash.com/photo-1517701550927-30cf4ba1dba5?w=500&q=80" },
    { id: 8, category: "cold", name: "Whipped Nescafé Frappé", desc: "Sweet whipped instant coffee foam over ice and milk.", basePrice: 3.80, img: "https://images.unsplash.com/photo-1461023058943-07fcbe16d735?w=500&q=80" },
    { id: 9, category: "cold", name: "Iced Spanish Latte", desc: "Espresso with sweetened condensed milk on the rocks.", basePrice: 4.90, img: "https://images.unsplash.com/photo-1551030173-122aabc4489c?w=500&q=80" },

    // --- ضيافة وحلويات خفيفة ناعمة (Sweet Bites) ---
    { id: 10, category: "bites", name: "Artisan Macarons (2 Pcs)", desc: "Delicate French almond shells with vanilla & hazelnut ganache.", basePrice: 3.20, img: "https://images.unsplash.com/photo-1569864358642-9d1684040f43?w=500&q=80" },
    { id: 11, category: "bites", name: "Mini Butter Croissant", desc: "Flaky, golden French pastry baked fresh with sweet butter.", basePrice: 2.20, img: "https://images.unsplash.com/photo-1555507036-ab1f4038808a?w=500&q=80" },
    { id: 12, category: "bites", name: "Dark Chocolate Truffles", desc: "Velvety hand-rolled cocoa bites, the perfect coffee companion.", basePrice: 2.80, img: "https://images.unsplash.com/photo-1549007994-cb92caebd54b?w=500&q=80" },
    { id: 13, category: "bites", name: "Almond Biscotti (Cantucci)", desc: "Twice-baked classic Italian crunchy biscuits for dipping.", basePrice: 2.00, img: "https://images.unsplash.com/photo-1509440159596-0249088772ff?w=500&q=80" }
];

let currentCategory = 'hot';
let cart = [];
let activeCoffee = null;

// التهيئة عند تحميل الصفحة
window.addEventListener('DOMContentLoaded', () => {
    renderMenu();
    loadProfile();
    loadTheme();
});

// فتح وإغلاق النوافذ
function toggleModal(modalId) {
    document.getElementById(modalId).classList.toggle('hidden');
}

function toggleCart() {
    document.getElementById('cart-drawer').classList.toggle('hidden');
}

// عرض الأصناف مع تطبيق حركة الانسياب (Smooth Fade-in)
function renderMenu() {
    const grid = document.getElementById('coffee-grid');
    const filteredItems = fullCoffeeMenu.filter(item => item.category === currentCategory);

    grid.classList.remove('fade-in-cards');
    void grid.offsetWidth; // إعادة تشغيل الأنيميشن (Reflow)

    grid.innerHTML = filteredItems.map(c => `
        <div class="coffee-card">
            <img src="${c.img}" alt="${c.name}" class="card-img" loading="lazy">
            <div class="card-info">
                <h3>${c.name}</h3>
                <p>${c.desc}</p>
                <div class="card-bottom">
                    <span class="card-price">$${c.basePrice.toFixed(2)}</span>
                    <button class="gold-btn btn-sm" onclick="openCustomizer(${c.id})">Order</button>
                </div>
            </div>
        </div>
    `).join('');

    grid.classList.add('fade-in-cards');
}

// التبديل بين الأقسام
function filterCategory(cat) {
    if (currentCategory === cat) return;
    currentCategory = cat;

    document.querySelectorAll('.tab-btn').forEach(btn => btn.classList.remove('active'));
    if (event && event.currentTarget) {
        event.currentTarget.classList.add('active');
    }
    renderMenu();
}

// تخصيص الطلب
function openCustomizer(id) {
    activeCoffee = fullCoffeeMenu.find(c => c.id === id);
    document.getElementById('modal-title').textContent = activeCoffee.name;
    document.getElementById('modal-desc').textContent = activeCoffee.desc;
    
    document.getElementById('size-m').checked = true;
    document.getElementById('milk-select').selectedIndex = 0;
    document.getElementById('sugar-select').selectedIndex = 0;
    document.querySelectorAll('.checkboxes input').forEach(b => b.checked = false);
    
    calculateModalPrice();
    toggleModal('customize-modal');
}

function calculateModalPrice() {
    if (!activeCoffee) return 0;
    let total = activeCoffee.basePrice;
    
    if (activeCoffee.category !== 'bites') {
        const size = document.querySelector('input[name="coffee-size"]:checked').value;
        if (size === 'Small') total -= 0.50;
        if (size === 'Large') total += 1.00;

        total += parseFloat(document.getElementById('milk-select').selectedOptions[0].dataset.price || 0);

        document.querySelectorAll('.checkboxes input:checked').forEach(box => {
            total += parseFloat(box.dataset.price || 0);
        });
    }

    document.getElementById('confirm-add-btn').textContent = `Add to Bag - $${total.toFixed(2)}`;
    return total;
}

document.querySelectorAll('input[name="coffee-size"], #milk-select, .checkboxes input').forEach(el => {
    el.addEventListener('change', calculateModalPrice);
});

// إضافة الطلب إلى السلة
document.getElementById('confirm-add-btn').addEventListener('click', () => {
    const extras = [];
    document.querySelectorAll('.checkboxes input:checked').forEach(b => {
        extras.push(b.parentElement.textContent.split('(')[0].trim());
    });

    const isBite = activeCoffee.category === 'bites';

    cart.push({
        name: activeCoffee.name,
        size: isBite ? 'Standard' : document.querySelector('input[name="coffee-size"]:checked').value,
        milk: isBite ? 'N/A' : document.getElementById('milk-select').value,
        sugar: isBite ? 'N/A' : document.getElementById('sugar-select').value,
        extras: isBite ? 'None' : (extras.join(', ') || 'None'),
        price: calculateModalPrice()
    });

    updateCartUI();
    toggleModal('customize-modal');
    toggleCart();
});

function updateCartUI() {
    document.getElementById('cart-count').textContent = cart.length;
    const container = document.getElementById('cart-items');
    let sum = 0;

    if (cart.length === 0) {
        container.innerHTML = `<p style="text-align:center; color:var(--text-muted); margin-top:20px;">Bag is empty.</p>`;
        document.getElementById('cart-total-price').textContent = '$0.00';
        return;
    }

    container.innerHTML = cart.map((item, idx) => {
        sum += item.price;
        return `
            <div class="cart-item">
                <div class="item-details">
                    <h4>${item.name} (${item.size})</h4>
                    <p>${item.milk} | ${item.sugar}</p>
                    <p style="color:var(--accent);">Extras: ${item.extras}</p>
                </div>
                <div>
                    <span class="item-price">$${item.price.toFixed(2)}</span>
                    <button onclick="removeFromCart(${idx})" style="background:none; border:none; color:#ff4444; margin-left:8px; cursor:pointer;"><i class="fa-solid fa-trash"></i></button>
                </div>
            </div>
        `;
    }).join('');

    document.getElementById('cart-total-price').textContent = `$${sum.toFixed(2)}`;
}

function removeFromCart(idx) {
    cart.splice(idx, 1);
    updateCartUI();
}

// إرسال الطلب وحفظه بالداشبورد وفتح الواتساب
function checkoutWhatsApp() {
    if (cart.length === 0) return alert("Your bag is empty!");

    const user = JSON.parse(localStorage.getItem('aura_cust_profile')) || {
        name: "Guest Customer",
        phone: "Not provided",
        email: "Not provided"
    };

    let total = 0;
    let orderDetailsText = "";

    cart.forEach((c, i) => {
        total += c.price;
        orderDetailsText += `${i + 1}. *${c.name}* (${c.size})\n   - Options: ${c.milk} | ${c.sugar}\n   - Extras: ${c.extras}\n   - Price: $${c.price.toFixed(2)}\n`;
    });

    const ordersHistory = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    const newOrder = {
        date: new Date().toLocaleString(),
        customer: user.name,
        phone: user.phone,
        email: user.email,
        details: orderDetailsText.replace(/\n/g, "<br>"),
        total: `$${total.toFixed(2)}`
    };
    ordersHistory.unshift(newOrder);
    localStorage.setItem('aura_orders', JSON.stringify(ordersHistory));

    const message = `*☕ New Order - AURA*\n\n*Customer:* ${user.name}\n*Phone:* ${user.phone}\n*Email:* ${user.email}\n\n*Order Items:*\n${orderDetailsText}\n*Total Amount:* $${total.toFixed(2)}\n\nThank you!`;
    const whatsappUrl = `https://wa.me/${ADMIN_WHATSAPP_NUMBER}?text=${encodeURIComponent(message)}`;

    cart = [];
    updateCartUI();
    toggleCart();
    window.open(whatsappUrl, '_blank');
}

// حفظ وتعديل البروفايل والصورة الشخصية
document.getElementById('avatar-input').addEventListener('change', function() {
    const file = this.files[0];
    if (file) {
        const reader = new FileReader();
        reader.onload = (e) => document.getElementById('profile-preview').src = e.target.result;
        reader.readAsDataURL(file);
    }
});

document.getElementById('profile-form').addEventListener('submit', (e) => {
    e.preventDefault();
    const profile = {
        name: document.getElementById('cust-name').value,
        phone: document.getElementById('cust-phone').value,
        email: document.getElementById('cust-email').value,
        avatar: document.getElementById('profile-preview').src
    };
    localStorage.setItem('aura_cust_profile', JSON.stringify(profile));
    loadProfile();
    toggleModal('profile-modal');
});

function loadProfile() {
    const profile = JSON.parse(localStorage.getItem('aura_cust_profile'));
    if (profile) {
        document.getElementById('nav-username').textContent = profile.name;
        document.getElementById('nav-avatar').src = profile.avatar;
        document.getElementById('cust-name').value = profile.name;
        document.getElementById('cust-phone').value = profile.phone;
        document.getElementById('cust-email').value = profile.email;
        document.getElementById('profile-preview').src = profile.avatar;
    }
}

// نظام الثيمات
function changeTheme(themeName) {
    document.body.className = themeName;
    localStorage.setItem('aura_theme', themeName);
}

function loadTheme() {
    const saved = localStorage.getItem('aura_theme') || 'theme-dark';
    document.body.className = saved;
    document.getElementById('theme-select').value = saved;
}

// صلاحيات ودخول الداشبورد
function openAdminPortal() {
    toggleModal('admin-auth-modal');
}

document.getElementById('admin-login-form').addEventListener('submit', (e) => {
    e.preventDefault();

    const enteredKey = document.getElementById('admin-license-key').value;
    const name = document.getElementById('admin-name').value;
    const nid = document.getElementById('admin-nid').value;
    const email = document.getElementById('admin-email').value;

    if (enteredKey === SYSTEM_MASTER_KEY) {
        const activeAdmin = {
            name: name,
            nationalId: nid,
            email: email,
            loginTime: new Date().toLocaleString()
        };
        localStorage.setItem('aura_active_manager', JSON.stringify(activeAdmin));

        toggleModal('admin-auth-modal');
        document.getElementById('store-view').classList.add('hidden');
        document.getElementById('admin-view').classList.remove('hidden');

        renderAdminDashboard();
        
        document.getElementById('admin-license-key').value = '';
        document.getElementById('admin-email-pass').value = '';
    } else {
        alert("خطأ: مفتاح ترخيص الموقع غير صحيح! يرجى مراجعة مبرمجة النظام. ❌");
    }
});

function renderAdminDashboard() {
    const manager = JSON.parse(localStorage.getItem('aura_active_manager')) || { name: "Admin", nationalId: "---", email: "---" };
    
    const adminHeader = document.querySelector('.admin-header h2');
    if (adminHeader) {
        adminHeader.innerHTML = `Store Management | <span style="color:var(--accent); font-size:16px;">Manager: ${manager.name} (ID: ${manager.nationalId})</span>`;
    }

    const orders = JSON.parse(localStorage.getItem('aura_orders') || '[]');
    const tbody = document.getElementById('orders-table-body');
    
    if (orders.length === 0) {
        tbody.innerHTML = `<tr><td colspan="6" style="text-align:center;">No orders recorded yet.</td></tr>`;
        return;
    }

    tbody.innerHTML = orders.map(o => `
        <tr>
            <td>${o.date}</td>
            <td><strong>${o.customer}</strong></td>
            <td><a href="https://wa.me/${o.phone.replace(/[^0-9]/g, '')}" target="_blank" style="color:var(--accent);">${o.phone}</a></td>
            <td>${o.email}</td>
            <td>${o.details}</td>
            <td><strong>${o.total}</strong></td>
        </tr>
    `).join('');
}
// دالة بدء التجربة وإخفاء شاشة البداية بنعومة
function startAppExperience() {
    const introScreen = document.getElementById('intro-screen');
    introScreen.classList.add('hide-intro');

    // إذا المستخدم مو مسجل اسمه من قبل، منفتحله نافذة البروفايل تلقائياً بعد ثانية
    setTimeout(() => {
        const savedProfile = localStorage.getItem('aura_cust_profile');
        if (!savedProfile) {
            toggleModal('profile-modal');
        }
    }, 700);
}
function exitAdmin() {
    document.getElementById('admin-view').classList.add('hidden');
    document.getElementById('store-view').classList.remove('hidden');
}
