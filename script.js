document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SHOPPING CART LOGIC ---
    let cartCount = 0;
    const cartDisplay = document.querySelector('.cart-icon');
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            if (cartDisplay) {
                cartDisplay.textContent = `Cart (${cartCount})`;
            }

            btn.textContent = "Added! ✨";
            btn.style.background = "#b33951";
            setTimeout(() => {
                btn.textContent = "Add to Cart";
                btn.style.background = "#e8a5b2";
            }, 1000);
        });
    });

    // --- 2. HOME PAGE INTERACTION ---
    const mainBtn = document.getElementById('mainBtn');
    const statusBox = document.getElementById('status-box');
    const statusText = document.getElementById('status-text');

    if (mainBtn && statusText) {
        const flowerMeanings = {
            "Peony": "Prosperity & Romance",
            "Rose": "Love & Beauty",
            "Lily": "Purity & Rebirth",
            "Lavender": "Devotion & Calm"
        };

        mainBtn.addEventListener('click', () => {
            const keys = Object.keys(flowerMeanings);
            const randomFlower = keys[Math.floor(Math.random() * keys.length)];
            statusText.textContent = `${randomFlower}: ${flowerMeanings[randomFlower]}`;
            statusBox.classList.remove('hidden');
            statusBox.classList.add('status-msg');
        });
    }

    // --- 3. CAROUSEL INTERACTION ---
    const carouselItems = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');

    if (carouselItems.length > 0) {
        carouselItems.forEach((item, index) => {
            item.addEventListener('click', () => {
                carouselItems.forEach(i => i.classList.remove('active'));
                dots.forEach(d => d.classList.remove('active'));

                item.classList.add('active');
                if (dots[index]) dots[index].classList.add('active');

                item.scrollIntoView({
                    behavior: 'smooth',
                    block: 'nearest',
                    inline: 'center'
                });
            });
        });
    }
});

/* ✅ GLOBAL FUNCTION — REQUIRED FOR onclick */
window.filterProducts = function (category, clickedBtn) {
    const products = document.querySelectorAll('.product-card');
    const buttons = document.querySelectorAll('.filter-btn');

    buttons.forEach(btn => btn.classList.remove('active'));
    clickedBtn.classList.add('active');

    products.forEach(product => {
        const productCategory = product.dataset.category;
        product.style.display =
            category === 'all' || productCategory === category
                ? ''
                : 'none';
    });
};
