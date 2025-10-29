// Enhanced Scroll Behavior for Geochem Foods Express
// Smooth scroll with easing, scroll-to-top button, and intersection observer animations

function initSmoothScroll() {
  // Handle all anchor link clicks for smooth scrolling
  document.querySelectorAll('a[href^="#"]').forEach(anchor => {
    anchor.addEventListener('click', function (e) {
      const targetId = this.getAttribute('href')
      if (targetId === '#') return
      
      const targetElement = document.querySelector(targetId)
      if (targetElement) {
        e.preventDefault()
        targetElement.scrollIntoView({
          behavior: 'smooth',
          block: 'start',
          inline: 'nearest'
        })
      }
    })
  })
}

function initScrollToTop() {
  // Create scroll-to-top button
  const scrollBtn = document.createElement('button')
  scrollBtn.id = 'scroll-to-top'
  scrollBtn.innerHTML = '<i class="fas fa-arrow-up"></i>'
  scrollBtn.setAttribute('aria-label', 'Scroll to top')
  scrollBtn.style.cssText = `
    position: fixed;
    bottom: 2rem;
    right: 2rem;
    width: 3rem;
    height: 3rem;
    border-radius: 50%;
    background-color: var(--gfe-green);
    color: white;
    border: none;
    cursor: pointer;
    opacity: 0;
    visibility: hidden;
    transition: all 0.3s ease;
    box-shadow: 0 4px 12px rgba(27, 94, 32, 0.3);
    z-index: 1000;
    display: flex;
    align-items: center;
    justify-center;
  `
  
  document.body.appendChild(scrollBtn)
  
  // Show/hide based on scroll position
  let scrollTimeout
  window.addEventListener('scroll', () => {
    clearTimeout(scrollTimeout)
    scrollTimeout = setTimeout(() => {
      if (window.scrollY > 300) {
        scrollBtn.style.opacity = '1'
        scrollBtn.style.visibility = 'visible'
      } else {
        scrollBtn.style.opacity = '0'
        scrollBtn.style.visibility = 'hidden'
      }
    }, 100)
  }, { passive: true })
  
  // Scroll to top on click
  scrollBtn.addEventListener('click', () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    })
  })
}

function initScrollAnimations() {
  // Intersection Observer for scroll animations
  const observerOptions = {
    root: null,
    rootMargin: '0px',
    threshold: 0.1
  }
  
  const observer = new IntersectionObserver((entries) => {
    entries.forEach(entry => {
      if (entry.isIntersecting) {
        entry.target.classList.add('animate-in')
        observer.unobserve(entry.target)
      }
    })
  }, observerOptions)
  
  // Observe elements with animation classes
  document.querySelectorAll('.animate-on-scroll').forEach(el => {
    observer.observe(el)
  })
}

// Initialize all scroll enhancements
function initAllScrollEnhancements() {
  if (document.readyState === 'loading') {
    document.addEventListener('DOMContentLoaded', () => {
      initSmoothScroll()
      initScrollToTop()
      initScrollAnimations()
    })
  } else {
    initSmoothScroll()
    initScrollToTop()
    initScrollAnimations()
  }
}
