// Datos de las lecciones de geometría básica
const geometryLessons = [
  {
    id: "puntos-lineas",
    title: "Puntos y Líneas",
    description: "Conceptos fundamentales: puntos, líneas, segmentos y rayos.",
    icon: "📍",
    duration: "15 min",
    progress: 0,
    status: "available", // Todas desbloqueadas
    content: {
      theory: "Un punto es una posición exacta en el espacio. Una línea es una sucesión infinita de puntos.",
      examples: ["Punto A", "Línea AB", "Segmento CD"],
      exercises: 5,
    },
  },
  {
    id: "angulos",
    title: "Ángulos",
    description: "Tipos de ángulos: agudos, rectos, obtusos y llanos.",
    icon: "📐",
    duration: "20 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "Un ángulo se forma cuando dos líneas se encuentran en un punto.",
      examples: ["Ángulo agudo: < 90°", "Ángulo recto: = 90°", "Ángulo obtuso: > 90°"],
      exercises: 8,
    },
  },
  {
    id: "triangulos",
    title: "Triángulos",
    description: "Clasificación y propiedades de los triángulos.",
    icon: "🔺",
    duration: "25 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "Un triángulo es un polígono de tres lados y tres ángulos.",
      examples: ["Equilátero", "Isósceles", "Escaleno"],
      exercises: 10,
    },
  },
  {
    id: "cuadrilateros",
    title: "Cuadriláteros",
    description: "Cuadrados, rectángulos, rombos y paralelogramos.",
    icon: "⬜",
    duration: "30 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "Los cuadriláteros son polígonos de cuatro lados.",
      examples: ["Cuadrado", "Rectángulo", "Rombo", "Paralelogramo"],
      exercises: 12,
    },
  },
  {
    id: "circulos",
    title: "Círculos",
    description: "Radio, diámetro, circunferencia y área del círculo.",
    icon: "⭕",
    duration: "20 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "Un círculo es el conjunto de puntos equidistantes de un centro.",
      examples: ["Radio = 5cm", "Diámetro = 10cm", "Circunferencia = 31.4cm"],
      exercises: 8,
    },
  },
  {
    id: "perimetros",
    title: "Perímetros",
    description: "Cálculo de perímetros de diferentes figuras.",
    icon: "📏",
    duration: "25 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "El perímetro es la suma de todos los lados de una figura.",
      examples: ["Cuadrado: 4 × lado", "Rectángulo: 2 × (largo + ancho)"],
      exercises: 15,
    },
  },
  {
    id: "areas",
    title: "Áreas",
    description: "Cálculo de áreas de figuras planas básicas.",
    icon: "📊",
    duration: "30 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "El área es la medida de la superficie de una figura.",
      examples: ["Cuadrado: lado²", "Rectángulo: largo × ancho", "Triángulo: (base × altura) ÷ 2"],
      exercises: 18,
    },
  },
  {
    id: "simetria",
    title: "Simetría",
    description: "Simetría axial y central en figuras geométricas.",
    icon: "🪞",
    duration: "20 min",
    progress: 0,
    status: "available", // Desbloqueado
    content: {
      theory: "La simetría es cuando una figura se puede dividir en partes iguales.",
      examples: ["Simetría axial", "Simetría central", "Figuras simétricas"],
      exercises: 10,
    },
  },
]

// Estado de la aplicación
let isDarkMode = true
let coins = Number.parseInt(localStorage.getItem("coins")) || 150
let userXP = Number.parseInt(localStorage.getItem("userXP")) || 60
let geometryProgress = Number.parseInt(localStorage.getItem("geometryProgress")) || 0
const completedLessons = JSON.parse(localStorage.getItem("completedLessons")) || []
let totalPointsEarned = Number.parseInt(localStorage.getItem("totalPointsEarned")) || 0

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const profileBtn = document.getElementById("profileBtn")
const lessonsGrid = document.getElementById("lessonsGrid")
const coinCount = document.getElementById("coinCount")
const xpFill = document.getElementById("xpFill")
const xpValue = document.getElementById("xpValue")

// Modales
const gameModal = document.getElementById("gameModal")
const toolModal = document.getElementById("toolModal")
const lessonModal = document.getElementById("lessonModal")

// Botones de cierre
const closeGameModal = document.getElementById("closeGameModal")
const closeToolModal = document.getElementById("closeToolModal")
const closeLessonModal = document.getElementById("closeLessonModal")

// Estadísticas del hero
const completedLessonsEl = document.getElementById("completedLessons")
const totalPointsEl = document.getElementById("totalPoints")
const overallProgressEl = document.getElementById("overallProgress")
const progressFillLarge = document.getElementById("progressFillLarge")
const progressText = document.getElementById("progressText")
const nextLesson = document.getElementById("nextLesson")

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
  renderLessons()
  setupEventListeners()
  updateProgressDisplay()
  updateLessonAvailability()
})

function initializeApp() {
  // Cargar tema guardado
  const savedTheme = localStorage.getItem("theme")
  if (savedTheme === "light") {
    toggleTheme()
  }

  updateUI()
}

