// Main JavaScript for Geochem Foods Express
// Handles navigation switching, mobile menu, and shared functionality

import { initPublicNav, updateAuthNav, setupLogoutButton } from './nav-handler.js'
import { initAllScrollEnhancements } from './scroll-enhancements.js'

document.addEventListener("DOMContentLoaded", () => {
  updateAuthNav()
  initPublicNav()
  setupLogoutButton()
  initAllScrollEnhancements()
})

// 3D Tilt effect for cards
// Tilt effect inline implementation
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