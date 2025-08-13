// Datos de las materias
const subjects = [
  {
    id: "matematica",
    title: "Matemática",
    description: "Lecciones y juegos",
    icon: "🧮",
    progress: Number.parseInt(localStorage.getItem("mathProgress")) || 0,
    link: "matematicas.html",
    color: "#3b82f6",
  },
  {
    id: "fisica",
    title: "Física",
    description: "Lecciones y juegos",
    icon: "⚛️",
    progress: 0,
    link: "fisica.html",
    color: "#10b981",
  },
  {
    id: "quimica",
    title: "Química",
    description: "Lecciones y juegos",
    icon: "🧪",
    progress: 0,
    link: "quimica.html",
    color: "#06b6d4",
  },
  {
    id: "biologia",
    title: "Biología",
    description: "Lecciones y juegos",
    icon: "🌱",
    progress: 0,
    link: "biologia.html",
    color: "#10b981",
  },
  {
    id: "tecnologia",
    title: "Tecnología",
    description: "Lecciones y juegos",
    icon: "💻",
    progress: 0,
    link: "tecnologia.html",
    color: "#6366f1",
  },
  {
    id: "lengua",
    title: "Lengua",
    description: "Lecciones y juegos",
    icon: "📚",
    progress: 0,
    link: "lengua.html",
    color: "#8b5cf6",
  },
  {
    id: "ingles",
    title: "Inglés",
    description: "Lecciones y juegos",
    icon: "🌍",
    progress: 0,
    link: "ingles.html",
    color: "#06b6d4",
  },
  {
    id: "ajedrez",
    title: "Ajedrez",
    description: "Lecciones y juegos",
    icon: "♟️",
    progress: 0,
    link: "ajedrez.html",
    color: "#64748b",
  },
  {
    id: "programacion",
    title: "Programación",
    description: "Lecciones y juegos",
    icon: "💾",
    progress: 0,
    link: "programacion.html",
    color: "#f59e0b",
  },
  {
    id: "proximamente",
    title: "Próximamente",
    description: "Más materias increíbles en camino...",
    icon: "⏳",
    progress: "???",
    link: "#",
    color: "#f59e0b",
    isComingSoon: true,
  },
]

// Estado de la aplicación
let isDarkMode = true
let coins = 150
let userXP = 75

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const profileBtn = document.getElementById("profileBtn")
const subjectsGrid = document.getElementById("subjectsGrid")
const coinCount = document.getElementById("coinCount")
const xpFill = document.getElementById("xpFill")
const xpValue = document.getElementById("xpValue")
const exploreBtn = document.getElementById("exploreBtn")
const particlesContainer = document.getElementById("particles")

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  loadSavedProgress()
  initializeApp()
  renderSubjects()
  setupEventListeners()
  createParticles()
  startAnimations()
})

function initializeApp() {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    toggleTheme()
  }

  // Cargar datos del usuario
  const savedCoins = localStorage.getItem("coins")
  const savedXP = localStorage.getItem("userXP")

  if (savedCoins) coins = Number.parseInt(savedCoins)
  if (savedXP) userXP = Number.parseInt(savedXP)

  updateUI()
}

function updateUI() {
  coinCount.textContent = coins
  xpFill.style.width = `${userXP}%`
  xpValue.textContent = userXP
}

function setupEventListeners() {
  // Toggle de tema
  themeToggle.addEventListener("click", toggleTheme)

  // Menú de perfil
  profileBtn.addEventListener("click", toggleProfile)

  // Botón explorar
  exploreBtn.addEventListener("click", () => {
    document.querySelector(".subjects-section").scrollIntoView({
      behavior: "smooth",
    })
  })

  // Cerrar menú de perfil al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target)) {
      closeProfile()
    }
  })

  // Manejar tecla Escape
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProfile()
    }
  })
}

function toggleTheme() {
  isDarkMode = !isDarkMode
  const body = document.body
  const themeIcon = document.querySelector(".theme-icon")

  themeToggle.classList.add("rotating")

  setTimeout(() => {
    if (isDarkMode) {
      body.classList.remove("light-mode")
      themeIcon.textContent = "🌙"
      localStorage.setItem("theme", "dark")
    } else {
      body.classList.add("light-mode")
      themeIcon.textContent = "☀️"
      localStorage.setItem("theme", "light")
    }

    themeToggle.classList.remove("rotating")
  }, 300)
}

function toggleProfile() {
  const isExpanded = profileBtn.getAttribute("aria-expanded") === "true"
  profileBtn.setAttribute("aria-expanded", !isExpanded)
}

function closeProfile() {
  profileBtn.setAttribute("aria-expanded", "false")
}

function renderSubjects() {
  subjectsGrid.innerHTML = ""

  subjects.forEach((subject, index) => {
    const card = createSubjectCard(subject, index)
    subjectsGrid.appendChild(card)
  })
}

