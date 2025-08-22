import { Routes, Route } from 'react-router-dom'
import HomePage from '@pages/HomePage'
import BookAppointment from '@pages/BookAppointment'

function App() {
  return (
    <Routes>
      <Route path="/" element={<HomePage />} />
      <Route path="/pricing" element={<HomePage />} />
      <Route path="/book-appointment" element={<BookAppointment />} />
      <Route path="*" element={<HomePage />} />
    </Routes>
  )
}

export default App
