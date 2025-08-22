import { BaseComponentProps } from '@/types'
import clsx from 'clsx'

interface ButtonProps extends BaseComponentProps {
  variant?: 'primary' | 'secondary' | 'outline'
  size?: 'sm' | 'md' | 'lg'
  href?: string
  target?: string
  onClick?: () => void
  disabled?: boolean
}

const Button = ({ 
  children, 
  className, 
  variant = 'primary', 
  size = 'md',
  href,
  target,
  onClick,
  disabled = false 
}: ButtonProps) => {
  const baseClasses = 'thm-btn inline-block text-center transition-all duration-300'
  
  const variantClasses = {
    primary: 'thm-btn main-menu__btn',
    secondary: 'thm-btn about-one__btn',
    outline: 'thm-btn thm-btn--outline'
  }
  
  const sizeClasses = {
    sm: 'px-4 py-2 text-sm',
    md: 'px-6 py-3',
    lg: 'px-8 py-4 text-lg'
  }
  
  const classes = clsx(
    baseClasses,
    variantClasses[variant],
    sizeClasses[size],
    disabled && 'opacity-50 cursor-not-allowed',
    className
  )
  
  if (href) {
    return (
      <a 
        href={href} 
        target={target}
        className={classes}
        onClick={onClick}
      >
        {children}
      </a>
    )
  }
  
  return (
    <button 
      className={classes}
      onClick={onClick}
      disabled={disabled}
    >
      {children}
    </button>
  )
}

export default Button
