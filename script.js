document.addEventListener('DOMContentLoaded', () => {

    // --- 1. SHOPPING CART LOGIC ---
    let cartCount = 0;
    const cartDisplay = document.querySelector('.cart-icon');
    const addButtons = document.querySelectorAll('.add-btn');

    addButtons.forEach(btn => {
        btn.addEventListener('click', () => {
            cartCount++;
            if (cartDisplay) cartDisplay.textContent = `Cart (${cartCount})`;
            btn.textContent = "Added! ✨";
            const originalBg = btn.style.background;
            btn.style.background = "#b33951";
            setTimeout(() => {
                btn.textContent = "Add to Cart";
                btn.style.background = originalBg || "#e8a5b2";
            }, 1000);
        });
    });

    // --- 2. CAROUSEL LOGIC ---
    const items = document.querySelectorAll('.carousel-item');
    const dots = document.querySelectorAll('.dot');
    let currentIndex = 1;

    function updateCarousel(index) {
        if (items.length === 0) return;
        items.forEach((item, i) => {
            item.classList.remove('active');
            if (dots[i]) dots[i].classList.remove('active');
            if (i === index) {
                item.classList.add('active');
                if (dots[i]) dots[i].classList.add('active');
            }
        });
    }

    items.forEach((item, index) => {
        item.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    dots.forEach((dot, index) => {
        dot.addEventListener('click', () => {
            currentIndex = index;
            updateCarousel(currentIndex);
        });
    });

    // --- 3. HERO BUTTON ---
    const mainBtn = document.getElementById('mainBtn');
    if (mainBtn) {
        mainBtn.addEventListener('click', () => {
            window.location.href = 'shop.html';
        });
    }

    // --- 4. DATABASE & SESSION ---
    if (!localStorage.getItem('sunnyUsers')) {
        localStorage.setItem('sunnyUsers', JSON.stringify([]));
    }

    const accountLink = document.getElementById('account-link');
    const dropdownContent = document.querySelector('.dropdown-content');
    const currentUser = JSON.parse(localStorage.getItem('currentUser'));

    if (currentUser && accountLink && dropdownContent) {
        accountLink.textContent = `${currentUser.firstName} ▾`;
        dropdownContent.innerHTML = `
            <a href="profile.html">My Profile</a>
            <a href="#" id="signOutBtn" style="color: #b33951; font-weight: bold;">Sign Out</a>
        `;
        
        document.getElementById('signOutBtn').addEventListener('click', (e) => {
            e.preventDefault();
            localStorage.removeItem('currentUser');
            alert("Signed out successfully!");
            window.location.href = 'index.html';
        });
    }

    if (accountLink && dropdownContent) {
        accountLink.addEventListener('click', (e) => {
            e.preventDefault();
            e.stopPropagation();
            dropdownContent.classList.toggle('show');
        });

        window.addEventListener('click', (e) => {
            if (!accountLink.contains(e.target) && !dropdownContent.contains(e.target)) {
                dropdownContent.classList.remove('show');
            }
        });
    }

    // --- 5. TERMS MODAL LOGIC (New Integration) ---
    const modal = document.getElementById("termsModal");
    const termsBtn = document.getElementById("openTerms");
    const closeBtn = document.querySelector(".close-modal");

    if (termsBtn && modal) {
        termsBtn.addEventListener('click', (e) => {
            e.preventDefault();
            modal.style.display = "block";
        });
    }

    if (closeBtn) {
        closeBtn.addEventListener('click', () => {
            modal.style.display = "none";
        });
    }

    window.addEventListener('click', (e) => {
        if (e.target == modal) {
            modal.style.display = "none";
        }
    });

    // --- 6. REGISTRATION LOGIC ---
    const registerForm = document.getElementById('registerForm');
    if (registerForm) {
        registerForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const email = document.getElementById('reg-email').value.trim().toLowerCase();
            const password = document.getElementById('reg-password').value;
            const confirmPass = document.getElementById('reg-confirm').value;
            const passError = document.getElementById('pass-error');

            let users = JSON.parse(localStorage.getItem('sunnyUsers'));
            if (users.find(u => u.email === email)) {
                alert("This email is already registered!");
                return;
            }

            if (password !== confirmPass) {
                if (passError) passError.style.display = 'block';
                document.getElementById('reg-confirm').classList.add('input-error');
                return;
            }

            users.push({
                firstName: document.getElementById('reg-fname').value,
                lastName: document.getElementById('reg-lname').value,
                email: email,
                password: password,
                dob: document.getElementById('reg-dob').value,
                phone: document.getElementById('reg-phone').value,
                location: document.getElementById('reg-location').value
            });

            localStorage.setItem('sunnyUsers', JSON.stringify(users));
            alert("Account created successfully! ✨");
            window.location.href = 'login.html';
        });
    }

    // --- 7. LOGIN LOGIC ---
    const loginForm = document.getElementById('loginForm');
    if (loginForm) {
        const emailInput = document.getElementById('email');
        const passwordInput = document.getElementById('password');
        const errorBox = document.getElementById('error-box');

        loginForm.addEventListener('submit', (e) => {
            e.preventDefault();
            const users = JSON.parse(localStorage.getItem('sunnyUsers'));
            const user = users.find(u => u.email === emailInput.value.trim().toLowerCase() && u.password === passwordInput.value);

            if (user) {
                localStorage.setItem('currentUser', JSON.stringify(user));
                window.location.href = 'index.html';
            } else {
                emailInput.classList.add('input-error');
                passwordInput.classList.add('input-error');
                if (errorBox) errorBox.style.display = 'block';
            }
        });

        [emailInput, passwordInput].forEach(input => {
            if (input) {
                input.addEventListener('input', () => {
                    input.classList.remove('input-error');
                    if (errorBox) errorBox.style.display = 'none';
                });
            }
        });
    }
});
