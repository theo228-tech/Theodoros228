/* ===== SCROLL ANIMATION ===== */
const reveals = document.querySelectorAll(".reveal");

function revealOnScroll() {
    reveals.forEach(el => {
        const top = el.getBoundingClientRect().top;
        const windowHeight = window.innerHeight;

        if (top < windowHeight - 100) {
            el.classList.add("active");
        }
    });
}

window.addEventListener("scroll", revealOnScroll);
revealOnScroll();

const toggle = document.createElement("button");
toggle.textContent = "🌙";
toggle.style.position = "fixed";
toggle.style.bottom = "20px";
toggle.style.right = "20px";
toggle.style.padding = "12px";
toggle.style.borderRadius = "50%";
toggle.style.border = "none";
toggle.style.cursor = "pointer";
toggle.style.zIndex = "2000";
document.body.appendChild(toggle);

toggle.addEventListener("click", () => {
    document.body.classList.toggle("dark");
    toggle.textContent = document.body.classList.contains("dark") ? "☀️" : "🌙";
});

(function () {
    emailjs.init("-dvweVbce2H2d78xD"); 
})();


document.getElementById("contactForm").addEventListener("submit", function (e) {
    e.preventDefault();

    const params = {
        nom: document.getElementById("nom").value,
        prenom: document.getElementById("prenom").value,
        email: document.getElementById("email").value,
        message: document.getElementById("message").value
    };

    emailjs
        .send(
            "service_7dimtzz",    
            "template_q370ycq", 
            params
        )
        .then(function () {
            alert("✅ Message envoyé avec succès !");
            document.getElementById("contactForm").reset();
        })
        .catch(function (error) {
            alert("❌ Erreur lors de l’envoi, réessaie.");
            console.error(error);
        });
});

