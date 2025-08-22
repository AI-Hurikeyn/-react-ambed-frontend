import { BaseComponentProps } from '@/types'

interface HeadingProps extends BaseComponentProps {
  level: 1 | 2 | 3 | 4 | 5 | 6
  variant?: 'display' | 'section' | 'subsection'
}

const Heading = ({ level, variant, children, className }: HeadingProps) => {
  const Tag = `h${level}` as keyof JSX.IntrinsicElements
  
  const variantClasses = {
    display: 'section-title__title',
    section: 'section-title__title',
    subsection: 'about-one__points-text'
  }
  
  const defaultClasses = variant ? variantClasses[variant] : ''
  
  return (
    <Tag className={`${defaultClasses} ${className || ''}`.trim()}>
      {children}
    </Tag>
  )
}

export default Heading
