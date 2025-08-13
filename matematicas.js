// Datos de los temas de matemáticas
const mathTopics = [
  {
    id: "geometria",
    title: "Geometría Básica",
    description: "Aprende las figuras y sus propiedades.",
    icon: "📐",
    lessons: 12,
  },
  {
    id: "algebra",
    title: "Álgebra",
    description: "Resuelve ecuaciones y domina el álgebra.",
    icon: "➗",
    lessons: 15,
  },
  {
    id: "estadistica",
    title: "Estadística",
    description: "Analiza datos y crea gráficos.",
    icon: "📊",
    lessons: 10,
  },
  {
    id: "aritmetica",
    title: "Aritmética",
    description: "Suma, resta, multiplicación y división.",
    icon: "🔢",
    lessons: 8,
  },
  {
    id: "medidas",
    title: "Medidas y Unidades",
    description: "Aprende sobre longitudes, masas y volúmenes.",
    icon: "📏",
    lessons: 6,
  },
  {
    id: "funciones",
    title: "Funciones",
    description: "Comprende funciones lineales y cuadráticas.",
    icon: "📈",
    lessons: 14,
  },
  {
    id: "probabilidad",
    title: "Probabilidad",
    description: "Calcula la probabilidad de eventos.",
    icon: "🎯",
    lessons: 9,
  },
  {
    id: "trigonometria",
    title: "Trigonometría",
    description: "Aprende senos, cosenos y tangentes.",
    icon: "🧮",
    lessons: 16,
  },
  {
    id: "logica",
    title: "Lógica Matemática",
    description: "Razonamiento lógico y tablas de verdad.",
    icon: "🔍",
    lessons: 11,
  },
  {
    id: "financiera",
    title: "Matemática Financiera",
    description: "Intereses, porcentajes y finanzas personales.",
    icon: "📚",
    lessons: 13,
  },
  {
    id: "calculo-diferencial",
    title: "Cálculo Diferencial",
    description: "Derivadas y sus aplicaciones.",
    icon: "⚙️",
    lessons: 18,
  },
  {
    id: "calculo-integral",
    title: "Cálculo Integral",
    description: "Integrales y áreas bajo curvas.",
    icon: "🌀",
    lessons: 20,
  },
  {
    id: "geometria-3d",
    title: "Geometría 3D",
    description: "Figuras tridimensionales y volúmenes.",
    icon: "📦",
    lessons: 12,
  },
  {
    id: "historia",
    title: "Historia de las Matemáticas",
    description: "Conoce grandes matemáticos y sus descubrimientos.",
    icon: "📜",
    lessons: 7,
  },
  {
    id: "problemas",
    title: "Resolución de Problemas",
    description: "Estrategias para resolver ejercicios complejos.",
    icon: "💡",
    lessons: 15,
  },
]

// Estado de la aplicación
let isDarkMode = true
let coins = 150
let userXP = 60

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const profileBtn = document.getElementById("profileBtn")
const mathGrid = document.getElementById("mathGrid")
const coinCount = document.getElementById("coinCount")
const xpFill = document.getElementById("xpFill")
const xpValue = document.getElementById("xpValue")

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  renderMathCards()
  setupEventListeners()
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

  // Cerrar menú de perfil al hacer clic fuera
  document.addEventListener("click", (e) => {
    if (!profileBtn.contains(e.target)) {
      closeProfile()
    }
  })

  // Manejar tecla Escape para cerrar menú
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

  // Añadir animación de rotación
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

function renderMathCards() {
  mathGrid.innerHTML = ""

  mathTopics.forEach((topic, index) => {
    const card = createMathCard(topic, index)
    mathGrid.appendChild(card)
  })
}

function createMathCard(topic, index) {
  const card = document.createElement("div")
  card.className = "card"
  card.style.animationDelay = `${index * 100}ms`

  card.innerHTML = `
        <div class="card-lessons">${topic.lessons} lecciones</div>
        <div class="card-icon">${topic.icon}</div>
        <h3>${topic.title}</h3>
        <p>${topic.description}</p>
    `

  // Añadir evento de clic
  card.addEventListener("click", () => {
    handleTopicClick(topic)
  })

  // Añadir animación de entrada
  setTimeout(() => {
    card.style.animation = "slideUp 0.6s ease forwards"
  }, index * 100)

  return card
}

function handleTopicClick(topic) {
  // Simular ganancia de monedas
  coins += 10
  localStorage.setItem("coins", coins)
  updateUI()

  // Mostrar feedback visual
  showNotification(`¡Has seleccionado ${topic.title}! +10 monedas`)

  // Aquí podrías redirigir a la página específica del tema
  if (topic.id === "geometria") {
    setTimeout(() => {
      window.location.href = "geometria-basica.html"
    }, 1000)
  } else {
    console.log(`Navegando a: ${topic.id}`)
  }
}

function showNotification(message) {
  // Crear elemento de notificación
  const notification = document.createElement("div")
  notification.style.cssText = `
        position: fixed;
        top: 20px;
        right: 20px;
        background: var(--accent-primary);
        color: white;
        padding: 1rem 1.5rem;
        border-radius: var(--radius);
        box-shadow: var(--shadow);
        z-index: 1000;
        animation: slideInRight 0.3s ease;
    `
  notification.textContent = message

  document.body.appendChild(notification)

  // Remover después de 3 segundos
  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      document.body.removeChild(notification)
    }, 300)
  }, 3000)
}

// Añadir estilos para las notificaciones
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

// Función para simular progreso del usuario
function updateUserProgress() {
  if (userXP < 100) {
    userXP += 5
    localStorage.setItem("userXP", userXP)
    updateUI()
  }
}

// Simular progreso cada vez que se hace clic en una tarjeta
mathGrid.addEventListener("click", (e) => {
  if (e.target.closest(".card")) {
    updateUserProgress()
  }
})

// Función para actualizar progreso de matemáticas desde otras páginas
function updateMathProgress() {
  const geometryProgress = localStorage.getItem("geometryProgress") || 0
  // Aquí puedes añadir el progreso de otras materias cuando las crees
  const totalProgress = Number.parseInt(geometryProgress)

  // Actualizar en el menú principal si existe
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(
      {
        type: "updateProgress",
        subject: "matematica",
        progress: Math.min(totalProgress, 100),
      },
      "*",
    )
  }
}

// Escuchar mensajes de progreso
window.addEventListener("message", (event) => {
  if (event.data.type === "updateProgress" && event.data.subject === "matematica") {
    // Actualizar progreso local si es necesario
    localStorage.setItem("mathProgress", event.data.progress)
  }
})
