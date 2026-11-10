// ============================================
// THEME TOGGLE (Mode Sombre/Clair)
// ============================================

const themeToggle = document.getElementById('themeToggle');
const html = document.documentElement;

// Déterminer le thème sauvegardé ou par défaut
const savedTheme = localStorage.getItem('theme') || 'light';
if (savedTheme === 'dark') {
    document.body.classList.add('dark-theme');
    updateThemeIcon();
}

// Écouteur pour le bouton toggle du thème
themeToggle.addEventListener('click', () => {
    document.body.classList.toggle('dark-theme');
    const isDark = document.body.classList.contains('dark-theme');
    localStorage.setItem('theme', isDark ? 'dark' : 'light');
    updateThemeIcon();
});

function updateThemeIcon() {
    const isDark = document.body.classList.contains('dark-theme');
    themeToggle.innerHTML = isDark
        ? '<span class="theme-icon"><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><circle cx="12" cy="12" r="5"></circle><line x1="12" y1="1" x2="12" y2="3"></line><line x1="12" y1="21" x2="12" y2="23"></line><line x1="4.22" y1="4.22" x2="5.64" y2="5.64"></line><line x1="18.36" y1="18.36" x2="19.78" y2="19.78"></line><line x1="1" y1="12" x2="3" y2="12"></line><line x1="21" y1="12" x2="23" y2="12"></line><line x1="4.22" y1="19.78" x2="5.64" y2="18.36"></line><line x1="18.36" y1="5.64" x2="19.78" y2="4.22"></line></svg></span>'
        : '<span class="theme-icon"><svg class="icon-svg" xmlns="http://www.w3.org/2000/svg" width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M21 12.79A9 9 0 1 1 11.21 3 7 7 0 0 0 21 12.79z"></path></svg></span>';
}

// ============================================
// MOBILE MENU TOGGLE
// ============================================

const menuToggle = document.getElementById('menuToggle');
const navMain = document.querySelector('.nav-main');

menuToggle.addEventListener('click', () => {
    navMain.classList.toggle('active');
    menuToggle.classList.toggle('active');
});

// Fermer le menu mobile en cliquant sur un lien
document.querySelectorAll('.nav-link').forEach(link => {
    link.addEventListener('click', () => {
        navMain.classList.remove('active');
        menuToggle.classList.remove('active');
    });
});

// Fermer le menu en cliquant en dehors
document.addEventListener('click', (e) => {
    if (!e.target.closest('.nav-main') && !e.target.closest('.menu-toggle')) {
        navMain.classList.remove('active');
        menuToggle.classList.remove('active');
    }
});

// ============================================
// SCROLL ANIMATIONS - Éléments qui apparaissent au scroll
// ============================================

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

// Observer les éléments à animer
document.querySelectorAll('.feature-card, .project-card, .service-card, .skill-item').forEach(el => {
    el.style.opacity = '0';
    el.style.transform = 'translateY(20px)';
    el.style.transition = 'opacity 0.6s ease, transform 0.6s ease';
    observer.observe(el);
});

// ============================================
// NAVBAR ACTIVE STATE
// ============================================

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

// ============================================
// SMOOTH SCROLL BEHAVIOR
// ============================================

document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function(e) {
        e.preventDefault();
        const target = document.querySelector(this.getAttribute('href'));
        if (target) {
            target.scrollIntoView({
                behavior: 'smooth',
                block: 'start'
            });
        }
    });
});

// ============================================
// HOVER EFFECT SUR SKILLS PROGRESS
// ============================================

const skillBars = document.querySelectorAll('.skill-bar');
skillBars.forEach(bar => {
    const progress = bar.querySelector('.skill-progress');
    const rect = bar.getBoundingClientRect();
    const targetWidth = progress.style.width;
    
    bar.addEventListener('mouseenter', () => {
        progress.style.animation = 'none';
        setTimeout(() => {
            progress.style.animation = 'progressBar 1.5s ease-out';
        }, 10);
    });
});

// ============================================
// FILTRER LES PROJETS (Projects Page)
// ============================================

const filterButtons = document.querySelectorAll('.filter-btn');
const projectCards = document.querySelectorAll('.project-card-large');

if (filterButtons.length > 0) {
    filterButtons.forEach(button => {
        button.addEventListener('click', () => {
            // Retirer la classe active de tous les boutons
            filterButtons.forEach(btn => btn.classList.remove('active'));
            // Ajouter active au bouton cliqué
            button.classList.add('active');
            
            const filterValue = button.getAttribute('data-filter');
            
            // Filtrer les projets
            projectCards.forEach(card => {
                const category = card.getAttribute('data-category');
                
                if (filterValue === 'all' || category === filterValue) {
                    card.style.display = 'grid';
                    card.style.animation = 'fadeIn 0.5s ease';
                    setTimeout(() => {
                        card.style.opacity = '1';
                    }, 10);
                } else {
                    card.style.opacity = '0';
                    setTimeout(() => {
                        card.style.display = 'none';
                    }, 300);
                }
            });
        });
    });
}

