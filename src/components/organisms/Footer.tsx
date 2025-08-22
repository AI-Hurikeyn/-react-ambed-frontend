import { BaseComponentProps } from '@/types'

const Footer = ({ className }: BaseComponentProps) => {
  return (
    <footer className={`main-footer ${className || ''}`}>
      <div className="container">
        <div className="main-footer__inner">
          <p>&copy; 2024 Ambed. All rights reserved.</p>
        </div>
      </div>
    </footer>
  )
}

export default Footer
