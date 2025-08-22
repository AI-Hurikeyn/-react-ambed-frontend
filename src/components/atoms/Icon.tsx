import { BaseComponentProps } from '@/types'

interface IconProps extends BaseComponentProps {
  name: string
  size?: 'sm' | 'md' | 'lg'
  type?: 'ambed' | 'fontawesome' | 'flaticon'
}

const Icon = ({ name, size = 'md', type = 'ambed', className }: IconProps) => {
  const sizeClasses = {
    sm: 'text-sm',
    md: 'text-base', 
    lg: 'text-xl'
  }
  
  const iconClasses = {
    ambed: `icon-${name}`,
    fontawesome: `fa ${name}`,
    flaticon: `flaticon-${name}`
  }
  
  return (
    <span 
      className={`icon-svg ${iconClasses[type]} ${sizeClasses[size]} ${className || ''}`}
      aria-hidden="true"
    />
  )
}

export default Icon