// ============================================
// FAQ ACCORDION
// ============================================

const faqItems = document.querySelectorAll('.faq-item');

faqItems.forEach(item => {
    const question = item.querySelector('.faq-question');
    
    question.addEventListener('click', () => {
        // Fermer les autres FAQs
        faqItems.forEach(otherItem => {
            if (otherItem !== item) {
                otherItem.classList.remove('active');
            }
        });
        
        // Basculer le FAQ actuel
        item.classList.toggle('active');
    });
});

// ============================================
// FORM VALIDATION & SUBMISSION
// ============================================

const contactForm = document.getElementById('contactForm');

if (contactForm) {
    contactForm.addEventListener('submit', function(e) {
        e.preventDefault();
        
        // Réinitialiser les messages d'erreur
        document.querySelectorAll('.form-group').forEach(group => {
            group.classList.remove('error');
        });
        
        let isValid = true;
        
        // Validation du nom
        const nameInput = document.getElementById('name');
        if (!nameInput.value.trim()) {
            showError('name', 'Le nom est requis');
            isValid = false;
        }
        
        // Validation de l'email
        const emailInput = document.getElementById('email');
        const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
        if (!emailInput.value.trim() || !emailRegex.test(emailInput.value)) {
            showError('email', 'Veuillez entrer une adresse email valide');
            isValid = false;
        }
        
        // Validation du sujet
        const subjectInput = document.getElementById('subject');
        if (!subjectInput.value) {
            showError('subject', 'Veuillez sélectionner un sujet');
            isValid = false;
        }
        
        // Validation du message
        const messageInput = document.getElementById('message');
        if (!messageInput.value.trim() || messageInput.value.trim().length < 10) {
            showError('message', 'Le message doit contenir au moins 10 caractères');
            isValid = false;
        }
        
        if (isValid) {
            // Envoyer le formulaire via Formspree
            const formData = new FormData(contactForm);
            
            fetch(contactForm.action, {
                method: 'POST',
                body: formData,
                headers: {
                    'Accept': 'application/json'
                }
            })
            .then(response => {
                if (response.ok) {
                    showFormStatus('success', '✓ Message envoyé avec succès ! Je vous répondrai très bientôt.');
                    setTimeout(() => {
                        contactForm.reset();
                        document.getElementById('formStatus').classList.remove('success');
                    }, 3000);
                } else {
                    showFormStatus('error', '❌ Une erreur est survenue. Veuillez réessayer.');
                }
            })
            .catch(() => {
                showFormStatus('error', '❌ Erreur de connexion. Veuillez vérifier votre réseau.');
            });
        }
    });
}

function showError(fieldId, message) {
    const field = document.getElementById(fieldId);
    const errorElement = document.getElementById(fieldId + 'Error');
    field.closest('.form-group').classList.add('error');
    if (errorElement) {
        errorElement.textContent = message;
    }
}

function showFormStatus(type, message) {
    const statusElement = document.getElementById('formStatus');
    statusElement.textContent = message;
    statusElement.classList.add(type);
    
    if (type === 'success') {
        setTimeout(() => {
            statusElement.classList.remove(type);
        }, 3000);
    }
}

// ============================================
// COUNTER ANIMATION (pour les statistiques)
// ============================================

function animateCounter(element, target, duration = 2000) {
    let current = 0;
    const increment = target / (duration / 16);
    
    const timer = setInterval(() => {
        current += increment;
        if (current >= target) {
            current = target;
            clearInterval(timer);
        }
        element.textContent = Math.floor(current);
    }, 16);
}

// ============================================
// PARTICLE EFFECT (optionnel, léger)
// ============================================

function createParticleEffect(x, y) {
    const particle = document.createElement('div');
    particle.style.position = 'fixed';
    particle.style.pointerEvents = 'none';
    particle.style.width = '10px';
    particle.style.height = '10px';
    particle.style.background = 'linear-gradient(135deg, #667eea, #764ba2)';
    particle.style.borderRadius = '50%';
    particle.style.left = x + 'px';
    particle.style.top = y + 'px';
    particle.style.animation = 'particle 0.8s ease-out forwards';
    
    document.body.appendChild(particle);
    
    setTimeout(() => particle.remove(), 800);
}

// Ajouter une animation CSS pour les particules
const style = document.createElement('style');
style.textContent = `
    @keyframes particle {
        0% {
            opacity: 1;
            transform: translate(0, 0) scale(1);
        }
        100% {
            opacity: 0;
            transform: translate(${Math.random() * 100 - 50}px, ${Math.random() * 100 - 50}px) scale(0);
        }
    }
`;
document.head.appendChild(style);

// ============================================
// ACTIVE NAV LINK ON SCROLL
// ============================================

window.addEventListener('scroll', () => {
    let current = '';
    
    document.querySelectorAll('section').forEach(section => {
        const sectionTop = section.offsetTop;
        if (pageYOffset >= sectionTop - 200) {
            current = section.getAttribute('id') || section.getAttribute('class');
        }
    });
});

// ============================================
// LAZY LOADING IMAGES
// ============================================

