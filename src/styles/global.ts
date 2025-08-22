import '../index.css'
import '@/styles/tailwind.css'

// Global CSS to coexist with vendor styles
const globalStyles = `
  /* React app specific overrides */
  #root {
    width: 100%;
    min-height: 100vh;
  }
  
  /* Ensure vendor styles take precedence */
  .wp-theme-ambed {
    position: relative;
  }
`

// Inject global styles
const styleElement = document.createElement('style')
styleElement.textContent = globalStyles
document.head.appendChild(styleElement)
