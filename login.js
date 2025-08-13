// Estado de la aplicación
let isDarkMode = true

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const loginForm = document.getElementById("loginForm")
const loginButton = document.getElementById("loginButton")
const buttonLoader = document.getElementById("buttonLoader")
const togglePassword = document.getElementById("togglePassword")
const passwordInput = document.getElementById("password")
const emailInput = document.getElementById("email")
const notificationContainer = document.getElementById("notificationContainer")
const particlesContainer = document.getElementById("particles")

// Usuarios demo para testing
const demoUsers = [
  { email: "admin@learnix.com", password: "admin123", name: "Administrador" },
  { email: "estudiante@learnix.com", password: "estudiante123", name: "Estudiante Demo" },
  { email: "profesor@learnix.com", password: "profesor123", name: "Profesor Demo" },
]

// Inicialización
document.addEventListener("DOMContentLoaded", () => {
  initializeApp()
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

  // Verificar si ya hay una sesión activa
  const currentUser = localStorage.getItem("currentUser")
  if (currentUser) {
    showNotification("Ya tienes una sesión activa", "warning")
    setTimeout(() => {
      window.location.href = "index.html"
    }, 2000)
  }
}

function setupEventListeners() {
  // Toggle de tema
  themeToggle.addEventListener("click", toggleTheme)

  // Toggle de contraseña
  togglePassword.addEventListener("click", togglePasswordVisibility)

  // Formulario de login
  loginForm.addEventListener("submit", handleLogin)

  // Validación en tiempo real
  emailInput.addEventListener("blur", validateEmail)
  passwordInput.addEventListener("blur", validatePassword)
  emailInput.addEventListener("input", clearValidation)
  passwordInput.addEventListener("input", clearValidation)

  // Botones sociales
  document.querySelector(".google-button").addEventListener("click", () => {
    showNotification("Login con Google próximamente", "warning")
  })

  document.querySelector(".facebook-button").addEventListener("click", () => {
    showNotification("Login con Facebook próximamente", "warning")
  })

  // Link de contraseña olvidada
  document.querySelector(".forgot-password").addEventListener("click", (e) => {
    e.preventDefault()
    showNotification("Función de recuperación próximamente", "warning")
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

function togglePasswordVisibility() {
  const eyeIcon = document.querySelector(".eye-icon")

  if (passwordInput.type === "password") {
    passwordInput.type = "text"
    eyeIcon.textContent = "🙈"
  } else {
    passwordInput.type = "password"
    eyeIcon.textContent = "👁️"
  }
}

async function handleLogin(e) {
  e.preventDefault()

  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  const remember = document.getElementById("remember").checked

  // Validar campos
  if (!validateEmail() || !validatePassword()) {
    showNotification("Por favor, corrige los errores en el formulario", "error")
    return
  }

  // Mostrar estado de carga
  setLoadingState(true)

  try {
    // Simular llamada a API
    await simulateLogin(email, password)

    // Buscar usuario demo
    const user = demoUsers.find((u) => u.email === email && u.password === password)

    if (user) {
      // Login exitoso
      showNotification(`¡Bienvenido, ${user.name}!`, "success")

      // Guardar sesión
      const sessionData = {
        email: user.email,
        name: user.name,
        loginTime: new Date().toISOString(),
        remember: remember,
      }

      if (remember) {
        localStorage.setItem("currentUser", JSON.stringify(sessionData))
      } else {
        sessionStorage.setItem("currentUser", JSON.stringify(sessionData))
      }

      // Redirigir después de 2 segundos
      setTimeout(() => {
        window.location.href = "index.html"
      }, 2000)
    } else {
      // Credenciales incorrectas
      showNotification("Credenciales incorrectas", "error")
      addShakeAnimation()
    }
  } catch (error) {
    showNotification("Error de conexión. Intenta nuevamente.", "error")
    console.error("Login error:", error)
  } finally {
    setLoadingState(false)
  }
}

function simulateLogin(email, password) {
  return new Promise((resolve) => {
    // Simular delay de red
    setTimeout(resolve, 1500)
  })
}

function validateEmail() {
  const email = emailInput.value.trim()
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/

  clearFieldValidation(emailInput)

  if (!email) {
    setFieldError(emailInput, "El correo es requerido")
    return false
  }

  if (!emailRegex.test(email)) {
    setFieldError(emailInput, "Formato de correo inválido")
    return false
  }

  setFieldSuccess(emailInput)
  return true
}

function validatePassword() {
  const password = passwordInput.value.trim()

  clearFieldValidation(passwordInput)

  if (!password) {
    setFieldError(passwordInput, "La contraseña es requerida")
    return false
  }

  if (password.length < 6) {
    setFieldError(passwordInput, "Mínimo 6 caracteres")
    return false
  }

  setFieldSuccess(passwordInput)
  return true
}

function clearValidation(e) {
  clearFieldValidation(e.target)
}

function setFieldError(input, message) {
  input.classList.add("error")
  input.classList.remove("success")

  // Remover mensaje anterior
  const existingError = input.parentNode.parentNode.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }

  // Añadir nuevo mensaje
  const errorDiv = document.createElement("div")
  errorDiv.className = "error-message"
  errorDiv.textContent = message
  input.parentNode.parentNode.appendChild(errorDiv)
}

function setFieldSuccess(input) {
  input.classList.add("success")
  input.classList.remove("error")

  // Remover mensaje de error
  const existingError = input.parentNode.parentNode.querySelector(".error-message")
  if (existingError) {
    existingError.remove()
  }
}

function clearFieldValidation(input) {
  input.classList.remove("error", "success")

  // Remover mensajes
  const existingError = input.parentNode.parentNode.querySelector(".error-message")
  const existingSuccess = input.parentNode.parentNode.querySelector(".success-message")

  if (existingError) existingError.remove()
  if (existingSuccess) existingSuccess.remove()
}

function setLoadingState(loading) {
  if (loading) {
    loginButton.classList.add("loading")
    loginButton.disabled = true
  } else {
    loginButton.classList.remove("loading")
    loginButton.disabled = false
  }
}

function addShakeAnimation() {
  loginForm.style.animation = "shake 0.5s ease-in-out"
  setTimeout(() => {
    loginForm.style.animation = ""
  }, 500)
}

function showNotification(message, type = "success") {
  const notification = document.createElement("div")
  notification.className = `notification ${type}`
  notification.textContent = message

  notificationContainer.appendChild(notification)

  // Remover después de 4 segundos
  setTimeout(() => {
    notification.style.animation = "slideOutUp 0.3s ease"
    setTimeout(() => {
      if (notification.parentNode) {
        notificationContainer.removeChild(notification)
      }
    }, 300)
  }, 4000)
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
  // Animar entrada del formulario
  const formContainer = document.querySelector(".form-container")
  const brandContainer = document.querySelector(".logo-container")

  setTimeout(() => {
    formContainer.style.animation = "slideInRight 0.8s ease forwards"
    brandContainer.style.animation = "slideInLeft 0.8s ease forwards"
  }, 300)
}

// Añadir estilos dinámicos para animaciones
const style = document.createElement("style")
style.textContent = `
  @keyframes shake {
    0%, 100% { transform: translateX(0); }
    25% { transform: translateX(-10px); }
    75% { transform: translateX(10px); }
  }
  
  @keyframes slideOutUp {
    from {
      opacity: 1;
      transform: translateX(-50%) translateY(0);
    }
    to {
      opacity: 0;
      transform: translateX(-50%) translateY(-20px);
    }
  }
  
  @keyframes slideInRight {
    from {
      opacity: 0;
      transform: translateX(50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
    }
  }
  
  @keyframes slideInLeft {
    from {
      opacity: 0;
      transform: translateX(-50px);
    }
    to {
      opacity: 1;
      transform: translateX(0);
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

// Mostrar usuarios demo al cargar
setTimeout(() => {
  showNotification("Usuarios demo disponibles: admin@learnix.com (admin123)", "warning")
}, 2000)

// Auto-completar para demo
emailInput.addEventListener("dblclick", () => {
  emailInput.value = "admin@learnix.com"
  passwordInput.value = "admin123"
  showNotification("Credenciales demo cargadas", "success")
})
