// Real-time cart and notification functionality
class CartManager {
  constructor() {
    this.cart = JSON.parse(localStorage.getItem("gfe_cart")) || []
    this.initializeUI()
    this.setupListeners()
  }

  initializeUI() {
    this.updateCartCount()
    this.updateNotificationCount()
  }

  addToCart(product) {
    const existingItem = this.cart.find((item) => item.id === product.id)
    if (existingItem) {
      existingItem.quantity += product.quantity || 1
    } else {
      this.cart.push({ ...product, quantity: product.quantity || 1 })
    }
    this.saveCart()
    this.updateCartCount()
    this.showNotification(`${product.name} added to cart!`)
  }

  removeFromCart(productId) {
    this.cart = this.cart.filter((item) => item.id !== productId)
    this.saveCart()
    this.updateCartCount()
  }

  saveCart() {
    localStorage.setItem("gfe_cart", JSON.stringify(this.cart))
  }

  updateCartCount() {
    const cartIcon = document.getElementById("cart-count")
    if (cartIcon) {
      const count = this.cart.reduce((sum, item) => sum + item.quantity, 0)
      cartIcon.textContent = count
      cartIcon.style.display = count > 0 ? "flex" : "none"
    }
  }

  updateNotificationCount() {
    const notifIcon = document.getElementById("notification-count")
    if (notifIcon) {
      const count = Math.floor(Math.random() * 3) // Demo: random notifications
      notifIcon.textContent = count
      notifIcon.style.display = count > 0 ? "flex" : "none"
    }
  }

  showNotification(message) {
    const Swal = window.Swal // Declare the variable before using it
    if (typeof Swal !== "undefined") {
      Swal.fire({
        title: "Success!",
        text: message,
        icon: "success",
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.addEventListener("mouseenter", Swal.stopTimer)
          toast.addEventListener("mouseleave", Swal.resumeTimer)
        },
      })
    }
  }

  setupListeners() {
    // Listen for cart updates from other tabs
    window.addEventListener("storage", (e) => {
      if (e.key === "gfe_cart") {
        this.cart = JSON.parse(e.newValue) || []
        this.updateCartCount()
      }
    })
  }
}

// Initialize cart manager
const cartManager = new CartManager()

// Mobile menu toggle
document.addEventListener("DOMContentLoaded", () => {
  const openMenuBtn = document.getElementById("openMenu")
  const closeMenuBtn = document.getElementById("closeMenu")
  const mobileMenu = document.getElementById("mobileMenu")

  if (openMenuBtn) {
    openMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.remove("hidden")
      document.body.style.overflow = "hidden"
    })
  }

  if (closeMenuBtn) {
    closeMenuBtn.addEventListener("click", () => {
      mobileMenu.classList.add("hidden")
      document.body.style.overflow = "auto"
    })
  }

  // Close menu when clicking outside
  if (mobileMenu) {
    mobileMenu.addEventListener("click", (e) => {
      if (e.target === mobileMenu) {
        mobileMenu.classList.add("hidden")
        document.body.style.overflow = "auto"
      }
    })
  }
})

// SweetAlert responsive styling
if (typeof window.Swal !== "undefined") {
  // Declare the variable before using it
  const Swal = window.Swal
  Swal.mixin({
    customClass: {
      container: "swal-container",
      popup: "swal-popup",
      header: "swal-header",
      title: "swal-title",
      closeButton: "swal-close-button",
      icon: "swal-icon",
      image: "swal-image",
      htmlContainer: "swal-html-container",
      input: "swal-input",
      inputLabel: "swal-input-label",
      validationMessage: "swal-validation-message",
      actions: "swal-actions",
      confirmButton: "swal-confirm-button",
      denyButton: "swal-deny-button",
      cancelButton: "swal-cancel-button",
      loader: "swal-loader",
      footer: "swal-footer",
    },
  })
}
