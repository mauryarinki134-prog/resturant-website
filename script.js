// ═══════════════════════════════════════════
// SCROLL-BASED CANVAS ANIMATION
// ═══════════════════════════════════════════
const canvas = document.getElementById('scroll-canvas');
const ctx = canvas.getContext('2d');
const FRAME_COUNT = 240;
const isMobile = () => window.innerWidth < 768;

// Set canvas to cover full viewport
function resizeCanvas() {
    canvas.width  = window.innerWidth;
    canvas.height = window.innerHeight;
    if (currentImg && currentImg.complete) {
        drawImage(currentImg);
    }
}

function drawImage(img) {
    if (!img || !img.complete) return;
    const canvasAspect = canvas.width / canvas.height;
    const imgAspect    = img.naturalWidth / img.naturalHeight;
    let sx = 0, sy = 0, sw = img.naturalWidth, sh = img.naturalHeight;

    if (imgAspect > canvasAspect) {
        sw = img.naturalHeight * canvasAspect;
        sx = (img.naturalWidth - sw) / 2;
    } else {
        sh = img.naturalWidth / canvasAspect;
        sy = (img.naturalHeight - sh) / 2;
    }
    ctx.clearRect(0, 0, canvas.width, canvas.height);
    ctx.drawImage(img, sx, sy, sw, sh, 0, 0, canvas.width, canvas.height);
}

// Preload all frames
const frames = new Array(FRAME_COUNT + 1);
let loadedCount = 0;
let currentImg = null;

function framePath(n) {
    return `frames/frame_${String(n).padStart(6, '0')}.jpg`;
}

// Load first frame immediately
frames[1] = new Image();
frames[1].onload = function() {
    currentImg = frames[1];
    resizeCanvas();
};
frames[1].src = framePath(1);

// Preload rest
for (let i = 2; i <= FRAME_COUNT; i++) {
    frames[i] = new Image();
    frames[i].src = framePath(i);
}

// Map scroll position to frame
let ticking = false;
window.addEventListener('scroll', () => {
    if (!ticking) {
        requestAnimationFrame(updateFrame);
        ticking = true;
    }
}, { passive: true });

function updateFrame() {
    const scrollY   = window.scrollY;
    const maxScroll = document.body.scrollHeight - window.innerHeight;
    if (maxScroll <= 0) { ticking = false; return; }

    const progress   = Math.min(1, Math.max(0, scrollY / maxScroll));
    const frameIndex = Math.min(FRAME_COUNT, Math.max(1, Math.round(progress * FRAME_COUNT)));
    const img        = frames[frameIndex];

    if (img && img.complete) {
        currentImg = img;
        drawImage(img);
    }
    ticking = false;
}

window.addEventListener('resize', resizeCanvas);


