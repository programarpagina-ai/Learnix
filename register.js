// Estado de la aplicación
let isDarkMode = true

// Elementos del DOM
const themeToggle = document.getElementById("themeToggle")
const registerForm = document.getElementById("registerForm")
const registerButton = document.getElementById("registerButton")
const togglePassword = document.getElementById("togglePassword")
const nameInput = document.getElementById("name")
const emailInput = document.getElementById("email")
const passwordInput = document.getElementById("password")
const confirmPasswordInput = document.getElementById("confirmPassword")
const termsCheckbox = document.getElementById("terms")
const notificationContainer = document.getElementById("notificationContainer")
const particlesContainer = document.getElementById("particles")

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
}

function setupEventListeners() {
  // Toggle de tema
  themeToggle.addEventListener("click", toggleTheme)

  // Toggle de contraseña
  togglePassword.addEventListener("click", togglePasswordVisibility)

  // Formulario de registro
  registerForm.addEventListener("submit", handleRegister)

  // Validación en tiempo real
  nameInput.addEventListener("blur", validateName)
  emailInput.addEventListener("blur", validateEmail)
  passwordInput.addEventListener("blur", validatePassword)
  confirmPasswordInput.addEventListener("blur", validateConfirmPassword)

  // Limpiar validación al escribir
  nameInput.addEventListener("input", clearValidation)
  emailInput.addEventListener("input", clearValidation)
  passwordInput.addEventListener("input", clearValidation)
  confirmPasswordInput.addEventListener("input", clearValidation)

  // Link de términos
  document.querySelector(".forgot-password").addEventListener("click", (e) => {
    e.preventDefault()
    showNotification("Términos y condiciones próximamente", "warning")
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

async function handleRegister(e) {
  e.preventDefault()

  const name = nameInput.value.trim()
  const email = emailInput.value.trim()
  const password = passwordInput.value.trim()
  const confirmPassword = confirmPasswordInput.value.trim()
  const acceptedTerms = termsCheckbox.checked

  // Validar todos los campos
  const isNameValid = validateName()
  const isEmailValid = validateEmail()
  const isPasswordValid = validatePassword()
  const isConfirmPasswordValid = validateConfirmPassword()

  if (!acceptedTerms) {
    showNotification("Debes aceptar los términos y condiciones", "error")
    return
  }

  if (!isNameValid || !isEmailValid || !isPasswordValid || !isConfirmPasswordValid) {
    showNotification("Por favor, corrige los errores en el formulario", "error")
    return
  }

  // Mostrar estado de carga
  setLoadingState(true)

  try {
    // Simular llamada a API
    await simulateRegister(name, email, password)

    // Verificar si el email ya existe (simulado)
    const existingUsers = JSON.parse(localStorage.getItem("registeredUsers") || "[]")
    const emailExists = existingUsers.some((user) => user.email === email)

    if (emailExists) {
      showNotification("Este correo ya está registrado", "error")
      return
    }

    // Registro exitoso
    const newUser = {
      id: Date.now(),
      name: name,
      email: email,
      password: password, // En producción, esto debería estar hasheado
      registrationDate: new Date().toISOString(),
    }

    // Guardar usuario
    existingUsers.push(newUser)
    localStorage.setItem("registeredUsers", JSON.stringify(existingUsers))

    showNotification(`¡Bienvenido a Learnix, ${name}!`, "success")

    // Redirigir al login después de 2 segundos
    setTimeout(() => {
      window.location.href = "login.html"
    }, 2000)
  } catch (error) {
    showNotification("Error de conexión. Intenta nuevamente.", "error")
    console.error("Register error:", error)
  } finally {
    setLoadingState(false)
  }
}

function simulateRegister(name, email, password) {
  return new Promise((resolve) => {
    // Simular delay de red
    setTimeout(resolve, 2000)
  })
}

function validateName() {
  const name = nameInput.value.trim()

  clearFieldValidation(nameInput)

  if (!name) {
    setFieldError(nameInput, "El nombre es requerido")
    return false
  }

  if (name.length < 2) {
    setFieldError(nameInput, "Mínimo 2 caracteres")
    return false
  }

  if (name.length > 50) {
    setFieldError(nameInput, "Máximo 50 caracteres")
    return false
  }

  setFieldSuccess(nameInput)
  return true
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

  if (password.length < 8) {
    setFieldError(passwordInput, "Mínimo 8 caracteres")
    return false
  }

  if (!/(?=.*[a-z])(?=.*[A-Z])(?=.*\d)/.test(password)) {
    setFieldError(passwordInput, "Debe contener mayúscula, minúscula y número")
    return false
  }

  setFieldSuccess(passwordInput)
  return true
}

function validateConfirmPassword() {
  const password = passwordInput.value.trim()
  const confirmPassword = confirmPasswordInput.value.trim()

  clearFieldValidation(confirmPasswordInput)

  if (!confirmPassword) {
    setFieldError(confirmPasswordInput, "Confirma tu contraseña")
    return false
  }

  if (password !== confirmPassword) {
    setFieldError(confirmPasswordInput, "Las contraseñas no coinciden")
    return false
  }

  setFieldSuccess(confirmPasswordInput)
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
    registerButton.classList.add("loading")
    registerButton.disabled = true
  } else {
    registerButton.classList.remove("loading")
    registerButton.disabled = false
  }
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
