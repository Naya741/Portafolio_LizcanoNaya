// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
anchor.addEventListener("click", function (e) {
    e.preventDefault()
    document.querySelector(this.getAttribute("href")).scrollIntoView({
behavior: "smooth",
    })
})
})

// Add scroll effect to navbar
window.addEventListener("scroll", () => {
const navbar = document.querySelector(".navbar")
if (window.scrollY > 50) {
    navbar.style.background = "rgba(0, 0, 0, 0.95)"
} else {
    navbar.style.background = "rgba(0, 0, 0, 0.8)"
}
})

// Animate elements on scroll
const observerOptions = {
threshold: 0.1,
rootMargin: "0px 0px -50px 0px",
}

const observer = new IntersectionObserver((entries) => {
entries.forEach((entry) => {
    if (entry.isIntersecting) {
    entry.target.style.opacity = "1"
    entry.target.style.transform = "translateY(0)"
    }
})
}, observerOptions)

// Observe all cards and sections
document.addEventListener("DOMContentLoaded", () => {
const animatedElements = document.querySelectorAll(".project-card, .service-card, .about-content")

animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
})
})

// Add click handlers for buttons
document.addEventListener("DOMContentLoaded", () => {
  // Project view buttons
const viewButtons = document.querySelectorAll(".btn-view")
viewButtons.forEach((button) => {
    button.addEventListener("click", function () {
    const projectTitle = this.closest(".project-card").querySelector(".project-title").textContent
    alert(`Viewing ${projectTitle} project details...`)
    })
})

  // Service buttons
const serviceButtons = document.querySelectorAll(".btn-service")
serviceButtons.forEach((button) => {
    button.addEventListener("click", function () {
    const serviceTitle = this.closest(".service-card").querySelector("h3").textContent
    alert(`Requesting ${serviceTitle} service...`)
    })
})

  // Contact button
const contactButtons = document.querySelectorAll(".btn-primary")
contactButtons.forEach((button) => {
    if (button.textContent === "CONTACT") {
    button.addEventListener("click", (e) => {
        e.preventDefault()
        alert("Contact form would open here...")
    })
    }
})

  // Video play button
const playButton = document.querySelector(".play-button")
if (playButton) {
    playButton.addEventListener("click", () => {
    alert("Video would play here...")
    })
}
})

// Add typing effect to hero title
function typeWriter(element, text, speed = 100) {
let i = 0
element.innerHTML = ""

function type() {
    if (i < text.length) {
    element.innerHTML += text.charAt(i)
    i++
    setTimeout(type, speed)
    }
}

type()
}

// Initialize typing effect on page load
window.addEventListener("load", () => {
const heroTitle = document.querySelector(".hero-title")
if (heroTitle) {
    const originalText = heroTitle.textContent
    typeWriter(heroTitle, originalText, 150)
}
})

// Add parallax effect to hero background
window.addEventListener("scroll", () => {
const scrolled = window.pageYOffset
const hero = document.querySelector(".hero")

if (hero) {
    const rate = scrolled * -0.5
    hero.style.transform = `translateY(${rate}px)`
}
})

// Mobile menu toggle (if needed)
function toggleMobileMenu() {
const navLinks = document.querySelector(".nav-links")
navLinks.classList.toggle("mobile-active")
}

// Add loading animation
window.addEventListener("load", () => {
document.body.classList.add("loaded")
})
