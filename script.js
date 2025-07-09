// Smooth scrolling for navigation links
document.querySelectorAll('a[href^="#"]').forEach((anchor) => {
  anchor.addEventListener("click", function (e) {
    e.preventDefault()
    const target = document.querySelector(this.getAttribute("href"))
    if (target) {
      target.scrollIntoView({
        behavior: "smooth",
        block: "start",
      })
    }
  })
})

// Add scroll effect to navbar and active navigation link
window.addEventListener("scroll", () => {
  const navbar = document.querySelector(".advanced-navbar")
  const sections = document.querySelectorAll("section")
  const navLinks = document.querySelectorAll(".nav-link")

  let current = ""
  sections.forEach((section) => {
    const sectionTop = section.offsetTop - 100
    const sectionHeight = section.clientHeight
    if (scrollY >= sectionTop && scrollY < sectionTop + sectionHeight) {
      current = section.getAttribute("id")
    }
  })

  navLinks.forEach((link) => {
    link.classList.remove("active")
    if (link.getAttribute("href") === `#${current}`) {
      link.classList.add("active")
    }
  })

  // Navbar background on scroll
  if (window.scrollY > 50) {
    navbar.style.background = "rgba(10, 10, 10, 0.98)"
  } else {
    navbar.style.background = "rgba(10, 10, 10, 0.95)"
  }
})

// Mobile Navigation Toggle
const navToggle = document.getElementById("nav-toggle")
const navMenu = document.getElementById("nav-menu")

navToggle.addEventListener("click", () => {
  navMenu.classList.toggle("active")
  navToggle.classList.toggle("active")
})

