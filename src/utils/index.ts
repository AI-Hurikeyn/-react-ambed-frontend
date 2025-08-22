/**
 * Utility function to combine CSS classes
 * Useful for conditional styling
 */
export const classNames = (...classes: (string | undefined | null | false)[]): string => {
  return classes.filter(Boolean).join(' ')
}

/**
 * Scroll to element by ID with smooth behavior
 * Used for navigation links
 */
export const scrollToElement = (elementId: string, offset: number = 80): void => {
  const element = document.getElementById(elementId)
  if (element) {
    const elementPosition = element.getBoundingClientRect().top + window.pageYOffset
    const offsetPosition = elementPosition - offset

    window.scrollTo({
      top: offsetPosition,
      behavior: 'smooth'
    })
  }
}

/**
 * Format phone number for display
 */
export const formatPhoneNumber = (phone: string): string => {
  // Remove all non-numeric characters
  const cleaned = phone.replace(/\D/g, '')
  
  // Format as (XXX) XXX-XXXX for US numbers
  if (cleaned.length === 10) {
    return `(${cleaned.slice(0, 3)}) ${cleaned.slice(3, 6)}-${cleaned.slice(6)}`
  }
  
  // Return original if not a standard format
  return phone
}

/**
 * Validate email address
 */
export const isValidEmail = (email: string): boolean => {
  const emailRegex = /^[^\s@]+@[^\s@]+\.[^\s@]+$/
  return emailRegex.test(email)
}

/**
 * Debounce function for performance optimization
 */
export const debounce = <T extends (...args: any[]) => any>(
  func: T,
  wait: number
): ((...args: Parameters<T>) => void) => {
  let timeout: NodeJS.Timeout | null = null
  
  return (...args: Parameters<T>) => {
    if (timeout) {
      clearTimeout(timeout)
    }
    
    timeout = setTimeout(() => {
      func(...args)
    }, wait)
  }
}

/**
 * Check if element is in viewport
 * Useful for animations on scroll
 */
export const isInViewport = (element: Element): boolean => {
  const rect = element.getBoundingClientRect()
  return (
    rect.top >= 0 &&
    rect.left >= 0 &&
    rect.bottom <= (window.innerHeight || document.documentElement.clientHeight) &&
    rect.right <= (window.innerWidth || document.documentElement.clientWidth)
  )
}

/**
 * Initialize WordPress-style animations
 * Maintains compatibility with original theme
 */
export const initializeAnimations = (): void => {
  // Initialize WOW.js for scroll animations if available
  if (typeof window !== 'undefined' && (window as any).WOW) {
    const wow = new (window as any).WOW({
      live: false
    })
    wow.init()
  }
}

/**
 * Initialize Swiper sliders
 * Maintains compatibility with original theme
 */
export const initializeSliders = (): void => {
  if (typeof window !== 'undefined' && (window as any).Swiper) {
    // Main slider initialization
    const mainSlider = document.querySelector('.thm-swiper__slider')
    if (mainSlider) {
      new (window as any).Swiper(mainSlider, {
        slidesPerView: 1,
        loop: true,
        effect: 'fade',
        autoplay: {
          delay: 5000
        }
      })
    }
  }
}