// ═══════════════════════════════════════════
// RESTAURANT DATA (from restaurantData.ts)
// ═══════════════════════════════════════════
const CATEGORIES = [
    { id: 'pizza',    name: 'PIZZA',    count: 15, image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=600&q=80' },
    { id: 'burgers',  name: 'BURGERS',  count: 12, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=600&q=80' },
    { id: 'pasta',    name: 'PASTA',    count: 10, image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=600&q=80' },
    { id: 'salads',   name: 'SALADS',   count:  9, image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=600&q=80' },
    { id: 'desserts', name: 'DESSERTS', count:  8, image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=600&q=80' },
    { id: 'drinks',   name: 'DRINKS',   count: 20, image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=600&q=80' },
];

const MENU_ITEMS = [
    { id: 'p1',  name: 'Margherita di Bufala Classica', category: 'pizza',    price: 24, rating: 4.9, calories: 780, special: true,  veg: true,  image: 'https://images.unsplash.com/photo-1604382355076-af4b0eb60143?auto=format&fit=crop&w=800&q=80', desc: 'San Marzano tomatoes, buffalo mozzarella D.O.P., fresh sweet basil, cold-pressed olive oil.' },
    { id: 'p2',  name: 'Tartufo Nero & Wild Mushroom',  category: 'pizza',    price: 29, rating: 5.0, calories: 850, special: true,  veg: true,  image: 'https://images.unsplash.com/photo-1513104890138-7c749659a591?auto=format&fit=crop&w=800&q=80', desc: 'Black truffle crema, fior di latte, foraged porcini, fontina cheese, fresh thyme.' },
    { id: 'p3',  name: 'Diavola & Calabrian Nduja',     category: 'pizza',    price: 26, rating: 4.8, calories: 920, special: false, veg: false, image: 'https://images.unsplash.com/photo-1534308983496-4fabb1a015ee?auto=format&fit=crop&w=800&q=80', desc: 'Spicy soppressata salami, whipped ricotta, Calabrian hot honey.' },
    { id: 'b1',  name: 'The Savoria Wagyu Royale',       category: 'burgers',  price: 28, rating: 5.0, calories: 1050, special: true, veg: false, image: 'https://images.unsplash.com/photo-1568901346375-23c9450c58cd?auto=format&fit=crop&w=800&q=80', desc: '8oz A5 Wagyu beef patty, caramelized balsamic shallots, 24-month aged Gruyère, truffle aioli.' },
    { id: 'b2',  name: 'Smoked Oak Bacon & Cheddar',    category: 'burgers',  price: 24, rating: 4.8, calories: 980,  special: false, veg: false, image: 'https://images.unsplash.com/photo-1586190848861-99aa4a171e90?auto=format&fit=crop&w=800&q=80', desc: 'Prime Angus beef, double smoked maple bacon, Wisconsin sharp white cheddar.' },
    { id: 'pa1', name: 'Signature Truffle Tagliatelle',  category: 'pasta',    price: 32, rating: 5.0, calories: 720,  special: true,  veg: true,  image: 'https://images.unsplash.com/photo-1621996346565-e3d5d6281290?auto=format&fit=crop&w=800&q=80', desc: 'Hand-rolled egg ribbon pasta, 36-month Parmigiano-Reggiano, freshly shaved Norcia black truffles.' },
    { id: 'pa2', name: 'Spaghetti ai Frutti di Mare',   category: 'pasta',    price: 36, rating: 4.9, calories: 680,  special: false, veg: false, image: 'https://images.unsplash.com/photo-1563379091339-03b21ab4a4f8?auto=format&fit=crop&w=800&q=80', desc: 'Wild tiger prawns, Mediterranean calamari, Manila clams, white wine reduction.' },
    { id: 's1',  name: 'Burrata Pugliese & Heirlooms',  category: 'salads',   price: 22, rating: 4.9, calories: 450,  special: false, veg: true,  image: 'https://images.unsplash.com/photo-1540420773420-3366772f4999?auto=format&fit=crop&w=800&q=80', desc: 'Artisanal creamy burrata, tri-color heirloom tomatoes, 18-year Modena balsamic glaze.' },
    { id: 's2',  name: 'Gourmet Caesar Royale',         category: 'salads',   price: 19, rating: 4.7, calories: 390,  special: false, veg: false, image: 'https://images.unsplash.com/photo-1512621776951-a57141f2eefd?auto=format&fit=crop&w=800&q=80', desc: 'Crispy baby gem lettuce, garlic herb brioche croutons, Spanish white anchovy dressing.' },
    { id: 'd1',  name: 'Valrhona Grand Cru Lava Gateau', category: 'desserts', price: 18, rating: 5.0, calories: 620,  special: true,  veg: true,  image: 'https://images.unsplash.com/photo-1578985545062-69928b1d9587?auto=format&fit=crop&w=800&q=80', desc: 'Warm molten 70% dark Belgian chocolate, wild raspberry compote, Madagascar vanilla gelato.' },
    { id: 'd2',  name: 'Classic Venetian Tiramisu',     category: 'desserts', price: 16, rating: 4.9, calories: 510,  special: false, veg: true,  image: 'https://images.unsplash.com/photo-1571877227200-a0d98ea607e9?auto=format&fit=crop&w=800&q=80', desc: 'Espresso-soaked Savoiardi, velvety mascarpone cream, dark cocoa dust, Amaretto hint.' },
    { id: 'dr1', name: 'Smoked Ruby Savoria Negroni',   category: 'drinks',   price: 20, rating: 4.9, calories: null, special: true,  veg: true,  image: 'https://images.unsplash.com/photo-1551024709-8f23befc6f87?auto=format&fit=crop&w=800&q=80', desc: 'Botanical gin, Carpano Antica vermouth, Campari, cedarwood smoke, blood orange peel.' },
    { id: 'dr2', name: 'Château Grand Réserve 2018',    category: 'drinks',   price: 26, rating: 5.0, calories: null, special: false, veg: true,  image: 'https://images.unsplash.com/photo-1510812431401-41d2bd2722f3?auto=format&fit=crop&w=800&q=80', desc: 'Full-bodied Napa Valley vintage with notes of blackberry, toasted oak and dark chocolate.' },
];


// ═══════════════════════════════════════════
// CART STATE
// ═══════════════════════════════════════════
let cart = [];
let activeCategory = 'all';

function cartTotal() {
    return cart.reduce((sum, ci) => sum + ci.price * ci.qty, 0);
}

function updateCartBadge() {
    const badge = document.getElementById('cart-badge');
    const count = cart.reduce((s, ci) => s + ci.qty, 0);
    badge.textContent = count;
    badge.classList.toggle('hidden', count === 0);
}

window.addToCart = function(id) {
    const item = MENU_ITEMS.find(m => m.id === id);
    if (!item) return;
    const existing = cart.find(ci => ci.id === id);
    if (existing) {
        existing.qty++;
    } else {
        cart.push({ id, name: item.name, price: item.price, qty: 1 });
    }
    updateCartBadge();
    showNotification(`🍽️ ${item.name} added!`);
};


// ═══════════════════════════════════════════
// MENU RENDERING
// ═══════════════════════════════════════════
window.selectCategory = function(catId) {
    activeCategory = catId;
    renderCategories();
    renderMenu();
    if (catId !== 'all') {
        document.getElementById('menu').scrollIntoView({ behavior: 'smooth' });
    }
};

function renderCategories() {
    const container = document.getElementById('categories-container');
    const mobile = window.innerWidth < 640;
    const circleSize = mobile ? 'w-20 h-20' : 'w-28 h-28';
    const wrapSize  = mobile ? 'w-[86px] h-[86px]' : 'w-28 h-28';
    container.innerHTML = CATEGORIES.map(cat => {
        const active = activeCategory === cat.id;
        return `
        <button onclick="selectCategory('${cat.id}')" class="cat-btn flex flex-col items-center text-center group ${active ? 'active' : ''}">
            <div class="${wrapSize} rounded-full p-1 sm:p-1.5 ${active ? 'ring-2 ring-[#e5a853] shadow-[0_0_24px_rgba(229,168,83,0.4)]' : 'ring-1 ring-[#3a2d24] hover:ring-[#d4a373]'} transition-all duration-300">
                <div class="w-full h-full rounded-full overflow-hidden border border-[#2c221a] bg-[#14100e]">
                    <img src="${cat.image}" alt="${cat.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500" loading="lazy">
                </div>
            </div>
            <h3 class="mt-2 sm:mt-3 font-cinzel text-[10px] sm:text-sm font-bold tracking-[0.15em] ${active ? 'text-[#e5a853]' : 'text-[#f5efe6] group-hover:text-[#d4a373]'} transition-colors">${cat.name}</h3>
            <span class="text-[9px] sm:text-[11px] text-[#9e9183] mt-0.5">${cat.count} Items</span>
            <div class="mt-1.5 h-px transition-all duration-300 ${active ? 'w-8 bg-[#e5a853]' : 'w-4 bg-[#6e1e2b] group-hover:w-6 group-hover:bg-[#d4a373]'}"></div>
        </button>`;
    }).join('');
}

function renderMenu() {
    const filtered = activeCategory === 'all' 
        ? MENU_ITEMS 
        : MENU_ITEMS.filter(m => m.category === activeCategory);

    const titleEl = document.getElementById('cat-title');
    const viewAllBtn = document.getElementById('view-all-btn');
    
    titleEl.textContent = activeCategory === 'all'
        ? "CHEF'S COMPLETE SELECTION"
        : `${activeCategory.toUpperCase()} SPECIALS`;
    
    viewAllBtn.classList.toggle('hidden', activeCategory === 'all');

    const grid = document.getElementById('menu-grid');
    grid.innerHTML = filtered.map(item => `
        <div class="menu-card flex gap-4 p-5 rounded-xl bg-black/40 border border-[#2a221c] backdrop-blur-sm cursor-pointer" onclick="addToCart('${item.id}')">
            <div class="relative w-28 h-28 shrink-0 rounded-lg overflow-hidden border border-[#2f251f] bg-[#181310]">
                <img src="${item.image}" alt="${item.name}" class="w-full h-full object-cover group-hover:scale-110 transition-transform duration-500">
                ${item.special ? '<span class="absolute top-1 left-1 bg-[#8c1d2d] text-white text-[9px] font-bold px-1.5 py-0.5 rounded">CHEF\'S PICK</span>' : ''}
            </div>
            <div class="flex-1 min-w-0">
                <div class="flex items-start justify-between gap-2">
                    <h4 class="font-serif text-base font-medium text-[#fcf9f2] hover:text-[#e5a853] transition-colors truncate">${item.name}</h4>
                    <span class="font-cinzel font-bold text-[#d4a373] text-base shrink-0">$${item.price}</span>
                </div>
                <p class="text-xs text-[#9f9488] mt-1.5 leading-relaxed line-clamp-2">${item.desc}</p>
                <div class="flex items-center justify-between mt-3 pt-2 border-t border-[#1e1713]">
                    <div class="flex items-center gap-2">
                        <span class="text-[#e5a853] text-xs">★ ${item.rating}</span>
                        ${item.veg ? '<span class="text-[10px] bg-[#1c2e1c] text-[#74c67a] px-2 py-0.5 rounded border border-[#2c472c]">Veg</span>' : ''}
                        ${item.calories ? `<span class="text-[10px] text-[#7e7266]">${item.calories} kcal</span>` : ''}
                    </div>
                    <button class="px-3 py-1.5 bg-[#201916] hover:bg-[#d4a373] text-[#d4a373] hover:text-[#120a06] border border-[#d4a373]/40 rounded text-xs font-semibold tracking-wider transition-all">
                        + Add
                    </button>
                </div>
            </div>
        </div>
    `).join('');
}


// ═══════════════════════════════════════════
// MODALS
// ═══════════════════════════════════════════
window.openReservation  = () => document.getElementById('res-modal').classList.add('open');
window.closeReservation = () => document.getElementById('res-modal').classList.remove('open');
window.openCart         = () => { renderCartModal(); document.getElementById('cart-modal').classList.add('open'); };
window.closeCart        = () => document.getElementById('cart-modal').classList.remove('open');
window.openStory        = () => document.getElementById('story-modal').classList.add('open');
window.closeStory       = () => document.getElementById('story-modal').classList.remove('open');

function renderCartModal() {
    const itemsEl = document.getElementById('cart-items');
    const totalEl = document.getElementById('cart-total');
    const checkoutBtn = document.getElementById('checkout-btn');

    if (cart.length === 0) {
        itemsEl.innerHTML = '<p class="text-[#8a7a6e] text-sm text-center py-8">Your cart is empty</p>';
        totalEl.classList.add('hidden');
        checkoutBtn.classList.add('hidden');
        return;
    }

    itemsEl.innerHTML = cart.map(ci => `
        <div class="flex items-center justify-between gap-3 p-3 rounded-lg bg-[#1b1512] border border-[#2e2621]">
            <span class="text-sm text-[#fdfbf7] flex-1 truncate">${ci.name}</span>
            <div class="flex items-center gap-2">
                <button onclick="cartAdjust('${ci.id}', -1)" class="w-6 h-6 rounded bg-[#2e2621] text-[#d4a373] text-sm font-bold hover:bg-[#d4a373] hover:text-black transition-colors">-</button>
                <span class="text-sm text-[#fdfbf7] w-4 text-center">${ci.qty}</span>
                <button onclick="cartAdjust('${ci.id}', 1)" class="w-6 h-6 rounded bg-[#2e2621] text-[#d4a373] text-sm font-bold hover:bg-[#d4a373] hover:text-black transition-colors">+</button>
            </div>
            <span class="text-sm text-[#d4a373] font-cinzel font-bold shrink-0">$${ci.price * ci.qty}</span>
        </div>
    `).join('');

    document.getElementById('total-price').textContent = `$${cartTotal()}`;
    totalEl.classList.remove('hidden');
    checkoutBtn.classList.remove('hidden');
}

window.cartAdjust = function(id, delta) {
    const ci = cart.find(c => c.id === id);
    if (!ci) return;
    ci.qty += delta;
    if (ci.qty <= 0) cart = cart.filter(c => c.id !== id);
    updateCartBadge();
    renderCartModal();
};

window.confirmReservation = function() {
    closeReservation();
    showNotification('🍽️ Reservation confirmed!');
};


// ═══════════════════════════════════════════
// NOTIFICATION TOAST
// ═══════════════════════════════════════════
let notifTimer;
window.showNotification = function(msg) {
    const el = document.getElementById('notification');
    el.textContent = msg;
    el.classList.add('show');
    clearTimeout(notifTimer);
    notifTimer = setTimeout(() => el.classList.remove('show'), 2500);
};


// ═══════════════════════════════════════════
// NEWSLETTER
// ═══════════════════════════════════════════
window.subscribeNewsletter = function(e) {
    e.preventDefault();
    const input = document.getElementById('nl-email');
    if (input && input.value) {
        input.value = '';
        showNotification('📧 Subscribed successfully!');
    }
};


// ═══════════════════════════════════════════
// MOBILE / HAMBURGER MENU
// ═══════════════════════════════════════════
window.toggleMobileMenu = function() {
    const menu = document.getElementById('mobile-menu');
    menu.classList.toggle('open');
};
window.closeMobileMenu = function() {
    document.getElementById('mobile-menu').classList.remove('open');
};
// Close mobile menu on outside click
document.addEventListener('click', (e) => {
    const menu = document.getElementById('mobile-menu');
    const ham  = document.getElementById('hamburger');
    if (menu && menu.classList.contains('open') && !menu.contains(e.target) && !ham.contains(e.target)) {
        menu.classList.remove('open');
    }
});


// ═══════════════════════════════════════════
// INIT
// ═══════════════════════════════════════════
document.addEventListener('DOMContentLoaded', () => {
    resizeCanvas();
    renderCategories();
    renderMenu();

    // Set default date on reservation inputs
    const today = new Date().toISOString().split('T')[0];
    const d = document.getElementById('res-date');
    if (d) d.value = today;
});
