const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon();
}

themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark ? '☀️' : '🌙';
}

const menuToggle = document.getElementById('menuToggle');
const navMain = document.querySelector('.nav-main');

menuToggle.addEventListener('click', () => {
    navMain.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMain.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-main') && !e.target.closest('.menu-toggle')) {
        navMain.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

const observerOptions = {
    threshold: 0.1,
    rootMargin: '0px 0px -100px 0px'
};

const observer = new IntersectionObserver(function(entries) {
    entries.forEach(entry => {
        if (entry.isIntersecting) {
            entry.target.style.opacity = '1';
            entry.target.style.transform = 'translateY(0)';
        }
    });
}, observerOptions);

document.querySelectorAll('.feature-card, .project-card, .service-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

function updateActiveNav() {
    const currentPage = window.location.pathname.split('/').pop() || 'index.html';
    document.querySelectorAll('.nav-link').forEach(link => {
        link.classList.remove('active');
        if (link.getAttribute('href') === currentPage || 
            (currentPage === '' && link.getAttribute('href') === 'index.html')) {
            link.classList.add('active');
        }
    });
}
updateActiveNav();

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({ behavior: 'smooth', block: 'start' });
        }
    });
});

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-large');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            filterButtons.forEach(btn => btn.classList.remove('active'));
            button.classList.add('active');
            const filterValue = button.getAttribute('data-filter');
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'grid';
                    card.style.animation = 'fadeIn 0.5s ease';
                    setTimeout(() => { card.style.opacity = '1'; }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => { card.style.display = 'none'; }, 300);
                }
            });
        });
    });
}

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        document.querySelectorAll('.form-group').forEach(group => group.classList.remove('error'));
        let isValid = true;

        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) { showError('name', 'Le nom est requis'); isValid = false; }

        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) { showError('email', 'Email valide requis'); isValid = false; }

        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value) { showError('subject', 'Sélectionnez un sujet'); isValid = false; }

        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) { showError('message', 'Minimum 10 caractères'); isValid = false; }

        if (isValid) {
            const formData = new FormData(contactForm);
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: { 'Accept': 'application/json' }
            })
            .then(response => {
                if (response.ok) {
                    showFormStatus('success', '✓ Message envoyé avec succès !');
                    setTimeout(() => { contactForm.reset(); document.getElementById('formStatus').classList.remove('success'); }, 3000);
                } else {
                    showFormStatus('error', '❌ Erreur lors de l\'envoi.');
                }
            })
            .catch(() => { showFormStatus('error', '❌ Erreur de connexion.'); });
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    field.closest('.form-group').classList.add('error');
    if (errorElement) errorElement.textContent = message;
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('formStatus');
    statusElement.textContent = message;
    statusElement.classList.add(type);
    if (type === 'success') setTimeout(() => statusElement.classList.remove(type), 3000);
}

// Scroll to top button
const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.style.cssText = 'position:fixed;bottom:30px;right:30px;width:50px;height:50px;background:linear-gradient(135deg,#667eea,#764ba2);color:white;border:none;border-radius:50%;cursor:pointer;font-size:1.5rem;display:none;z-index:999;box-shadow:0 4px 15px rgba(0,0,0,0.2);transition:all 0.3s ease;';
document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) { scrollTopButton.style.display = 'flex'; scrollTopButton.style.alignItems = 'center'; scrollTopButton.style.justifyContent = 'center'; }
    else { scrollTopButton.style.display = 'none'; }
});

scrollTopButton.addEventListener('click', () => window.scrollTo({ top: 0, behavior: 'smooth' }));

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeIn 0.5s ease forwards';
});