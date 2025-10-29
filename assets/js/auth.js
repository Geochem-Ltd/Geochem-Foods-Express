// Authentication and redirect logic for Geochem Foods Express

// Check if user is authenticated
function isAuthenticated() {
  return localStorage.getItem("gfeUser") !== null
}

// Check authentication and redirect to target page or login
function checkAuthAndRedirect(targetPage) {
  if (isAuthenticated()) {
    window.location.href = targetPage
  } else {
    // Store intended destination
    localStorage.setItem("gfeRedirectAfterLogin", targetPage)
    window.location.href = "login.html"
  }
}

// Handle successful login
function handleLogin(userData) {
  localStorage.setItem("gfeUser", JSON.stringify(userData))

  // Check if there's a redirect destination
  const redirectTo = localStorage.getItem("gfeRedirectAfterLogin")
  localStorage.removeItem("gfeRedirectAfterLogin")

  // Redirect to intended page or default to marketplace
  window.location.href = redirectTo || "marketplace.html"
}

// Handle logout
function handleLogout() {
  localStorage.removeItem("gfeUser")
  localStorage.removeItem("gfeRedirectAfterLogin")
  window.location.href = "index.html"
}

// Get current user data
function getCurrentUser() {
  const userData = localStorage.getItem("gfeUser")
  return userData ? JSON.parse(userData) : null
}

// Protect page - redirect to login if not authenticated
function protectPage() {
  if (!isAuthenticated()) {
    localStorage.setItem("gfeRedirectAfterLogin", window.location.pathname)
    window.location.href = "login.html"
  }
}
