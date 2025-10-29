// Shared Navigation Handler for Geochem Foods Express
// Handles both public navigation and dashboard sidebar navigation

export function initPublicNav() {
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

  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add("hidden")
        mobileMenu.classList.remove("flex")
        document.body.style.overflow = "auto"
      }
    })
  }
}

export function initDashboardNav() {
  const menuToggle = document.getElementById("menu-toggle")
  const sidebar = document.getElementById("sidebar")
  const sidebarOverlay = document.getElementById("sidebar-overlay")

  if (menuToggle && sidebar) {
    menuToggle.addEventListener("click", () => {
      sidebar.classList.toggle("-translate-x-full")
      if (sidebarOverlay) {
        sidebarOverlay.classList.toggle("hidden")
      }
      document.body.style.overflow = sidebar.classList.contains("-translate-x-full") ? "auto" : "hidden"
    })
  }

  if (sidebarOverlay) {
    sidebarOverlay.addEventListener("click", () => {
      sidebar?.classList.add("-translate-x-full")
      sidebarOverlay.classList.add("hidden")
      document.body.style.overflow = "auto"
    })
  }

  // Close sidebar when clicking a link on mobile
  const sidebarLinks = sidebar?.querySelectorAll("a")
  sidebarLinks?.forEach(link => {
    link.addEventListener("click", () => {
      if (window.innerWidth < 768) {
        sidebar.classList.add("-translate-x-full")
        if (sidebarOverlay) {
          sidebarOverlay.classList.add("hidden")
        }
        document.body.style.overflow = "auto"
      }
    })
  })
}

export function updateAuthNav() {
  const userLoggedIn = localStorage.getItem("gfeUser")
  
  // Desktop navigation
  const publicNav = document.querySelector("#public-nav")
  const privateNav = document.querySelector("#private-nav")
  const authButtons = document.querySelector("#auth-buttons")
  const userMenu = document.querySelector("#user-menu")
  
  // Mobile navigation
  const mobilePublicNav = document.querySelector("#mobile-public-nav")
  const mobilePrivateNav = document.querySelector("#mobile-private-nav")

  if (userLoggedIn) {
    // Desktop
    if (publicNav) publicNav.style.display = "none"
    if (privateNav) privateNav.style.display = "flex"
    if (authButtons) authButtons.style.display = "none"
    if (userMenu) userMenu.style.display = "flex"
    
    // Mobile
    if (mobilePublicNav) mobilePublicNav.style.display = "none"
    if (mobilePrivateNav) mobilePrivateNav.style.display = "flex"

    try {
      const userData = JSON.parse(userLoggedIn)
      const userNameElement = document.querySelector("#user-name")
      if (userNameElement && userData.name) {
        userNameElement.textContent = userData.name
      }
    } catch (e) {
      console.error("Error parsing user data:", e)
    }
  } else {
    // Desktop
    if (publicNav) publicNav.style.display = "flex"
    if (privateNav) privateNav.style.display = "none"
    if (authButtons) authButtons.style.display = "flex"
    if (userMenu) userMenu.style.display = "none"
    
    // Mobile
    if (mobilePublicNav) mobilePublicNav.style.display = "flex"
    if (mobilePrivateNav) mobilePrivateNav.style.display = "none"
  }
}

export function setupLogoutButton() {
  const logoutBtn = document.getElementById("logout-btn")
  const mobileLogoutBtn = document.getElementById("mobile-logout-btn")
  
  const handleLogout = (e) => {
    e.preventDefault()
    if (confirm("Are you sure you want to log out?")) {
      localStorage.removeItem("gfeUser")
      window.location.href = "index.html"
    }
  }
  
  if (logoutBtn) {
    logoutBtn.addEventListener("click", handleLogout)
  }
  
  if (mobileLogoutBtn) {
    mobileLogoutBtn.addEventListener("click", handleLogout)
  }
}
