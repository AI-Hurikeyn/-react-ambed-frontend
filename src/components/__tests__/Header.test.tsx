import { render, screen } from '@testing-library/react'
import { BrowserRouter } from 'react-router-dom'
import Header from '../organisms/Header'

// Mock router for testing
const MockedHeader = () => (
  <BrowserRouter>
    <Header />
  </BrowserRouter>
)

describe('Header Component', () => {
  it('renders the company logo', () => {
    render(<MockedHeader />)
    const logos = screen.getAllByAltText('Ambed')
    expect(logos).toHaveLength(3) // Dark logo, light logo, and mobile logo
  })

  it('renders navigation links', () => {
    render(<MockedHeader />)
    expect(screen.getByText('About')).toBeInTheDocument()
    expect(screen.getByText('Services')).toBeInTheDocument()
    expect(screen.getByText('Projects')).toBeInTheDocument()
    expect(screen.getByText('Team')).toBeInTheDocument()
    expect(screen.getByText('Testimonials')).toBeInTheDocument()
    expect(screen.getByText('Blog')).toBeInTheDocument()
  })

  it('renders contact information', () => {
    render(<MockedHeader />)
    expect(screen.getByText('+ 98 (000) - 9630')).toBeInTheDocument()
    expect(screen.getByText('ambed@company.com')).toBeInTheDocument()
    expect(screen.getByText('Melbourne, Australia')).toBeInTheDocument()
  })

  it('renders social media links', () => {
    render(<MockedHeader />)
    const socialLinks = screen.getAllByRole('link', { name: /fab/i })
    expect(socialLinks.length).toBeGreaterThan(0)
  })

  it('renders appointment button', () => {
    render(<MockedHeader />)
    expect(screen.getByText('Book Appointment')).toBeInTheDocument()
  })
})