function createSubjectCard(subject, index) {
  const card = document.createElement("div")
  card.className = `subject-card ${subject.isComingSoon ? "coming-soon" : ""}`
  card.style.setProperty("--card-accent", subject.color)

  const progressText = subject.isComingSoon ? `Progreso: ${subject.progress}` : `Progreso: ${subject.progress}%`

  card.innerHTML = `
    <div class="subject-icon">${subject.icon}</div>
    <h3 class="subject-title">${subject.title}</h3>
    <p class="subject-description">${subject.description}</p>
    <div class="subject-progress">
      <span class="progress-text">${progressText}</span>
    </div>
    <a href="${subject.link}" class="subject-link">
      ${subject.isComingSoon ? "Mantente atento" : "Ver materia"} →
    </a>
  `

  // Añadir evento de clic
  if (!subject.isComingSoon) {
    card.addEventListener("click", (e) => {
      if (e.target.tagName !== "A") {
        handleSubjectClick(subject)
      }
    })
  }

  // Animación de entrada
  setTimeout(() => {
    card.classList.add("fade-in-up")
  }, index * 150)

  return card
}

function handleSubjectClick(subject) {
  // Simular ganancia de monedas
  coins += 5
  localStorage.setItem("coins", coins)
  updateUI()

  // Mostrar notificación
  showNotification(`¡Explorando ${subject.title}! +5 monedas`)

  // Redirigir después de un momento
  setTimeout(() => {
    if (subject.link !== "#") {
      window.location.href = subject.link
    }
  }, 1000)
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.style.cssText = `
    position: fixed;
    top: 20px;
    right: 20px;
    background: linear-gradient(135deg, var(--accent-primary), var(--accent-secondary));
    color: white;
    padding: 1rem 1.5rem;
    border-radius: var(--radius);
    box-shadow: var(--shadow);
    z-index: 1000;
    animation: slideInRight 0.3s ease;
    font-weight: 600;
  `
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

function createParticles() {
  const particleCount = 50

  for (let i = 0; i < particleCount; i++) {
    const particle = document.createElement("div")
    particle.className = "particle"

    // Posición aleatoria
    particle.style.left = Math.random() * 100 + "%"
    particle.style.top = Math.random() * 100 + "%"

    // Tamaño aleatorio
    const size = Math.random() * 4 + 2
    particle.style.width = size + "px"
    particle.style.height = size + "px"

    // Duración de animación aleatoria
    particle.style.animationDuration = Math.random() * 4 + 4 + "s"
    particle.style.animationDelay = Math.random() * 2 + "s"

    particlesContainer.appendChild(particle)
  }
}

function startAnimations() {
  // Animar el título del hero
  const heroTitle = document.querySelector(".hero-title")
  if (heroTitle) {
    heroTitle.style.animation = "titleGlow 3s ease-in-out infinite"
  }

  // Animar las tarjetas con efecto de onda
  const cards = document.querySelectorAll(".subject-card")
  cards.forEach((card, index) => {
    card.addEventListener("mouseenter", () => {
      card.style.transform = "translateY(-8px) scale(1.02)"
    })

    card.addEventListener("mouseleave", () => {
      card.style.transform = "translateY(0) scale(1)"
    })
  })
}

// Añadir estilos dinámicos para las notificaciones
const style = document.createElement("style")
style.textContent = `
  @keyframes slideInRight {
    from {
      transform: translateX(100%);
      opacity: 0;
    }
    to {
      transform: translateX(0);
      opacity: 1;
    }
  }
  
  @keyframes slideOutRight {
    from {
      transform: translateX(0);
      opacity: 1;
    }
    to {
      transform: translateX(100%);
      opacity: 0;
    }
  }
`
document.head.appendChild(style)

// Efecto de paralaje en el scroll
window.addEventListener("scroll", () => {
  const scrolled = window.pageYOffset
  const particles = document.querySelectorAll(".particle")

  particles.forEach((particle, index) => {
    const speed = ((index % 3) + 1) * 0.5
    particle.style.transform = `translateY(${scrolled * speed}px)`
  })
})

// Escuchar mensajes de progreso de las subsecciones
window.addEventListener("message", (event) => {
  if (event.data.type === "updateProgress") {
    const subjectIndex = subjects.findIndex((s) => s.id === event.data.subject)
    if (subjectIndex !== -1) {
      subjects[subjectIndex].progress = event.data.progress
      localStorage.setItem(`${event.data.subject}Progress`, event.data.progress)
      renderSubjects() // Re-renderizar para mostrar el progreso actualizado
    }
  }
})

// Cargar progreso guardado al inicializar
function loadSavedProgress() {
  subjects.forEach((subject) => {
    const savedProgress = localStorage.getItem(`${subject.id}Progress`)
    if (savedProgress) {
      subject.progress = Number.parseInt(savedProgress)
    }
  })
}
