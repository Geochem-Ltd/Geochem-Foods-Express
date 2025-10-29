// Main JavaScript for Geochem Foods Express
// Handles navigation switching, mobile menu, and shared functionality

document.addEventListener("DOMContentLoaded", () => {
  // Check authentication status
  const userLoggedIn = localStorage.getItem("gfeUser")

  // Get navigation elements
  const publicNav = document.querySelector("#public-nav")
  const privateNav = document.querySelector("#private-nav")
  const authButtons = document.querySelector("#auth-buttons")
  const userMenu = document.querySelector("#user-menu")

  // Switch navigation based on auth status
  if (userLoggedIn) {
    // Show authenticated navigation
    if (publicNav) publicNav.style.display = "none"
    if (privateNav) privateNav.style.display = "flex"
    if (authButtons) authButtons.style.display = "none"
    if (userMenu) userMenu.style.display = "flex"

    // Update user menu with user data
    try {
      const userData = JSON.parse(userLoggedIn)
      const userNameElement = document.querySelector("#user-name")
      if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name
      }
    } catch (e) {
      console.error("[v0] Error parsing user data:", e)
    }
  } else {
    // Show public navigation
    if (publicNav) publicNav.style.display = "flex"
    if (privateNav) privateNav.style.display = "none"
    if (authButtons) authButtons.style.display = "flex"
    if (userMenu) userMenu.style.display = "none"
  }

  // Mobile menu toggle
  const openMenuBtn = document.getElementById("openMenu")
  const closeMenuBtn = document.getElementById("closeMenu")
  const mobileMenu = document.getElementById("mobileMenu")

  if (openMenuBtn && mobileMenu) {
    openMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden")
      mobileMenu.classList.add("flex")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeMenuBtn && mobileMenu) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      mobileMenu.classList.remove("flex")
      document.body.style.overflow = "auto"
    })
  }

  // Close mobile menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("flex")
        document.body.style.overflow = "auto"
      }
    })
  }

  // Logout button handler
  const logoutBtn = document.getElementById("logout-btn")
  const handleLogout = () => {
    localStorage.removeItem("gfeUser")
    window.location.href = "/login" // Redirect to login page after logout
  }
  if (logoutBtn) {
    logoutBtn.addEventListener("click", (e) => {
      e.preventDefault()
      if (confirm("Are you sure you want to log out?")) {
        handleLogout()
      }
    })
  }
})

// 3D Tilt effect for cards
function attachTilt(selector = ".tilt", maxTilt = 8) {
  const prefersReducedMotion = window.matchMedia("(prefers-reduced-motion: reduce)").matches
  if (prefersReducedMotion) return

  document.querySelectorAll(selector).forEach((card) => {
    const inner = card.querySelector(".tilt-inner") || card
    card.addEventListener("pointermove", (e) => {
      const rect = card.getBoundingClientRect()
      const x = (e.clientX - rect.left) / rect.width
      const y = (e.clientY - rect.top) / rect.height
      const rotY = (x - 0.5) * maxTilt
      const rotX = (0.5 - y) * maxTilt
      inner.style.transform = `rotateX(${rotX}deg) rotateY(${rotY}deg) translateZ(8px)`
      card.style.boxShadow = `${-rotY * 2}px ${rotX * 2}px 32px rgba(27, 94, 32, 0.15)`
    })
    card.addEventListener("pointerleave", () => {
      inner.style.transform = "rotateX(0) rotateY(0) translateZ(0)"
      card.style.boxShadow = ""
    })
  })
}

// Initialize tilt effect when DOM is ready
if (document.readyState === "loading") {
  document.addEventListener("DOMContentLoaded", () => attachTilt(".tilt", 8))
} else {
  attachTilt(".tilt", 8)
}