// Close mobile menu when clicking on a link
document.querySelectorAll(".nav-link").forEach((link) => {
  link.addEventListener("click", () => {
    navMenu.classList.remove("active")
    navToggle.classList.remove("active")
  })
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

// Observe all animated elements
document.addEventListener("DOMContentLoaded", () => {
  const animatedElements = document.querySelectorAll(
    ".objective-card, .mission-card, .certification-card, .service-card, .project-card, .contact-item, .timeline-item, .philosophy-card, .credential-card, .expertise-card, .portfolio-item, .contact-method, .professional-link",
  )

  animatedElements.forEach((el) => {
    el.style.opacity = "0"
    el.style.transform = "translateY(30px)"
    el.style.transition = "opacity 0.6s ease, transform 0.6s ease"
    observer.observe(el)
  })
})

// Add click handlers for buttons
document.addEventListener("DOMContentLoaded", () => {
  // Project GitHub and Demo buttons
  const projectLinks = document.querySelectorAll(".project-links a")
  projectLinks.forEach((link) => {
    console.log("Project link ready:", link.href)
  })

  // Social links tracking
  const socialLinks = document.querySelectorAll(".social-link")
  socialLinks.forEach((link) => {
    link.addEventListener("click", () => {
      console.log("Social link clicked:", link.title)
    })
  })

  // Service buttons functionality
  const serviceButtons = document.querySelectorAll(".btn-service")
  serviceButtons.forEach((button) => {
    button.addEventListener("click", function () {
      const serviceTitle = this.closest(".service-card").querySelector("h3").textContent
      requestService(serviceTitle)
    })
  })
})

// Email functionality
function openEmailClient() {
  const email = "tu.email@gmail.com" // Cambia por tu email real
  const subject = "Contacto desde Portfolio"
  const body = "Hola, me interesa conocer más sobre tus servicios como desarrolladora."

  window.location.href = `mailto:${email}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
}

// Service request functionality
function requestService(serviceName) {
  const connectSection = document.querySelector("#connect")
  const serviceSelect = document.querySelector("#service")
  const messageTextarea = document.querySelector("#message")

  // Scroll to contact form
  connectSection.scrollIntoView({ behavior: "smooth" })

  // Pre-fill form based on service
  setTimeout(() => {
    if (serviceName.includes("Frontend")) {
      serviceSelect.value = "frontend"
      messageTextarea.value = `Hola! Estoy interesado/a en tus servicios de desarrollo frontend. Me gustaría discutir mi proyecto contigo.`
    } else if (serviceName.includes("Backend")) {
      serviceSelect.value = "backend"
      messageTextarea.value = `Hola! Necesito ayuda con desarrollo backend. ¿Podrías ayudarme con mi proyecto?`
    } else if (serviceName.includes("Consulting")) {
      serviceSelect.value = "consulting"
      messageTextarea.value = `Hola! Estoy buscando consultoría técnica para mi proyecto. Me gustaría agendar una llamada.`
    }

    // Focus on name field
    document.querySelector("#name").focus()
  }, 1000)
}

// Contact form functionality
document.addEventListener("DOMContentLoaded", () => {
  const contactForm = document.getElementById("contactForm")

  if (contactForm) {
    contactForm.addEventListener("submit", function (e) {
      e.preventDefault()

      // Get form data
      const formData = new FormData(this)
      const name = formData.get("name")
      const email = formData.get("email")
      const company = formData.get("company")
      const service = formData.get("service")
      const message = formData.get("message")

      // Create email content
      const subject = `Nuevo contacto de ${name} - ${service || "Consulta General"}`
      const body = `
Hola! Mi nombre es ${name} y me gustaría contactarte.

${company ? `Empresa: ${company}` : ""}
Email: ${email}
Tipo de proyecto: ${service || "No especificado"}

Mensaje:
${message}

---
Enviado desde tu portfolio web
      `.trim()

      // Open email client
      const mailtoLink = `mailto:tu.email@gmail.com?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`
      window.location.href = mailtoLink

      // Show success message
      showNotification("¡Mensaje enviado! Se abrirá tu cliente de email.", "success")

      // Reset form
      this.reset()
    })
  }
})

// Notification system
function showNotification(message, type = "info") {
  const notification = document.createElement("div")
  notification.className = `notification notification-${type}`
  notification.innerHTML = `
    <span>${message}</span>
    <button onclick="this.parentElement.remove()">×</button>
  `

  // Add notification styles
  notification.style.cssText = `
    position: fixed;
    top: 100px;
    right: 20px;
    background: ${type === "success" ? "#4CAF50" : "#ff6b9d"};
    color: white;
    padding: 1rem 1.5rem;
    border-radius: 10px;
    box-shadow: 0 10px 30px rgba(0,0,0,0.3);
    z-index: 10000;
    display: flex;
    align-items: center;
    gap: 1rem;
    max-width: 300px;
    animation: slideIn 0.3s ease;
  `

  document.body.appendChild(notification)

  // Auto remove after 5 seconds
  setTimeout(() => {
    if (notification.parentElement) {
      notification.remove()
    }
  }, 5000)
}

// Add CSS for notification animation
const style = document.createElement("style")
style.textContent = `
  @keyframes slideIn {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  .notification button {
    background: none;
    border: none;
    color: white;
    font-size: 1.2rem;
    cursor: pointer;
    padding: 0;
    width: 20px;
    height: 20px;
    display: flex;
    align-items: center;
    justify-content: center;
  }
`
document.head.appendChild(style)

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
    typeWriter(heroTitle, originalText, 100)
  }
})

// Add parallax effect to hero background
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const hero = document.querySelector(".hero")

  if (hero && window.innerWidth > 768) {
    const rate = scrolled * -0.3
    hero.style.transform = `translateY(${rate}px)`
  }
})

// Add loading animation
window.addEventListener("load", () => {
  document.body.classList.add("loaded")

  // Hide loading screen if exists
  const loader = document.querySelector(".loader")
  if (loader) {
    loader.style.opacity = "0"
    setTimeout(() => loader.remove(), 500)
  }
})

// Intersection Observer for counting animations
const countObserver = new IntersectionObserver((entries) => {
  entries.forEach((entry) => {
    if (entry.isIntersecting) {
      const counter = entry.target
      const target = Number.parseInt(counter.getAttribute("data-target"))
      const increment = target / 100
      let current = 0

      const updateCounter = () => {
        if (current < target) {
          current += increment
          counter.textContent = Math.ceil(current)
          setTimeout(updateCounter, 20)
        } else {
          counter.textContent = target
        }
      }

      updateCounter()
      countObserver.unobserve(counter)
    }
  })
})

// Observe counter elements
document.querySelectorAll(".counter").forEach((counter) => {
  countObserver.observe(counter)
})