function updateUI() {
  coinCount.textContent = coins
  xpFill.style.width = `${userXP}%`
  xpValue.textContent = userXP

  // Actualizar estadísticas del hero
  completedLessonsEl.textContent = completedLessons.length
  totalPointsEl.textContent = totalPointsEarned
  overallProgressEl.textContent = geometryProgress

  // Actualizar barra de progreso grande
  progressFillLarge.style.width = `${geometryProgress}%`
  progressText.textContent = `${geometryProgress}% completado`

  // Mostrar siguiente lección
  const nextLessonData = getNextAvailableLesson()
  nextLesson.textContent = nextLessonData ? `Siguiente: ${nextLessonData.title}` : "¡Todas las lecciones completadas!"
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

  // Juegos
  document.getElementById("shapeMemory").addEventListener("click", () => openGame("memory"))
  document.getElementById("shapeBuilder").addEventListener("click", () => openGame("builder"))
  document.getElementById("angleGame").addEventListener("click", () => openGame("angles"))
  document.getElementById("perimeterRace").addEventListener("click", () => openGame("perimeter"))

  // Herramientas
  document.getElementById("calculator").addEventListener("click", () => openTool("calculator"))
  document.getElementById("protractor").addEventListener("click", () => openTool("protractor"))
  document.getElementById("compass").addEventListener("click", () => openTool("compass"))

  // Cerrar modales
  closeGameModal.addEventListener("click", () => closeModal(gameModal))
  closeToolModal.addEventListener("click", () => closeModal(toolModal))
  closeLessonModal.addEventListener("click", () => closeModal(lessonModal))

  // Cerrar modales al hacer clic fuera
  ;[gameModal, toolModal, lessonModal].forEach((modal) => {
    modal.addEventListener("click", (e) => {
      if (e.target === modal) {
        closeModal(modal)
      }
    })
  })

  // Tecla Escape para cerrar modales
  document.addEventListener("keydown", (e) => {
    if (e.key === "Escape") {
      closeProfile()
      closeModal(gameModal)
      closeModal(toolModal)
      closeModal(lessonModal)
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

function renderLessons() {
  lessonsGrid.innerHTML = ""

  geometryLessons.forEach((lesson, index) => {
    const lessonCard = createLessonCard(lesson, index)
    lessonsGrid.appendChild(lessonCard)
  })
}

function createLessonCard(lesson, index) {
  const card = document.createElement("div")
  card.className = `lesson-card ${lesson.status === "locked" ? "locked" : ""}`
  card.style.animationDelay = `${index * 100}ms`

  const statusClass = `status-${lesson.status}`
  const isLocked = lesson.status === "locked"
  const isCompleted = completedLessons.includes(lesson.id)

  if (isCompleted) {
    lesson.status = "completed"
    lesson.progress = 100
  }

  card.innerHTML = `
    <div class="lesson-header">
      <div class="lesson-icon">${lesson.icon}</div>
      <div class="lesson-info">
        <h3>${lesson.title}</h3>
        <div class="lesson-duration">⏱️ ${lesson.duration}</div>
      </div>
    </div>
    <p class="lesson-description">${lesson.description}</p>
    <div class="lesson-progress">
      <div class="progress-bar">
        <div class="progress-fill-lesson" style="width: ${lesson.progress}%"></div>
      </div>
      <span class="progress-text">${lesson.progress}%</span>
    </div>
    <div class="lesson-status ${statusClass}">
      ${getStatusText(lesson.status)}
    </div>
  `

  if (!isLocked) {
    card.addEventListener("click", () => {
      openLesson(lesson)
    })
    card.style.cursor = "pointer"
  }

  // Animación de entrada
  setTimeout(() => {
    card.style.animation = "slideUp 0.6s ease forwards"
  }, index * 100)

  return card
}

function getStatusText(status) {
  switch (status) {
    case "completed":
      return "✅ Completado"
    case "in-progress":
      return "🔄 En progreso"
    case "locked":
      return "🔒 Bloqueado"
    case "available":
      return "📚 Disponible"
    default:
      return "📚 Disponible"
  }
}

function updateLessonAvailability() {
  // Todas las lecciones están disponibles ahora
  geometryLessons.forEach((lesson) => {
    if (completedLessons.includes(lesson.id)) {
      lesson.status = "completed"
    } else {
      lesson.status = "available"
    }
  })
}

function getNextAvailableLesson() {
  return geometryLessons.find((lesson) => lesson.status === "available")
}

function openLesson(lesson) {
  if (lesson.status === "locked") return

  const lessonTitle = document.getElementById("lessonTitle")
  const lessonBody = document.getElementById("lessonBody")

  lessonTitle.textContent = lesson.title
  lessonBody.innerHTML = createLessonContent(lesson)

  lessonModal.style.display = "block"
}

function createLessonContent(lesson) {
  return `
    <div class="lesson-content">
      <div class="lesson-intro">
        <div class="lesson-icon-large">${lesson.icon}</div>
        <h2>${lesson.title}</h2>
        <p class="lesson-description-full">${lesson.description}</p>
      </div>
      
      <div class="lesson-theory">
        <h3>📚 Teoría</h3>
        <p>${lesson.content.theory}</p>
      </div>
      
      <div class="lesson-examples">
        <h3>💡 Ejemplos</h3>
        <ul>
          ${lesson.content.examples.map((example) => `<li>${example}</li>`).join("")}
        </ul>
      </div>
      
      <div class="lesson-interactive">
        <h3>🎮 Actividad Interactiva</h3>
        <div class="interactive-area" id="interactive-${lesson.id}">
          ${createInteractiveContent(lesson)}
        </div>
      </div>
      
      <div class="lesson-actions">
        <button class="lesson-btn complete-btn" onclick="completeLesson('${lesson.id}')">
          ✅ Completar Lección (+50 monedas, +25 XP)
        </button>
      </div>
    </div>
    
    <style>
      .lesson-content { padding: 1rem; }
      .lesson-intro { text-align: center; margin-bottom: 2rem; }
      .lesson-icon-large { font-size: 4rem; margin-bottom: 1rem; }
      .lesson-intro h2 { font-size: 2rem; margin-bottom: 1rem; color: var(--accent-primary); }
      .lesson-description-full { font-size: 1.1rem; color: var(--text-muted); }
      .lesson-theory, .lesson-examples, .lesson-interactive { 
        margin-bottom: 2rem; 
        padding: 1.5rem; 
        background: var(--bg-secondary); 
        border-radius: var(--radius); 
      }
      .lesson-theory h3, .lesson-examples h3, .lesson-interactive h3 { 
        margin-bottom: 1rem; 
        color: var(--accent-primary); 
      }
      .lesson-examples ul { padding-left: 1.5rem; }
      .lesson-examples li { margin-bottom: 0.5rem; }
      .interactive-area { 
        background: var(--bg-card); 
        padding: 2rem; 
        border-radius: var(--radius); 
        border: 1px solid var(--border-color); 
      }
      .lesson-actions { text-align: center; margin-top: 2rem; }
      .lesson-btn { 
        background: linear-gradient(135deg, var(--accent-primary), #3b82f6); 
        color: white; 
        border: none; 
        padding: 1rem 2rem; 
        border-radius: var(--radius); 
        font-weight: 600; 
        cursor: pointer; 
        transition: var(--transition); 
      }
      .lesson-btn:hover { 
        transform: translateY(-2px); 
        box-shadow: 0 10px 25px rgba(16, 185, 129, 0.3); 
      }
      .quiz-question { margin-bottom: 1rem; font-weight: 600; }
      .quiz-options { display: grid; gap: 0.5rem; margin-bottom: 1rem; }
      .quiz-option { 
        padding: 0.75rem; 
        background: var(--bg-card); 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        cursor: pointer; 
        transition: var(--transition); 
      }
      .quiz-option:hover { background: var(--accent-primary); color: white; }
      .quiz-option.correct { background: #10b981; color: white; }
      .quiz-option.incorrect { background: #ef4444; color: white; }
    </style>
  `
}

function createInteractiveContent(lesson) {
  switch (lesson.id) {
    case "puntos-lineas":
      return `
        <div class="quiz-container">
          <div class="quiz-question">¿Cuál de estas afirmaciones es correcta sobre los puntos?</div>
          <div class="quiz-options">
            <div class="quiz-option" onclick="selectAnswer(this, false)">Los puntos tienen tamaño</div>
            <div class="quiz-option" onclick="selectAnswer(this, true)">Los puntos representan una posición exacta</div>
            <div class="quiz-option" onclick="selectAnswer(this, false)">Los puntos son líneas muy cortas</div>
          </div>
          <div id="quiz-result"></div>
        </div>
      `
    case "angulos":
      return `
        <div class="quiz-container">
          <div class="quiz-question">¿Cuántos grados tiene un ángulo recto?</div>
          <div class="quiz-options">
            <div class="quiz-option" onclick="selectAnswer(this, false)">45°</div>
            <div class="quiz-option" onclick="selectAnswer(this, true)">90°</div>
            <div class="quiz-option" onclick="selectAnswer(this, false)">180°</div>
          </div>
          <div id="quiz-result"></div>
        </div>
      `
    default:
      return `
        <div class="quiz-container">
          <div class="quiz-question">¿Has entendido el contenido de esta lección?</div>
          <div class="quiz-options">
            <div class="quiz-option" onclick="selectAnswer(this, true)">Sí, lo entendí perfectamente</div>
            <div class="quiz-option" onclick="selectAnswer(this, true)">Sí, pero necesito más práctica</div>
            <div class="quiz-option" onclick="selectAnswer(this, false)">No, necesito repasar</div>
          </div>
          <div id="quiz-result"></div>
        </div>
      `
  }
}

// Función global para seleccionar respuestas
window.selectAnswer = (element, isCorrect) => {
  const options = element.parentNode.querySelectorAll(".quiz-option")
  const result = document.getElementById("quiz-result")

  options.forEach((option) => {
    option.style.pointerEvents = "none"
    if (option === element) {
      option.classList.add(isCorrect ? "correct" : "incorrect")
    }
  })

  if (isCorrect) {
    result.innerHTML = '<div style="color: var(--accent-primary); font-weight: 600;">¡Correcto! 🎉</div>'
  } else {
    result.innerHTML = '<div style="color: #ef4444; font-weight: 600;">Incorrecto. Inténtalo de nuevo. 🤔</div>'
  }
}

// Función global para completar lecciones
window.completeLesson = (lessonId) => {
  if (!completedLessons.includes(lessonId)) {
    completedLessons.push(lessonId)
    coins += 50
    userXP = Math.min(userXP + 25, 100)
    totalPointsEarned += 75

    // Calcular progreso general (geometría es 1/16 de matemáticas)
    geometryProgress = Math.round((completedLessons.length / geometryLessons.length) * 100)

    // Guardar en localStorage
    localStorage.setItem("completedLessons", JSON.stringify(completedLessons))
    localStorage.setItem("coins", coins)
    localStorage.setItem("userXP", userXP)
    localStorage.setItem("totalPointsEarned", totalPointsEarned)
    localStorage.setItem("geometryProgress", geometryProgress)

    // Actualizar progreso en matemáticas (geometría es 1/16 del total)
    updateMathProgress()

    // Actualizar UI
    updateUI()
    updateLessonAvailability()
    renderLessons()

    // Mostrar notificación
    showNotification(`¡Lección completada! +50 monedas, +25 XP`)

    // Cerrar modal
    closeModal(lessonModal)
  }
}

function updateMathProgress() {
  // Geometría representa 1/16 del progreso total de matemáticas
  const mathProgress = Math.round(geometryProgress / 16)

  // Enviar mensaje al menú principal para actualizar progreso
  if (window.opener && !window.opener.closed) {
    window.opener.postMessage(
      {
        type: "updateProgress",
        subject: "matematica",
        progress: mathProgress,
      },
      "*",
    )
  }

  // También actualizar localStorage para persistencia
  localStorage.setItem("mathProgress", mathProgress)
}

function updateProgressDisplay() {
  // Actualizar todas las estadísticas de progreso
  updateUI()
}

function openGame(gameType) {
  const gameTitle = document.getElementById("gameTitle")
  const gameBody = document.getElementById("gameBody")

  let title, content

  switch (gameType) {
    case "memory":
      title = "Memoria de Figuras Geométricas"
      content = createMemoryGame()
      break
    case "builder":
      title = "Constructor de Figuras"
      content = createBuilderGame()
      break
    case "angles":
      title = "Cazador de Ángulos"
      content = createAngleGame()
      break
    case "perimeter":
      title = "Carrera de Perímetros"
      content = createPerimeterGame()
      break
  }

  gameTitle.textContent = title
  gameBody.innerHTML = content
  gameModal.style.display = "block"

  // Inicializar el juego específico
  setTimeout(() => {
    if (gameType === "memory") {
      initMemoryGame()
    } else if (gameType === "builder") {
      initBuilderCanvas()
    } else if (gameType === "angles") {
      initAngleGame()
    } else if (gameType === "perimeter") {
      initPerimeterGame()
    }
  }, 100)
}

function createMemoryGame() {
  return `
    <div class="memory-game">
      <div class="game-info">
        <div class="game-stats-display">
          <span>Movimientos: <span id="moves">0</span></span>
          <span>Parejas: <span id="pairs">0/6</span></span>
          <span>Tiempo: <span id="timer">00:00</span></span>
        </div>
      </div>
      <div class="memory-grid" id="memoryGrid">
         Las cartas se generarán dinámicamente 
      </div>
      <div class="game-actions">
        <button class="game-start-btn" onclick="resetMemoryGame()">
          <span class="btn-icon">🔄</span>
          <span class="btn-text">Reiniciar Juego</span>
        </button>
      </div>
    </div>
    
    <style>
      .memory-game { padding: 1rem; }
      .game-info { text-align: center; margin-bottom: 2rem; }
      .game-stats-display { 
        display: flex; 
        justify-content: center; 
        gap: 2rem; 
        font-weight: 600; 
      }
      .memory-grid { 
        display: grid; 
        grid-template-columns: repeat(4, 1fr); 
        gap: 1rem; 
        max-width: 400px; 
        margin: 0 auto 2rem; 
      }
      .memory-card { 
        aspect-ratio: 1; 
        background: var(--bg-secondary); 
        border: 2px solid var(--border-color); 
        border-radius: var(--radius); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 2rem; 
        cursor: pointer; 
        transition: var(--transition); 
        position: relative;
        overflow: hidden;
      }
      .memory-card:hover { 
        transform: scale(1.05); 
        border-color: var(--accent-primary); 
      }
      .memory-card.flipped { 
        background: var(--accent-primary); 
        color: white; 
      }
      .memory-card.matched { 
        background: #10b981; 
        color: white; 
        cursor: default;
      }
      .memory-card.matched:hover { 
        transform: none; 
      }
      .card-back { 
        position: absolute; 
        inset: 0; 
        background: var(--bg-card); 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        font-size: 1.5rem; 
        transition: transform 0.3s ease;
      }
      .memory-card.flipped .card-back { 
        transform: rotateY(180deg); 
      }
      .game-actions { 
        text-align: center; 
      }
    </style>
  `
}

function createBuilderGame() {
  return `
    <div class="builder-game">
      <div class="builder-instructions">
        <h4>🎯 Objetivo: Construye la figura mostrada</h4>
        <div class="target-shape" id="targetShape">
          <div class="shape-display">🔺</div>
          <p>Construye un triángulo haciendo clic en 3 puntos</p>
        </div>
      </div>
      
      <div class="builder-workspace">
        <canvas id="builderCanvas" width="400" height="300"></canvas>
        <p class="canvas-instruction">Haz clic en el canvas para dibujar puntos</p>
      </div>
      
      <div class="builder-tools">
        <h4>Herramientas:</h4>
        <div class="tool-buttons">
          <button class="tool-button active" data-tool="triangle" onclick="setBuilderTool('triangle')">🔺 Triángulo</button>
          <button class="tool-button" data-tool="square" onclick="setBuilderTool('square')">⬜ Cuadrado</button>
          <button class="tool-button" data-tool="circle" onclick="setBuilderTool('circle')">⭕ Círculo</button>
          <button class="tool-button" data-tool="clear" onclick="clearBuilderCanvas()">🗑️ Limpiar</button>
        </div>
      </div>
      
      <div class="builder-actions">
        <button class="game-start-btn" onclick="checkBuilderSolution()">
          <span class="btn-icon">✅</span>
          <span class="btn-text">Verificar Solución</span>
        </button>
        <button class="game-start-btn secondary" onclick="nextBuilderChallenge()">
          <span class="btn-icon">➡️</span>
          <span class="btn-text">Siguiente Desafío</span>
        </button>
      </div>
    </div>
    
    <style>
      .builder-game { padding: 1rem; }
      .builder-instructions { text-align: center; margin-bottom: 2rem; }
      .target-shape { 
        background: var(--bg-secondary); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
        margin: 1rem auto; 
        max-width: 300px; 
      }
      .shape-display { 
        font-size: 4rem; 
        margin-bottom: 0.5rem; 
      }
      .builder-workspace { 
        text-align: center; 
        margin-bottom: 2rem; 
      }
      .canvas-instruction {
        margin-top: 1rem;
        color: var(--text-muted);
        font-style: italic;
      }
      #builderCanvas { 
        border: 2px solid var(--border-color); 
        border-radius: var(--radius); 
        background: white; 
        cursor: crosshair;
        max-width: 100%;
        display: block;
        margin: 0 auto;
      }
      .builder-tools { 
        text-align: center; 
        margin-bottom: 2rem; 
      }
      .tool-buttons { 
        display: flex; 
        justify-content: center; 
        gap: 1rem; 
        margin-top: 1rem; 
        flex-wrap: wrap; 
      }
      .tool-button { 
        padding: 0.75rem 1rem; 
        border: 2px solid var(--border-color); 
        background: var(--bg-card); 
        color: var(--text-primary); 
        border-radius: var(--radius); 
        cursor: pointer; 
        transition: var(--transition);
        font-weight: 600;
      }
      .tool-button:hover, .tool-button.active { 
        background: var(--accent-primary); 
        color: white; 
        border-color: var(--accent-primary);
        transform: translateY(-2px);
      }
      .builder-actions { 
        text-align: center; 
        display: flex; 
        justify-content: center; 
        gap: 1rem; 
        flex-wrap: wrap;
      }
      
      @media (max-width: 768px) {
        #builderCanvas {
          width: 100%;
          max-width: 350px;
          height: 250px;
        }
        .tool-buttons {
          gap: 0.5rem;
        }
        .tool-button {
          padding: 0.5rem 0.75rem;
          font-size: 0.9rem;
        }
      }
    </style>
  `
}

function createAngleGame() {
  return `
    <div class="angle-game">
      <div class="game-header">
        <h4>🎯 Identifica el tipo de ángulo</h4>
        <div class="score-display">
          Puntuación: <span id="angleScore">0</span> | 
          Pregunta: <span id="angleQuestion">1</span>/10
        </div>
      </div>
      
      <div class="angle-display" id="angleDisplay">
        <canvas id="angleCanvas" width="300" height="200"></canvas>
        <div class="angle-value" id="angleValue">?°</div>
      </div>
      
      <div class="angle-options">
        <button class="angle-option" onclick="selectAngleType('agudo')">📐 Ángulo Agudo (< 90°)</button>
        <button class="angle-option" onclick="selectAngleType('recto')">📏 Ángulo Recto (= 90°)</button>
        <button class="angle-option" onclick="selectAngleType('obtuso')">📐 Ángulo Obtuso (> 90°)</button>
        <button class="angle-option" onclick="selectAngleType('llano')">📏 Ángulo Llano (= 180°)</button>
      </div>
      
      <div class="angle-feedback" id="angleFeedback"></div>
      
      <div class="game-actions">
        <button class="game-start-btn" onclick="initAngleGame()">
          <span class="btn-icon">🚀</span>
          <span class="btn-text">Nuevo Juego</span>
        </button>
      </div>
    </div>
    
    <style>
      .angle-game { padding: 1rem; text-align: center; }
      .game-header { margin-bottom: 2rem; }
      .score-display { 
        font-weight: 600; 
        color: var(--accent-primary); 
        margin-top: 0.5rem; 
      }
      .angle-display { 
        background: var(--bg-secondary); 
        padding: 2rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
        position: relative; 
      }
      #angleCanvas { 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        background: white; 
      }
      .angle-value { 
        font-size: 1.5rem; 
        font-weight: bold; 
        color: var(--accent-primary); 
        margin-top: 1rem; 
      }
      .angle-options { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: 1rem; 
        margin-bottom: 2rem; 
      }
      .angle-option { 
        padding: 1rem; 
        border: 1px solid var(--border-color); 
        background: var(--bg-card); 
        color: var(--text-primary); 
        border-radius: var(--radius); 
        cursor: pointer; 
        transition: var(--transition); 
        font-weight: 600; 
      }
      .angle-option:hover { 
        background: var(--accent-primary); 
        color: white; 
        transform: translateY(-2px); 
      }
      .angle-option.correct { 
        background: #10b981; 
        color: white; 
      }
      .angle-option.incorrect { 
        background: #ef4444; 
        color: white; 
      }
      .angle-feedback { 
        font-size: 1.1rem; 
        font-weight: 600; 
        min-height: 2rem; 
        margin-bottom: 2rem;
      }
      .game-actions {
        text-align: center;
      }
    </style>
  `
}

function createPerimeterGame() {
  return `
    <div class="perimeter-game">
      <div class="game-header">
        <h4>⚡ Calcula el perímetro lo más rápido posible</h4>
        <div class="game-stats">
          <span>Tiempo: <span id="perimeterTimer">60</span>s</span>
          <span>Puntos: <span id="perimeterScore">0</span></span>
          <span>Racha: <span id="perimeterStreak">0</span></span>
        </div>
      </div>
      
      <div class="perimeter-question" id="perimeterQuestion">
        <p>Haz clic en "Iniciar Juego" para comenzar</p>
      </div>
      
      <div class="perimeter-input">
        <input type="number" id="perimeterAnswer" placeholder="Ingresa el perímetro" step="0.1" disabled>
        <button class="submit-btn" onclick="checkPerimeterAnswer()" disabled>✅ Enviar</button>
      </div>
      
      <div class="perimeter-feedback" id="perimeterFeedback"></div>
      
      <div class="game-actions">
        <button class="game-start-btn" onclick="startPerimeterGame()">
          <span class="btn-icon">🚀</span>
          <span class="btn-text">Iniciar Juego</span>
        </button>
      </div>
    </div>
    
    <style>
      .perimeter-game { padding: 1rem; text-align: center; }
      .game-header { margin-bottom: 2rem; }
      .game-stats { 
        display: flex; 
        justify-content: center; 
        gap: 2rem; 
        margin-top: 1rem; 
        font-weight: 600; 
        color: var(--accent-primary); 
      }
      .perimeter-question { 
        background: var(--bg-secondary); 
        padding: 2rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
        font-size: 1.2rem; 
      }
      .shape-diagram { 
        font-size: 4rem; 
        margin: 1rem 0; 
      }
      .shape-measurements { 
        font-weight: 600; 
        color: var(--accent-primary); 
        margin-top: 1rem; 
      }
      .perimeter-input { 
        display: flex; 
        justify-content: center; 
        gap: 1rem; 
        margin-bottom: 2rem; 
      }
      #perimeterAnswer { 
        padding: 0.75rem; 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        background: var(--bg-card); 
        color: var(--text-primary); 
        font-size: 1.1rem; 
        width: 200px; 
      }
      .submit-btn { 
        padding: 0.75rem 1.5rem; 
        background: var(--accent-primary); 
        color: white; 
        border: none; 
        border-radius: var(--radius); 
        cursor: pointer; 
        font-weight: 600; 
        transition: var(--transition); 
      }
      .submit-btn:hover:not(:disabled) { 
        background: var(--accent-hover); 
        transform: translateY(-2px); 
      }
      .submit-btn:disabled {
        opacity: 0.5;
        cursor: not-allowed;
      }
      .perimeter-feedback { 
        font-size: 1.1rem; 
        font-weight: 600; 
        min-height: 2rem; 
        margin-bottom: 2rem; 
      }
      .game-actions {
        text-align: center;
      }
    </style>
  `
}

// Estilos mejorados para los botones de iniciar juego
const gameButtonStyles = `
<style>
.game-start-btn {
  background: linear-gradient(135deg, #10b981, #059669, #047857);
  color: white;
  border: none;
  padding: 1rem 2rem;
  border-radius: 12px;
  font-weight: 700;
  cursor: pointer;
  transition: all 0.3s cubic-bezier(0.4, 0, 0.2, 1);
  position: relative;
  overflow: hidden;
  box-shadow: 0 8px 25px rgba(16, 185, 129, 0.4);
  text-transform: uppercase;
  letter-spacing: 1px;
  font-size: 0.9rem;
  display: inline-flex;
  align-items: center;
  gap: 0.75rem;
  min-width: 180px;
  justify-content: center;
}

.game-start-btn::before {
  content: "";
  position: absolute;
  top: 0;
  left: -100%;
  width: 100%;
  height: 100%;
  background: linear-gradient(90deg, transparent, rgba(255, 255, 255, 0.4), transparent);
  transition: left 0.6s ease;
}

.game-start-btn:hover::before {
  left: 100%;
}

.game-start-btn:hover {
  transform: translateY(-4px) scale(1.05);
  box-shadow: 0 15px 35px rgba(16, 185, 129, 0.5);
  background: linear-gradient(135deg, #059669, #047857, #065f46);
}

.game-start-btn:active {
  transform: translateY(-2px) scale(1.02);
  box-shadow: 0 8px 20px rgba(16, 185, 129, 0.4);
}

.game-start-btn.secondary {
  background: linear-gradient(135deg, #3b82f6, #2563eb, #1d4ed8);
  box-shadow: 0 8px 25px rgba(59, 130, 246, 0.4);
}

.game-start-btn.secondary:hover {
  background: linear-gradient(135deg, #2563eb, #1d4ed8, #1e40af);
  box-shadow: 0 15px 35px rgba(59, 130, 246, 0.5);
}

.btn-icon {
  font-size: 1.2rem;
  filter: drop-shadow(0 2px 4px rgba(0, 0, 0, 0.3));
}

.btn-text {
  font-weight: 700;
  text-shadow: 0 2px 4px rgba(0, 0, 0, 0.3);
}

@media (max-width: 768px) {
  .game-start-btn {
    padding: 0.875rem 1.5rem;
    font-size: 0.8rem;
    min-width: 150px;
  }
  
  .btn-icon {
    font-size: 1rem;
  }
}
</style>
`

// Añadir los estilos al head
document.head.insertAdjacentHTML("beforeend", gameButtonStyles)

// Variables para los juegos
let memoryCards = []
let flippedCards = []
let matchedPairs = 0
let moves = 0
let memoryTimer = 0
let memoryInterval

const angleGameData = {
  currentQuestion: 1,
  score: 0,
  totalQuestions: 10,
  currentAngle: 0,
  correctType: "",
}

let perimeterGameData = {
  timeLeft: 60,
  score: 0,
  streak: 0,
  currentQuestion: null,
  isActive: false,
  timer: null,
}

function initMemoryGame() {
  const shapes = ["🔺", "⬜", "⭕", "🔶", "⬟", "🔷"]
  const gameShapes = [...shapes, ...shapes] // Duplicar para parejas

  // Mezclar cartas
  memoryCards = gameShapes.sort(() => Math.random() - 0.5)

  const grid = document.getElementById("memoryGrid")
  grid.innerHTML = ""

  memoryCards.forEach((shape, index) => {
    const card = document.createElement("div")
    card.className = "memory-card"
    card.dataset.index = index
    card.dataset.shape = shape

    card.innerHTML = `
      <div class="card-back">❓</div>
      <div class="card-front">${shape}</div>
    `

    card.addEventListener("click", () => flipCard(card, index))
    grid.appendChild(card)
  })

  // Inicializar estadísticas
  moves = 0
  matchedPairs = 0
  memoryTimer = 0
  flippedCards = []

  updateMemoryStats()
  startMemoryTimer()
}

function flipCard(card, index) {
  if (flippedCards.length >= 2 || card.classList.contains("flipped") || card.classList.contains("matched")) {
    return
  }

  card.classList.add("flipped")
  flippedCards.push({ card, index, shape: card.dataset.shape })

  if (flippedCards.length === 2) {
    moves++
    updateMemoryStats()

    setTimeout(() => {
      checkMemoryMatch()
    }, 1000)
  }
}

function checkMemoryMatch() {
  const [first, second] = flippedCards

  if (first.shape === second.shape) {
    // Coincidencia
    first.card.classList.add("matched")
    second.card.classList.add("matched")
    matchedPairs++

    if (matchedPairs === 6) {
      // Juego completado
      clearInterval(memoryInterval)
      const bonus = Math.max(100 - memoryTimer, 20)
      coins += 20 + bonus
      userXP = Math.min(userXP + 15, 100)
      totalPointsEarned += 35 + bonus

      localStorage.setItem("coins", coins)
      localStorage.setItem("userXP", userXP)
      localStorage.setItem("totalPointsEarned", totalPointsEarned)

      updateUI()
      showNotification(`¡Juego completado! +${20 + bonus} monedas, +15 XP`)
    }
  } else {
    // No coinciden
    first.card.classList.remove("flipped")
    second.card.classList.remove("flipped")
  }

  flippedCards = []
  updateMemoryStats()
}

function updateMemoryStats() {
  document.getElementById("moves").textContent = moves
  document.getElementById("pairs").textContent = `${matchedPairs}/6`
}

function startMemoryTimer() {
  memoryInterval = setInterval(() => {
    memoryTimer++
    const minutes = Math.floor(memoryTimer / 60)
    const seconds = memoryTimer % 60
    document.getElementById("timer").textContent =
      `${minutes.toString().padStart(2, "0")}:${seconds.toString().padStart(2, "0")}`
  }, 1000)
}

window.resetMemoryGame = () => {
  clearInterval(memoryInterval)
  initMemoryGame()
}

function initAngleGame() {
  // Resetear datos del juego
  angleGameData.currentQuestion = 1
  angleGameData.score = 0

  generateAngleQuestion()
}

function generateAngleQuestion() {
  const canvas = document.getElementById("angleCanvas")
  const ctx = canvas.getContext("2d")

  // Generar ángulo aleatorio
  const angles = [30, 45, 60, 90, 120, 135, 150, 180]
  angleGameData.currentAngle = angles[Math.floor(Math.random() * angles.length)]

  // Determinar tipo correcto
  if (angleGameData.currentAngle < 90) {
    angleGameData.correctType = "agudo"
  } else if (angleGameData.currentAngle === 90) {
    angleGameData.correctType = "recto"
  } else if (angleGameData.currentAngle < 180) {
    angleGameData.correctType = "obtuso"
  } else {
    angleGameData.correctType = "llano"
  }

  // Dibujar ángulo
  ctx.clearRect(0, 0, canvas.width, canvas.height)
  ctx.strokeStyle = "#10b981"
  ctx.lineWidth = 3

  const centerX = canvas.width / 2
  const centerY = canvas.height - 50
  const radius = 80

  // Línea base
  ctx.beginPath()
  ctx.moveTo(centerX - radius, centerY)
  ctx.lineTo(centerX + radius, centerY)
  ctx.stroke()

  // Línea del ángulo
  const angleRad = (angleGameData.currentAngle * Math.PI) / 180
  const endX = centerX + radius * Math.cos(Math.PI - angleRad)
  const endY = centerY - radius * Math.sin(Math.PI - angleRad)

  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(endX, endY)
  ctx.stroke()

  // Arco del ángulo (ahora en la parte superior)
  ctx.strokeStyle = "#ef4444"
  ctx.lineWidth = 2
  ctx.beginPath()
  // Cambiar la dirección del arco para que se abra hacia arriba
  ctx.arc(centerX, centerY, 30, 0, angleRad, false)
  ctx.stroke()

  // Mostrar valor del ángulo
  document.getElementById("angleValue").textContent = `${angleGameData.currentAngle}°`

  // Limpiar feedback
  document.getElementById("angleFeedback").innerHTML = ""

  // Resetear botones
  document.querySelectorAll(".angle-option").forEach((btn) => {
    btn.classList.remove("correct", "incorrect")
    btn.disabled = false
  })
}

window.selectAngleType = (selectedType) => {
  const buttons = document.querySelectorAll(".angle-option")
  const feedback = document.getElementById("angleFeedback")

  buttons.forEach((btn) => (btn.disabled = true))

  if (selectedType === angleGameData.correctType) {
    // Respuesta correcta
    event.target.classList.add("correct")
    angleGameData.score += 10
    feedback.innerHTML = '<div style="color: var(--accent-primary);">¡Correcto! 🎉</div>'

    // Recompensar
    coins += 5
    userXP = Math.min(userXP + 3, 100)
    totalPointsEarned += 8
  } else {
    // Respuesta incorrecta
    event.target.classList.add("incorrect")
    feedback.innerHTML = `<div style="color: #ef4444;">Incorrecto. Era un ángulo ${angleGameData.correctType}. 😔</div>`

    // Mostrar respuesta correcta
    buttons.forEach((btn) => {
      if (btn.textContent.toLowerCase().includes(angleGameData.correctType)) {
        btn.classList.add("correct")
      }
    })
  }

  // Actualizar estadísticas
  document.getElementById("angleScore").textContent = angleGameData.score
  document.getElementById("angleQuestion").textContent = angleGameData.currentQuestion

  // Siguiente pregunta
  setTimeout(() => {
    angleGameData.currentQuestion++
    if (angleGameData.currentQuestion <= angleGameData.totalQuestions) {
      generateAngleQuestion()
    } else {
      // Juego terminado
      const finalBonus = angleGameData.score
      coins += finalBonus
      userXP = Math.min(userXP + 25, 100)
      totalPointsEarned += finalBonus + 25

      localStorage.setItem("coins", coins)
      localStorage.setItem("userXP", userXP)
      localStorage.setItem("totalPointsEarned", totalPointsEarned)

      updateUI()
      showNotification(
        `¡Juego completado! Puntuación final: ${angleGameData.score}. +${finalBonus + 25} puntos totales`,
      )

      feedback.innerHTML = `<div style="color: var(--accent-primary); font-size: 1.2rem;">🎉 ¡Juego completado! Puntuación final: ${angleGameData.score}/100</div>`
    }
  }, 2000)
}

function initPerimeterGame() {
  // El juego se inicia cuando el usuario hace clic en "Iniciar Juego"
  const answerInput = document.getElementById("perimeterAnswer")
  if (answerInput) {
    answerInput.addEventListener("keypress", (e) => {
      if (e.key === "Enter" && !answerInput.disabled) {
        checkPerimeterAnswer()
      }
    })
  }
}

window.startPerimeterGame = () => {
  perimeterGameData = {
    timeLeft: 60,
    score: 0,
    streak: 0,
    currentQuestion: null,
    isActive: true,
    timer: null,
  }

  // Habilitar controles
  document.getElementById("perimeterAnswer").disabled = false
  document.querySelector(".submit-btn").disabled = false

  updatePerimeterStats()
  generatePerimeterQuestion()

  // Iniciar temporizador
  perimeterGameData.timer = setInterval(() => {
    perimeterGameData.timeLeft--
    updatePerimeterStats()

    if (perimeterGameData.timeLeft <= 0) {
      endPerimeterGame()
    }
  }, 1000)

  // Enfocar input
  document.getElementById("perimeterAnswer").focus()
}

function generatePerimeterQuestion() {
  const shapes = [
    { type: "square", name: "Cuadrado", icon: "⬜" },
    { type: "rectangle", name: "Rectángulo", icon: "▭" },
    { type: "triangle", name: "Triángulo equilátero", icon: "🔺" },
  ]

  const shape = shapes[Math.floor(Math.random() * shapes.length)]
  let question, answer, measurements

  switch (shape.type) {
    case "square":
      const side = Math.floor(Math.random() * 10) + 3
      question = `${shape.icon} ${shape.name}`
      measurements = `Lado: ${side} cm`
      answer = side * 4
      break

    case "rectangle":
      const length = Math.floor(Math.random() * 8) + 4
      const width = Math.floor(Math.random() * 6) + 2
      question = `${shape.icon} ${shape.name}`
      measurements = `Largo: ${length} cm, Ancho: ${width} cm`
      answer = 2 * (length + width)
      break

    case "triangle":
      const triangleSide = Math.floor(Math.random() * 8) + 3
      question = `${shape.icon} ${shape.name}`
      measurements = `Lado: ${triangleSide} cm`
      answer = triangleSide * 3
      break
  }

  perimeterGameData.currentQuestion = { question, measurements, answer }

  document.getElementById("perimeterQuestion").innerHTML = `
    <div class="shape-diagram">${question}</div>
    <div class="shape-measurements">${measurements}</div>
    <p>¿Cuál es el perímetro?</p>
  `

  // Limpiar input y feedback
  document.getElementById("perimeterAnswer").value = ""
  document.getElementById("perimeterFeedback").innerHTML = ""
}

window.checkPerimeterAnswer = () => {
  if (!perimeterGameData.isActive) return

  const userAnswer = Number.parseFloat(document.getElementById("perimeterAnswer").value)
  const correctAnswer = perimeterGameData.currentQuestion.answer
  const feedback = document.getElementById("perimeterFeedback")

  if (Math.abs(userAnswer - correctAnswer) < 0.1) {
    // Respuesta correcta
    const points = 10 + perimeterGameData.streak * 2
    perimeterGameData.score += points
    perimeterGameData.streak++

    feedback.innerHTML = `<div style="color: var(--accent-primary);">¡Correcto! +${points} puntos (Racha: ${perimeterGameData.streak})</div>`

    setTimeout(() => {
      generatePerimeterQuestion()
    }, 1000)
  } else {
    // Respuesta incorrecta
    perimeterGameData.streak = 0
    feedback.innerHTML = `<div style="color: #ef4444;">Incorrecto. La respuesta era ${correctAnswer} cm</div>`

    setTimeout(() => {
      generatePerimeterQuestion()
    }, 2000)
  }

  updatePerimeterStats()
}

function updatePerimeterStats() {
  document.getElementById("perimeterTimer").textContent = perimeterGameData.timeLeft
  document.getElementById("perimeterScore").textContent = perimeterGameData.score
  document.getElementById("perimeterStreak").textContent = perimeterGameData.streak
}

function endPerimeterGame() {
  clearInterval(perimeterGameData.timer)
  perimeterGameData.isActive = false

  // Deshabilitar controles
  document.getElementById("perimeterAnswer").disabled = true
  document.querySelector(".submit-btn").disabled = true

  const finalScore = perimeterGameData.score
  const bonus = Math.floor(finalScore / 2)

  coins += 35 + bonus
  userXP = Math.min(userXP + 30, 100)
  totalPointsEarned += 65 + bonus

  localStorage.setItem("coins", coins)
  localStorage.setItem("userXP", userXP)
  localStorage.setItem("totalPointsEarned", totalPointsEarned)

  updateUI()
  showNotification(`¡Tiempo agotado! Puntuación: ${finalScore}. +${65 + bonus} puntos totales`)

  document.getElementById("perimeterFeedback").innerHTML = `
    <div style="color: var(--accent-primary); font-size: 1.2rem;">
      🎉 ¡Juego terminado!<br>
      Puntuación final: ${finalScore}<br>
      Racha máxima: ${perimeterGameData.streak}
    </div>
  `
}

function openTool(toolType) {
  const toolTitle = document.getElementById("toolTitle")
  const toolBody = document.getElementById("toolBody")

  let title, content

  switch (toolType) {
    case "calculator":
      title = "Calculadora Geométrica"
      content = createCalculatorTool()
      break
    case "protractor":
      title = "Transportador Virtual"
      content = createProtractorTool()
      break
    case "compass":
      title = "Compás Digital"
      content = createCompassTool()
      break
  }

  toolTitle.textContent = title
  toolBody.innerHTML = content
  toolModal.style.display = "block"

  if (toolType === "calculator") {
    initCalculatorTool()
  } else if (toolType === "protractor") {
    initProtractorTool()
  } else if (toolType === "compass") {
    initCompassTool()
  }
}

function createCalculatorTool() {
  return `
    <div class="calculator-tool">
      <div class="calc-tabs">
        <button class="calc-tab active" data-tab="perimeter">📏 Perímetros</button>
        <button class="calc-tab" data-tab="area">📊 Áreas</button>
        <button class="calc-tab" data-tab="angles">📐 Ángulos</button>
      </div>
      
      <div class="calc-content" id="calcContent">
         Contenido dinámico 
      </div>
    </div>
    
    <style>
      .calculator-tool { padding: 1rem; }
      .calc-tabs { 
        display: flex; 
        gap: 0.5rem; 
        margin-bottom: 2rem; 
        border-bottom: 1px solid var(--border-color); 
      }
      .calc-tab { 
        padding: 0.75rem 1rem; 
        border: none; 
        background: transparent; 
        color: var(--text-muted); 
        cursor: pointer; 
        border-bottom: 2px solid transparent; 
        transition: var(--transition); 
      }
      .calc-tab.active { 
        color: var(--accent-primary); 
        border-bottom-color: var(--accent-primary); 
      }
      .calc-tab:hover { 
        color: var(--text-primary); 
      }
      .calc-section { 
        margin-bottom: 2rem; 
        padding: 1.5rem; 
        background: var(--bg-secondary); 
        border-radius: var(--radius); 
      }
      .calc-section h4 { 
        margin-bottom: 1rem; 
        color: var(--accent-primary); 
      }
      .calc-inputs { 
        display: grid; 
        gap: 1rem; 
        margin-bottom: 1rem; 
      }
      .calc-input-group { 
        display: flex; 
        flex-direction: column; 
        gap: 0.5rem; 
      }
      .calc-input-group label { 
        font-weight: 600; 
        color: var(--text-primary); 
      }
      .calc-input-group input { 
        padding: 0.75rem; 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        background: var(--bg-card); 
        color: var(--text-primary); 
      }
      .calc-button { 
        background: var(--accent-primary); 
        color: white; 
        border: none; 
        padding: 0.75rem 1.5rem; 
        border-radius: var(--radius); 
        cursor: pointer; 
        font-weight: 600; 
        transition: var(--transition); 
      }
      .calc-button:hover { 
        background: var(--accent-hover); 
        transform: translateY
      }
      .calc-button:hover { 
        background: var(--accent-hover); 
        transform: translateY(-2px); 
      }
      .calc-result { 
        background: var(--bg-card); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
        border: 1px solid var(--border-color); 
        margin-top: 1rem; 
      }
      .result-item { 
        display: flex; 
        justify-content: space-between; 
        margin-bottom: 0.5rem; 
        font-size: 1.1rem; 
      }
      .result-value { 
        font-weight: bold; 
        color: var(--accent-primary); 
      }
    </style>
  `
}

function createProtractorTool() {
  return `
    <div class="protractor-tool">
      <div class="protractor-display">
        <canvas id="protractorCanvas" width="400" height="300"></canvas>
      </div>
      
      <div class="protractor-controls">
        <div class="control-group">
          <label>Ángulo:</label>
          <input type="range" id="angleSlider" min="0" max="180" value="45">
          <span id="angleDisplay">45°</span>
        </div>
        
        <div class="control-buttons">
          <button class="control-btn" onclick="resetProtractor()">🔄 Reiniciar</button>
          <button class="control-btn" onclick="randomAngle()">🎲 Aleatorio</button>
        </div>
      </div>
      
      <div class="angle-info" id="angleInfo">
        <h4>Información del Ángulo</h4>
        <p id="angleType">Tipo: Ángulo agudo</p>
        <p id="angleDescription">Un ángulo agudo mide menos de 90°</p>
      </div>
    </div>
    
    <style>
      .protractor-tool { padding: 1rem; text-align: center; }
      .protractor-display { 
        background: var(--bg-secondary); 
        padding: 2rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
      }
      #protractorCanvas { 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        background: white; 
      }
      .protractor-controls { 
        background: var(--bg-card); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
      }
      .control-group { 
        display: flex; 
        align-items: center; 
        justify-content: center; 
        gap: 1rem; 
        margin-bottom: 1rem; 
      }
      .control-group label { 
        font-weight: 600; 
      }
      #angleSlider { 
        width: 200px; 
      }
      #angleDisplay { 
        font-weight: bold; 
        color: var(--accent-primary); 
        font-size: 1.2rem; 
      }
      .control-buttons { 
        display: flex; 
        justify-content: center; 
        gap: 1rem; 
      }
      .control-btn { 
        background: var(--accent-primary); 
        color: white; 
        border: none; 
        padding: 0.5rem 1rem; 
        border-radius: var(--radius); 
        cursor: pointer; 
        transition: var(--transition); 
      }
      .control-btn:hover { 
        background: var(--accent-hover); 
      }
      .angle-info { 
        background: var(--bg-secondary); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
        text-align: left; 
      }
      .angle-info h4 { 
        color: var(--accent-primary); 
        margin-bottom: 1rem; 
      }
    </style>
  `
}

function createCompassTool() {
  return `
    <div class="compass-tool">
      <div class="compass-display">
        <canvas id="compassCanvas" width="400" height="400"></canvas>
      </div>
      
      <div class="compass-controls">
        <div class="control-row">
          <div class="control-group">
            <label>Radio:</label>
            <input type="range" id="radiusSlider" min="20" max="150" value="80">
            <span id="radiusDisplay">80px</span>
          </div>
        </div>
        
        <div class="control-row">
          <div class="control-group">
            <label>Color:</label>
            <input type="color" id="colorPicker" value="#10b981">
          </div>
          
          <div class="control-group">
            <label>Grosor:</label>
            <input type="range" id="thicknessSlider" min="1" max="5" value="2">
            <span id="thicknessDisplay">2px</span>
          </div>
        </div>
        
        <div class="control-buttons">
          <button class="control-btn" onclick="drawCircle()">⭕ Dibujar Círculo</button>
          <button class="control-btn" onclick="clearCompass()">🗑️ Limpiar</button>
          <button class="control-btn" onclick="showCircleInfo()">ℹ️ Info</button>
        </div>
      </div>
      
      <div class="circle-info" id="circleInfo" style="display: none;">
        <h4>Información del Círculo</h4>
        <div class="info-grid">
          <div class="info-item">
            <span>Radio:</span>
            <span id="infoRadius">-</span>
          </div>
          <div class="info-item">
            <span>Diámetro:</span>
            <span id="infoDiameter">-</span>
          </div>
          <div class="info-item">
            <span>Circunferencia:</span>
            <span id="infoCircumference">-</span>
          </div>
          <div class="info-item">
            <span>Área:</span>
            <span id="infoArea">-</span>
          </div>
        </div>
      </div>
    </div>
    
    <style>
      .compass-tool { padding: 1rem; text-align: center; }
      .compass-display { 
        background: var(--bg-secondary); 
        padding: 2rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
      }
      #compassCanvas { 
        border: 1px solid var(--border-color); 
        border-radius: var(--radius); 
        background: white; 
        cursor: crosshair; 
      }
      .compass-controls { 
        background: var(--bg-card); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
        margin-bottom: 2rem; 
      }
      .control-row { 
        display: flex; 
        justify-content: center; 
        gap: 2rem; 
        margin-bottom: 1rem; 
        flex-wrap: wrap; 
      }
      .control-group { 
        display: flex; 
        align-items: center; 
        gap: 0.5rem; 
      }
      .control-group label { 
        font-weight: 600; 
        min-width: 60px; 
      }
      .control-buttons { 
        display: flex; 
        justify-content: center; 
        gap: 1rem; 
        flex-wrap: wrap; 
      }
      .circle-info { 
        background: var(--bg-secondary); 
        padding: 1.5rem; 
        border-radius: var(--radius); 
      }
      .circle-info h4 { 
        color: var(--accent-primary); 
        margin-bottom: 1rem; 
      }
      .info-grid { 
        display: grid; 
        grid-template-columns: repeat(auto-fit, minmax(200px, 1fr)); 
        gap: 1rem; 
      }
      .info-item { 
        display: flex; 
        justify-content: space-between; 
        padding: 0.5rem; 
        background: var(--bg-card); 
        border-radius: var(--radius); 
      }
      .info-item span:last-child { 
        font-weight: bold; 
        color: var(--accent-primary); 
      }
    </style>
  `
}

// Variables para el constructor de figuras
let builderTool = "triangle"
let builderPoints = []
let builderCanvas, builderCtx

window.setBuilderTool = (tool) => {
  builderTool = tool
  const buttons = document.querySelectorAll(".tool-button")
  buttons.forEach((btn) => btn.classList.remove("active"))
  document.querySelector(`[data-tool="${tool}"]`).classList.add("active")

  const instruction = document.querySelector(".canvas-instruction")
  switch (tool) {
    case "triangle":
      instruction.textContent = "Haz clic en 3 puntos para formar un triángulo"
      break
    case "square":
      instruction.textContent = "Haz clic en 4 puntos para formar un cuadrado"
      break
    case "circle":
      instruction.textContent = "Haz clic en el centro y luego en el borde"
      break
  }

  clearBuilderCanvas()
}

window.clearBuilderCanvas = () => {
  if (builderCtx) {
    builderCtx.clearRect(0, 0, builderCanvas.width, builderCanvas.height)
    builderPoints = []
  }
}

function initBuilderCanvas() {
  builderCanvas = document.getElementById("builderCanvas")
  builderCtx = builderCanvas.getContext("2d")

  // Hacer el canvas responsive
  const resizeCanvas = () => {
    const container = builderCanvas.parentElement
    const containerWidth = container.clientWidth
    const maxWidth = Math.min(400, containerWidth - 40)

    builderCanvas.style.width = maxWidth + "px"
    builderCanvas.style.height = maxWidth * 0.75 + "px"
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  builderCanvas.addEventListener("click", (e) => {
    const rect = builderCanvas.getBoundingClientRect()
    const scaleX = builderCanvas.width / rect.width
    const scaleY = builderCanvas.height / rect.height

    const x = (e.clientX - rect.left) * scaleX
    const y = (e.clientY - rect.top) * scaleY

    builderPoints.push({ x, y })

    // Dibujar punto
    builderCtx.fillStyle = "#ef4444"
    builderCtx.beginPath()
    builderCtx.arc(x, y, 4, 0, 2 * Math.PI)
    builderCtx.fill()

    // Dibujar figura según la herramienta
    drawBuilderShape()
  })
}

function drawBuilderShape() {
  if (builderPoints.length < 2) return

  builderCtx.strokeStyle = "#10b981"
  builderCtx.lineWidth = 3

  switch (builderTool) {
    case "triangle":
      if (builderPoints.length >= 3) {
        builderCtx.beginPath()
        builderCtx.moveTo(builderPoints[0].x, builderPoints[0].y)
        builderCtx.lineTo(builderPoints[1].x, builderPoints[1].y)
        builderCtx.lineTo(builderPoints[2].x, builderPoints[2].y)
        builderCtx.closePath()
        builderCtx.stroke()
      }
      break

    case "square":
      if (builderPoints.length >= 4) {
        builderCtx.beginPath()
        builderCtx.moveTo(builderPoints[0].x, builderPoints[0].y)
        for (let i = 1; i < 4; i++) {
          builderCtx.lineTo(builderPoints[i].x, builderPoints[i].y)
        }
        builderCtx.closePath()
        builderCtx.stroke()
      }
      break

    case "circle":
      if (builderPoints.length >= 2) {
        const center = builderPoints[0]
        const edge = builderPoints[1]
        const radius = Math.sqrt(Math.pow(edge.x - center.x, 2) + Math.pow(edge.y - center.y, 2))

        builderCtx.beginPath()
        builderCtx.arc(center.x, center.y, radius, 0, 2 * Math.PI)
        builderCtx.stroke()
      }
      break
  }
}

window.checkBuilderSolution = () => {
  let isCorrect = false
  let message = ""

  switch (builderTool) {
    case "triangle":
      isCorrect = builderPoints.length >= 3
      message = isCorrect
        ? "¡Excelente! Has construido un triángulo."
        : "Necesitas al menos 3 puntos para formar un triángulo."
      break
    case "square":
      isCorrect = builderPoints.length >= 4
      message = isCorrect ? "¡Perfecto! Has construido un cuadrilátero." : "Necesitas 4 puntos para formar un cuadrado."
      break
    case "circle":
      isCorrect = builderPoints.length >= 2
      message = isCorrect ? "¡Genial! Has dibujado un círculo." : "Necesitas marcar el centro y un punto del borde."
      break
  }

  if (isCorrect) {
    coins += 25
    userXP = Math.min(userXP + 20, 100)
    totalPointsEarned += 45

    localStorage.setItem("coins", coins)
    localStorage.setItem("userXP", userXP)
    localStorage.setItem("totalPointsEarned", totalPointsEarned)

    updateUI()
    showNotification(`${message} +25 monedas, +20 XP`)
  } else {
    showNotification(message)
  }
}

window.nextBuilderChallenge = () => {
  const challenges = ["triangle", "square", "circle"]
  const currentIndex = challenges.indexOf(builderTool)
  const nextIndex = (currentIndex + 1) % challenges.length

  setBuilderTool(challenges[nextIndex])

  const shapes = {
    triangle: { icon: "🔺", name: "triángulo" },
    square: { icon: "⬜", name: "cuadrado" },
    circle: { icon: "⭕", name: "círculo" },
  }

  const shape = shapes[challenges[nextIndex]]
  document.querySelector(".shape-display").textContent = shape.icon
  document.querySelector(".target-shape p").textContent = `Construye un ${shape.name}`
}

function initCalculatorTool() {
  const tabs = document.querySelectorAll(".calc-tab")
  const content = document.getElementById("calcContent")

  tabs.forEach((tab) => {
    tab.addEventListener("click", () => {
      tabs.forEach((t) => t.classList.remove("active"))
      tab.classList.add("active")

      const tabType = tab.dataset.tab
      showCalculatorTab(tabType)
    })
  })

  // Mostrar primera pestaña
  showCalculatorTab("perimeter")
}

function showCalculatorTab(tabType) {
  const content = document.getElementById("calcContent")

  switch (tabType) {
    case "perimeter":
      content.innerHTML = `
        <div class="calc-section">
          <h4>🔲 Cuadrado</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Lado (cm):</label>
              <input type="number" id="squareSide" placeholder="Ingresa el lado" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateSquarePerimeter()">Calcular Perímetro</button>
          <div id="squareResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>📐 Rectángulo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Largo (cm):</label>
              <input type="number" id="rectLength" placeholder="Ingresa el largo" step="0.1">
            </div>
            <div class="calc-input-group">
              <label>Ancho (cm):</label>
              <input type="number" id="rectWidth" placeholder="Ingresa el ancho" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateRectanglePerimeter()">Calcular Perímetro</button>
          <div id="rectangleResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>⭕ Círculo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Radio (cm):</label>
              <input type="number" id="circleRadius" placeholder="Ingresa el radio" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateCirclePerimeter()">Calcular Circunferencia</button>
          <div id="circleResult"></div>
        </div>
      `
      break

    case "area":
      content.innerHTML = `
        <div class="calc-section">
          <h4>🔲 Cuadrado</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Lado (cm):</label>
              <input type="number" id="squareSideArea" placeholder="Ingresa el lado" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateSquareArea()">Calcular Área</button>
          <div id="squareAreaResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>📐 Rectángulo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Largo (cm):</label>
              <input type="number" id="rectLengthArea" placeholder="Ingresa el largo" step="0.1">
            </div>
            <div class="calc-input-group">
              <label>Ancho (cm):</label>
              <input type="number" id="rectWidthArea" placeholder="Ingresa el ancho" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateRectangleArea()">Calcular Área</button>
          <div id="rectangleAreaResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>🔺 Triángulo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Base (cm):</label>
              <input type="number" id="triangleBase" placeholder="Ingresa la base" step="0.1">
            </div>
            <div class="calc-input-group">
              <label>Altura (cm):</label>
              <input type="number" id="triangleHeight" placeholder="Ingresa la altura" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateTriangleArea()">Calcular Área</button>
          <div id="triangleAreaResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>⭕ Círculo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Radio (cm):</label>
              <input type="number" id="circleRadiusArea" placeholder="Ingresa el radio" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateCircleArea()">Calcular Área</button>
          <div id="circleAreaResult"></div>
        </div>
      `
      break

    case "angles":
      content.innerHTML = `
        <div class="calc-section">
          <h4>🔺 Ángulos de un Triángulo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Ángulo 1 (°):</label>
              <input type="number" id="angle1" placeholder="Primer ángulo" step="0.1">
            </div>
            <div class="calc-input-group">
              <label>Ángulo 2 (°):</label>
              <input type="number" id="angle2" placeholder="Segundo ángulo" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="calculateThirdAngle()">Calcular Tercer Ángulo</button>
          <div id="angleResult"></div>
        </div>
        
        <div class="calc-section">
          <h4>📐 Clasificar Ángulo</h4>
          <div class="calc-inputs">
            <div class="calc-input-group">
              <label>Ángulo (°):</label>
              <input type="number" id="classifyAngle" placeholder="Ingresa el ángulo" step="0.1">
            </div>
          </div>
          <button class="calc-button" onclick="classifyAngleType()">Clasificar</button>
          <div id="classifyResult"></div>
        </div>
      `
      break
  }
}

// Funciones de cálculo para la calculadora
window.calculateSquarePerimeter = () => {
  const side = Number.parseFloat(document.getElementById("squareSide").value)
  if (side > 0) {
    const perimeter = 4 * side
    document.getElementById("squareResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Perímetro:</span>
          <span class="result-value">${perimeter.toFixed(2)} cm</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>4 × lado = 4 × ${side} = ${perimeter.toFixed(2)} cm</span>
        </div>
      </div>
    `
  }
}

window.calculateRectanglePerimeter = () => {
  const length = Number.parseFloat(document.getElementById("rectLength").value)
  const width = Number.parseFloat(document.getElementById("rectWidth").value)
  if (length > 0 && width > 0) {
    const perimeter = 2 * (length + width)
    document.getElementById("rectangleResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Perímetro:</span>
          <span class="result-value">${perimeter.toFixed(2)} cm</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>2 × (largo + ancho) = 2 × (${length} + ${width}) = ${perimeter.toFixed(2)} cm</span>
        </div>
      </div>
    `
  }
}

window.calculateCirclePerimeter = () => {
  const radius = Number.parseFloat(document.getElementById("circleRadius").value)
  if (radius > 0) {
    const circumference = 2 * Math.PI * radius
    document.getElementById("circleResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Circunferencia:</span>
          <span class="result-value">${circumference.toFixed(2)} cm</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>2 × π × radio = 2 × π × ${radius} = ${circumference.toFixed(2)} cm</span>
        </div>
      </div>
    `
  }
}

window.calculateSquareArea = () => {
  const side = Number.parseFloat(document.getElementById("squareSideArea").value)
  if (side > 0) {
    const area = side * side
    document.getElementById("squareAreaResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Área:</span>
          <span class="result-value">${area.toFixed(2)} cm²</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>lado² = ${side}² = ${area.toFixed(2)} cm²</span>
        </div>
      </div>
    `
  }
}

window.calculateRectangleArea = () => {
  const length = Number.parseFloat(document.getElementById("rectLengthArea").value)
  const width = Number.parseFloat(document.getElementById("rectWidthArea").value)
  if (length > 0 && width > 0) {
    const area = length * width
    document.getElementById("rectangleAreaResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Área:</span>
          <span class="result-value">${area.toFixed(2)} cm²</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>largo × ancho = ${length} × ${width} = ${area.toFixed(2)} cm²</span>
        </div>
      </div>
    `
  }
}

window.calculateTriangleArea = () => {
  const base = Number.parseFloat(document.getElementById("triangleBase").value)
  const height = Number.parseFloat(document.getElementById("triangleHeight").value)
  if (base > 0 && height > 0) {
    const area = (base * height) / 2
    document.getElementById("triangleAreaResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Área:</span>
          <span class="result-value">${area.toFixed(2)} cm²</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>(base × altura) ÷ 2 = (${base} × ${height}) ÷ 2 = ${area.toFixed(2)} cm²</span>
        </div>
      </div>
    `
  }
}

window.calculateCircleArea = () => {
  const radius = Number.parseFloat(document.getElementById("circleRadiusArea").value)
  if (radius > 0) {
    const area = Math.PI * radius * radius
    document.getElementById("circleAreaResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Área:</span>
          <span class="result-value">${area.toFixed(2)} cm²</span>
        </div>
        <div class="result-item">
          <span>Fórmula:</span>
          <span>π × radio² = π × ${radius}² = ${area.toFixed(2)} cm²</span>
        </div>
      </div>
    `
  }
}

window.calculateThirdAngle = () => {
  const angle1 = Number.parseFloat(document.getElementById("angle1").value)
  const angle2 = Number.parseFloat(document.getElementById("angle2").value)
  if (angle1 > 0 && angle2 > 0 && angle1 + angle2 < 180) {
    const angle3 = 180 - angle1 - angle2
    document.getElementById("angleResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Tercer ángulo:</span>
          <span class="result-value">${angle3.toFixed(1)}°</span>
        </div>
        <div class="result-item">
          <span>Explicación:</span>
          <span>Los ángulos de un triángulo suman 180°</span>
        </div>
        <div class="result-item">
          <span>Cálculo:</span>
          <span>180° - ${angle1}° - ${angle2}° = ${angle3.toFixed(1)}°</span>
        </div>
      </div>
    `
  } else {
    document.getElementById("angleResult").innerHTML = `
      <div class="calc-result" style="color: #ef4444;">
        Error: Los ángulos deben ser positivos y su suma menor a 180°
      </div>
    `
  }
}

window.classifyAngleType = () => {
  const angle = Number.parseFloat(document.getElementById("classifyAngle").value)
  if (angle > 0 && angle <= 360) {
    let type, description, color

    if (angle < 90) {
      type = "Ángulo Agudo"
      description = "Mide menos de 90°"
      color = "#10b981"
    } else if (angle === 90) {
      type = "Ángulo Recto"
      description = "Mide exactamente 90°"
      color = "#3b82f6"
    } else if (angle < 180) {
      type = "Ángulo Obtuso"
      description = "Mide más de 90° pero menos de 180°"
      color = "#f59e0b"
    } else if (angle === 180) {
      type = "Ángulo Llano"
      description = "Mide exactamente 180°"
      color = "#8b5cf6"
    } else {
      type = "Ángulo Reflejo"
      description = "Mide más de 180°"
      color = "#ef4444"
    }

    document.getElementById("classifyResult").innerHTML = `
      <div class="calc-result">
        <div class="result-item">
          <span>Tipo:</span>
          <span class="result-value" style="color: ${color};">${type}</span>
        </div>
        <div class="result-item">
          <span>Descripción:</span>
          <span>${description}</span>
        </div>
        <div class="result-item">
          <span>Medida:</span>
          <span>${angle}°</span>
        </div>
      </div>
    `
  }
}

function initProtractorTool() {
  const canvas = document.getElementById("protractorCanvas")
  const ctx = canvas.getContext("2d")
  const slider = document.getElementById("angleSlider")
  const display = document.getElementById("angleDisplay")

  // Hacer el canvas responsive
  const resizeCanvas = () => {
    const container = canvas.parentElement
    const containerWidth = container.clientWidth
    const maxWidth = Math.min(400, containerWidth - 40)

    canvas.style.width = maxWidth + "px"
    canvas.style.height = maxWidth * 0.75 + "px"
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  function drawProtractor(angle) {
    ctx.clearRect(0, 0, canvas.width, canvas.height)

    const centerX = canvas.width / 2
    const centerY = canvas.height - 50
    const radius = Math.min(canvas.width, canvas.height) * 0.3

    // Dibujar semicírculo del transportador
    ctx.strokeStyle = "#64748b"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, radius, Math.PI, 0)
    ctx.stroke()

    // Dibujar marcas de grados
    ctx.strokeStyle = "#94a3b8"
    ctx.lineWidth = 1
    for (let i = 0; i <= 180; i += 10) {
      const angleRad = (i * Math.PI) / 180
      const x1 = centerX + (radius - 10) * Math.cos(Math.PI - angleRad)
      const y1 = centerY - (radius - 10) * Math.sin(Math.PI - angleRad)
      const x2 = centerX + radius * Math.cos(Math.PI - angleRad)
      const y2 = centerY - radius * Math.sin(Math.PI - angleRad)

      ctx.beginPath()
      ctx.moveTo(x1, y1)
      ctx.lineTo(x2, y2)
      ctx.stroke()

      // Números cada 30 grados
      if (i % 30 === 0) {
        ctx.fillStyle = "#64748b"
        ctx.font = "12px sans-serif"
        ctx.textAlign = "center"
        const textX = centerX + (radius - 25) * Math.cos(Math.PI - angleRad)
        const textY = centerY - (radius - 25) * Math.sin(Math.PI - angleRad) + 4
        ctx.fillText(i.toString(), textX, textY)
      }
    }

    // Línea base
    ctx.strokeStyle = "#10b981"
    ctx.lineWidth = 3
    ctx.beginPath()
    ctx.moveTo(centerX - radius, centerY)
    ctx.lineTo(centerX + radius, centerY)
    ctx.stroke()

    // Línea del ángulo
    const angleRad = (angle * Math.PI) / 180
    const endX = centerX + radius * Math.cos(Math.PI - angleRad)
    const endY = centerY - radius * Math.sin(Math.PI - angleRad)

    ctx.beginPath()
    ctx.moveTo(centerX, centerY)
    ctx.lineTo(endX, endY)
    ctx.stroke()

    // Arco del ángulo
    ctx.strokeStyle = "#ef4444"
    ctx.lineWidth = 2
    ctx.beginPath()
    ctx.arc(centerX, centerY, 40, Math.PI, Math.PI - angleRad, true)
    ctx.stroke()
  }

  function updateAngleInfo(angle) {
    const angleType = document.getElementById("angleType")
    const angleDescription = document.getElementById("angleDescription")

    if (angle < 90) {
      angleType.textContent = "Tipo: Ángulo agudo"
      angleDescription.textContent = "Un ángulo agudo mide menos de 90°"
    } else if (angle === 90) {
      angleType.textContent = "Tipo: Ángulo recto"
      angleDescription.textContent = "Un ángulo recto mide exactamente 90°"
    } else if (angle < 180) {
      angleType.textContent = "Tipo: Ángulo obtuso"
      angleDescription.textContent = "Un ángulo obtuso mide más de 90° pero menos de 180°"
    } else {
      angleType.textContent = "Tipo: Ángulo llano"
      angleDescription.textContent = "Un ángulo llano mide exactamente 180°"
    }
  }

  slider.addEventListener("input", (e) => {
    const angle = Number.parseInt(e.target.value)
    display.textContent = `${angle}°`
    drawProtractor(angle)
    updateAngleInfo(angle)
  })

  // Dibujar ángulo inicial
  drawProtractor(45)
  updateAngleInfo(45)
}

window.resetProtractor = () => {
  const slider = document.getElementById("angleSlider")
  const display = document.getElementById("angleDisplay")

  slider.value = 45
  display.textContent = "45°"

  const canvas = document.getElementById("protractorCanvas")
  const ctx = canvas.getContext("2d")

  // Redibujar con ángulo inicial
  initProtractorTool()
}

window.randomAngle = () => {
  const randomAngle = Math.floor(Math.random() * 181)
  const slider = document.getElementById("angleSlider")
  const display = document.getElementById("angleDisplay")

  slider.value = randomAngle
  display.textContent = `${randomAngle}°`

  const canvas = document.getElementById("protractorCanvas")
  const ctx = canvas.getContext("2d")

  // Redibujar con ángulo aleatorio
  const centerX = canvas.width / 2
  const centerY = canvas.height - 50
  const radius = Math.min(canvas.width, canvas.height) * 0.3

  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Dibujar semicírculo del transportador
  ctx.strokeStyle = "#64748b"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, Math.PI, 0)
  ctx.stroke()

  // Dibujar marcas y ángulo
  ctx.strokeStyle = "#94a3b8"
  ctx.lineWidth = 1
  for (let i = 0; i <= 180; i += 10) {
    const angleRad = (i * Math.PI) / 180
    const x1 = centerX + (radius - 10) * Math.cos(Math.PI - angleRad)
    const y1 = centerY - (radius - 10) * Math.sin(Math.PI - angleRad)
    const x2 = centerX + radius * Math.cos(Math.PI - angleRad)
    const y2 = centerY - radius * Math.sin(Math.PI - angleRad)

    ctx.beginPath()
    ctx.moveTo(x1, y1)
    ctx.lineTo(x2, y2)
    ctx.stroke()

    if (i % 30 === 0) {
      ctx.fillStyle = "#64748b"
      ctx.font = "12px sans-serif"
      ctx.textAlign = "center"
      const textX = centerX + (radius - 25) * Math.cos(Math.PI - angleRad)
      const textY = centerY - (radius - 25) * Math.sin(Math.PI - angleRad) + 4
      ctx.fillText(i.toString(), textX, textY)
    }
  }

  // Línea base
  ctx.strokeStyle = "#10b981"
  ctx.lineWidth = 3
  ctx.beginPath()
  ctx.moveTo(centerX - radius, centerY)
  ctx.lineTo(centerX + radius, centerY)
  ctx.stroke()

  // Línea del ángulo
  const angleRad = (randomAngle * Math.PI) / 180
  const endX = centerX + radius * Math.cos(Math.PI - angleRad)
  const endY = centerY - radius * Math.sin(Math.PI - angleRad)

  ctx.beginPath()
  ctx.moveTo(centerX, centerY)
  ctx.lineTo(endX, endY)
  ctx.stroke()

  // Arco del ángulo
  ctx.strokeStyle = "#ef4444"
  ctx.lineWidth = 2
  ctx.beginPath()
  ctx.arc(centerX, centerY, 40, Math.PI, Math.PI - angleRad, true)
  ctx.stroke()

  // Actualizar información
  const angleType = document.getElementById("angleType")
  const angleDescription = document.getElementById("angleDescription")

  if (randomAngle < 90) {
    angleType.textContent = "Tipo: Ángulo agudo"
    angleDescription.textContent = "Un ángulo agudo mide menos de 90°"
  } else if (randomAngle === 90) {
    angleType.textContent = "Tipo: Ángulo recto"
    angleDescription.textContent = "Un ángulo recto mide exactamente 90°"
  } else if (randomAngle < 180) {
    angleType.textContent = "Tipo: Ángulo obtuso"
    angleDescription.textContent = "Un ángulo obtuso mide más de 90° pero menos de 180°"
  } else {
    angleType.textContent = "Tipo: Ángulo llano"
    angleDescription.textContent = "Un ángulo llano mide exactamente 180°"
  }
}

function initCompassTool() {
  const canvas = document.getElementById("compassCanvas")
  const ctx = canvas.getContext("2d")
  const radiusSlider = document.getElementById("radiusSlider")
  const radiusDisplay = document.getElementById("radiusDisplay")
  const thicknessSlider = document.getElementById("thicknessSlider")
  const thicknessDisplay = document.getElementById("thicknessDisplay")

  let currentRadius = 80
  let currentThickness = 2
  let currentColor = "#10b981"
  let centerX = canvas.width / 2
  let centerY = canvas.height / 2

  // Hacer el canvas responsive
  const resizeCanvas = () => {
    const container = canvas.parentElement
    const containerWidth = container.clientWidth
    const maxWidth = Math.min(400, containerWidth - 40)

    canvas.style.width = maxWidth + "px"
    canvas.style.height = maxWidth + "px"

    // Actualizar centro
    centerX = canvas.width / 2
    centerY = canvas.height / 2
  }

  resizeCanvas()
  window.addEventListener("resize", resizeCanvas)

  radiusSlider.addEventListener("input", (e) => {
    currentRadius = Number.parseInt(e.target.value)
    radiusDisplay.textContent = `${currentRadius}px`
  })

  thicknessSlider.addEventListener("input", (e) => {
    currentThickness = Number.parseInt(e.target.value)
    thicknessDisplay.textContent = `${currentThickness}px`
  })

  document.getElementById("colorPicker").addEventListener("change", (e) => {
    currentColor = e.target.value
  })

  // Permitir hacer clic en el canvas para cambiar el centro
  canvas.addEventListener("click", (e) => {
    const rect = canvas.getBoundingClientRect()
    const scaleX = canvas.width / rect.width
    const scaleY = canvas.height / rect.height

    centerX = (e.clientX - rect.left) * scaleX
    centerY = (e.clientY - rect.top) * scaleY

    // Dibujar punto de centro
    ctx.fillStyle = "#ef4444"
    ctx.beginPath()
    ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
    ctx.fill()
  })
}

window.drawCircle = () => {
  const canvas = document.getElementById("compassCanvas")
  const ctx = canvas.getContext("2d")
  const radius = Number.parseInt(document.getElementById("radiusSlider").value)
  const thickness = Number.parseInt(document.getElementById("thicknessSlider").value)
  const color = document.getElementById("colorPicker").value

  const centerX = canvas.width / 2
  const centerY = canvas.height / 2

  // Dibujar círculo
  ctx.strokeStyle = color
  ctx.lineWidth = thickness
  ctx.beginPath()
  ctx.arc(centerX, centerY, radius, 0, 2 * Math.PI)
  ctx.stroke()

  // Dibujar punto central
  ctx.fillStyle = "#ef4444"
  ctx.beginPath()
  ctx.arc(centerX, centerY, 3, 0, 2 * Math.PI)
  ctx.fill()

  // Mostrar información del círculo
  showCircleInfo()
}

window.clearCompass = () => {
  const canvas = document.getElementById("compassCanvas")
  const ctx = canvas.getContext("2d")
  ctx.clearRect(0, 0, canvas.width, canvas.height)

  // Ocultar información
  document.getElementById("circleInfo").style.display = "none"
}

window.showCircleInfo = () => {
  const radius = Number.parseInt(document.getElementById("radiusSlider").value)
  const diameter = radius * 2
  const circumference = 2 * Math.PI * radius
  const area = Math.PI * radius * radius

  document.getElementById("infoRadius").textContent = `${radius}px`
  document.getElementById("infoDiameter").textContent = `${diameter}px`
  document.getElementById("infoCircumference").textContent = `${circumference.toFixed(2)}px`
  document.getElementById("infoArea").textContent = `${area.toFixed(2)}px²`

  document.getElementById("circleInfo").style.display = "block"
}

function closeModal(modal) {
  modal.style.display = "none"
}

function showNotification(message) {
  const notification = document.createElement("div")
  notification.className = "notification"
  notification.textContent = message

  document.body.appendChild(notification)

  setTimeout(() => {
    notification.style.animation = "slideOutRight 0.3s ease"
    setTimeout(() => {
      if (document.body.contains(notification)) {
        document.body.removeChild(notification)
      }
    }, 300)
  }, 3000)
}

// Escuchar mensajes del menú principal para actualizar progreso
window.addEventListener("message", (event) => {
  if (event.data.type === "updateProgress" && event.data.subject === "matematica") {
    // Actualizar progreso local si es necesario
    localStorage.setItem("mathProgress", event.data.progress)
  }
})

// Actualizar progreso al cargar la página
window.addEventListener("load", () => {
  updateMathProgress()
})
