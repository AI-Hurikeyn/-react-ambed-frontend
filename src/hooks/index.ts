import { useState, useEffect } from 'react'

/**
 * Hook to detect if user is scrolling and current scroll position
 * Useful for sticky headers and scroll-based animations
 */
export const useScroll = () => {
  const [scrollY, setScrollY] = useState(0)
  const [isScrolling, setIsScrolling] = useState(false)

  useEffect(() => {
    let timeoutId: NodeJS.Timeout

    const updateScrollY = () => {
      setScrollY(window.scrollY)
      setIsScrolling(true)

      // Clear previous timeout
      clearTimeout(timeoutId)

      // Set scrolling to false after 150ms of no scrolling
      timeoutId = setTimeout(() => {
        setIsScrolling(false)
      }, 150)
    }

    window.addEventListener('scroll', updateScrollY)

    return () => {
      window.removeEventListener('scroll', updateScrollY)
      clearTimeout(timeoutId)
    }
  }, [])

  return { scrollY, isScrolling }
}

/**
 * Hook to handle form state and validation
 */
export const useForm = <T extends Record<string, any>>(
  initialValues: T,
  validate?: (values: T) => Partial<T>
) => {
  const [values, setValues] = useState<T>(initialValues)
  const [errors, setErrors] = useState<Partial<T>>({})
  const [isSubmitting, setIsSubmitting] = useState(false)

  const handleChange = (name: keyof T, value: any) => {
    setValues(prev => ({
      ...prev,
      [name]: value
    }))

    // Clear error when user starts typing
    if (errors[name]) {
      setErrors(prev => ({
        ...prev,
        [name]: undefined
      }))
    }
  }

  const handleSubmit = async (onSubmit: (values: T) => Promise<void> | void) => {
    setIsSubmitting(true)

    // Run validation if provided
    if (validate) {
      const validationErrors = validate(values)
      if (Object.keys(validationErrors).length > 0) {
        setErrors(validationErrors)
        setIsSubmitting(false)
        return
      }
    }

    try {
      await onSubmit(values)
      // Reset form on successful submission
      setValues(initialValues)
      setErrors({})
    } catch (error) {
      console.error('Form submission error:', error)
    } finally {
      setIsSubmitting(false)
    }
  }

  const reset = () => {
    setValues(initialValues)
    setErrors({})
    setIsSubmitting(false)
  }

  return {
    values,
    errors,
    isSubmitting,
    handleChange,
    handleSubmit,
    reset
  }
}

/**
 * Hook to handle responsive breakpoints
 * Matches the original theme's breakpoints
 */
export const useBreakpoint = () => {
  const [breakpoint, setBreakpoint] = useState<'sm' | 'md' | 'lg' | 'xl' | '2xl'>('xl')

  useEffect(() => {
    const updateBreakpoint = () => {
      const width = window.innerWidth
      
      if (width < 576) {
        setBreakpoint('sm')
      } else if (width < 768) {
        setBreakpoint('md') 
      } else if (width < 992) {
        setBreakpoint('lg')
      } else if (width < 1200) {
        setBreakpoint('xl')
      } else {
        setBreakpoint('2xl')
      }
    }

    // Set initial breakpoint
    updateBreakpoint()

    window.addEventListener('resize', updateBreakpoint)
    return () => window.removeEventListener('resize', updateBreakpoint)
  }, [])

  return {
    breakpoint,
    isMobile: ['sm', 'md'].includes(breakpoint),
    isTablet: breakpoint === 'lg',
    isDesktop: ['xl', '2xl'].includes(breakpoint)
  }
}

/**
 * Hook to handle intersection observer for animations
 * Useful for triggering animations when elements come into view
 */
export const useIntersectionObserver = (
  ref: React.RefObject<Element>,
  options: IntersectionObserverInit = {}
) => {
  const [isIntersecting, setIsIntersecting] = useState(false)

  useEffect(() => {
    const element = ref.current
    if (!element) return

    const observer = new IntersectionObserver(
      ([entry]) => {
        setIsIntersecting(entry.isIntersecting)
      },
      {
        threshold: 0.1,
        ...options
      }
    )

    observer.observe(element)

    return () => {
      observer.unobserve(element)
    }
  }, [ref, options])

  return isIntersecting
}