if ('IntersectionObserver' in window) {
    const imageObserver = new IntersectionObserver((entries, observer) => {
        entries.forEach(entry => {
            if (entry.isIntersecting) {
                const img = entry.target;
                if (img.dataset.src) {
                    img.src = img.dataset.src;
                    img.removeAttribute('data-src');
                }
                imageObserver.unobserve(img);
            }
        });
    });
    
    document.querySelectorAll('img[data-src]').forEach(img => {
        imageObserver.observe(img);
    });
}

// ============================================
// RIPPLE EFFECT ON BUTTONS
// ============================================

document.querySelectorAll('.btn').forEach(button => {
    button.addEventListener('click', function(e) {
        const ripple = document.createElement('span');
        const rect = this.getBoundingClientRect();
        const size = Math.max(rect.width, rect.height);
        const x = e.clientX - rect.left - size / 2;
        const y = e.clientY - rect.top - size / 2;
        
        ripple.style.width = ripple.style.height = size + 'px';
        ripple.style.left = x + 'px';
        ripple.style.top = y + 'px';
        ripple.className = 'ripple';
        
        this.appendChild(ripple);
        
        setTimeout(() => ripple.remove(), 600);
    });
});

// Ajouter les styles pour le ripple effect
const rippleStyle = document.createElement('style');
rippleStyle.textContent = `
    .btn {
        position: relative;
        overflow: hidden;
    }
    
    .ripple {
        position: absolute;
        border-radius: 50%;
        background: rgba(255, 255, 255, 0.6);
        transform: scale(0);
        animation: rippleAnimation 0.6s ease-out;
        pointer-events: none;
    }
    
    @keyframes rippleAnimation {
        to {
            transform: scale(4);
            opacity: 0;
        }
    }
`;
document.head.appendChild(rippleStyle);

// ============================================
// PAGE LOAD ANIMATION
// ============================================

document.addEventListener('DOMContentLoaded', () => {
    document.body.style.opacity = '0';
    document.body.style.animation = 'fadeIn 0.5s ease forwards';
});

// ============================================
// HEADER SHRINK ON SCROLL
// ============================================

const header = document.querySelector('.header');
let lastScrollTop = 0;

window.addEventListener('scroll', () => {
    let scrollTop = window.pageYOffset || document.documentElement.scrollTop;
    
    if (scrollTop > 100) {
        header.style.boxShadow = '0 4px 6px -1px rgba(0, 0, 0, 0.1)';
    } else {
        header.style.boxShadow = '0 1px 2px 0 rgba(0, 0, 0, 0.05)';
    }
    
    lastScrollTop = scrollTop <= 0 ? 0 : scrollTop;
});

// ============================================
// BUTTON PRESS ANIMATION
// ============================================

document.querySelectorAll('.btn, .filter-btn').forEach(button => {
    button.addEventListener('mousedown', function() {
        this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(0.98)';
    });
    
    button.addEventListener('mouseup', function() {
        this.style.transform = this.style.transform.replace(/scale\([^)]*\)/, '') + ' scale(1)';
    });
});

// ============================================
// SCROLL TO TOP BUTTON
// ============================================

const scrollTopButton = document.createElement('button');
scrollTopButton.innerHTML = '↑';
scrollTopButton.className = 'scroll-top-btn';
scrollTopButton.style.cssText = `
    position: fixed;
    bottom: 30px;
    right: 30px;
    width: 50px;
    height: 50px;
    background: linear-gradient(135deg, #667eea, #764ba2);
    color: white;
    border: none;
    border-radius: 50%;
    cursor: pointer;
    font-size: 1.5rem;
    display: none;
    z-index: 999;
    box-shadow: 0 4px 15px rgba(0, 0, 0, 0.2);
    transition: all 0.3s ease;
`;

document.body.appendChild(scrollTopButton);

window.addEventListener('scroll', () => {
    if (window.pageYOffset > 300) {
        scrollTopButton.style.display = 'flex';
        scrollTopButton.style.alignItems = 'center';
        scrollTopButton.style.justifyContent = 'center';
    } else {
        scrollTopButton.style.display = 'none';
    }
});

scrollTopButton.addEventListener('click', () => {
    window.scrollTo({
        top: 0,
        behavior: 'smooth'
    });
});

scrollTopButton.addEventListener('mouseenter', function() {
    this.style.transform = 'translateY(-5px)';
    this.style.boxShadow = '0 8px 20px rgba(0, 0, 0, 0.3)';
});

scrollTopButton.addEventListener('mouseleave', function() {
    this.style.transform = 'translateY(0)';
    this.style.boxShadow = '0 4px 15px rgba(0, 0, 0, 0.2)';
});

// ============================================
// CONSOLE MESSAGE
// ============================================

console.log('%c  Bienvenue sur mon portfolio !', 'font-size: 20px; color: #667eea; font-weight: bold;');
console.log('%cSi tu cherches du travail ou une collaboration, n\'hésite pas à me contacter !', 'font-size: 14px; color: #764ba2;');