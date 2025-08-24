import axios from 'axios'
import { ContactFormData, ContactFormResponse } from '@/types'

const API_BASE_URL = 'https://react-ambed-backend.vercel.app'

// Create axios instance with default config
const api = axios.create({
  baseURL: API_BASE_URL,
  timeout: 10000,
  headers: {
    'Content-Type': 'application/json',
  },
})

// Health check
export const checkHealth = async () => {
  try {
    const response = await api.get('/health')
    return response.data
  } catch (error) {
    console.error('Health check failed:', error)
    throw error
  }
}

// Contact form submission
export const submitContactForm = async (formData: ContactFormData): Promise<ContactFormResponse> => {
  try {
    const response = await api.post('/api/contact', formData)
    return response.data
  } catch (error) {
    console.error('Contact form submission failed:', error)
    throw error
  }
}

// Future API methods can be added here:
// export const getServices = async () => { ... }
// export const getProjects = async () => { ... }
// export const getTestimonials = async () => { ... }

export default api
