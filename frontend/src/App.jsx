import { useState, useEffect } from 'react'
import './App.css'

function App() {
  const [books, setBooks] = useState([])
  useEffect(() => {
    fetch('http://localhost:8000/api/books/')
      .then(response => response.json())
      .then(data => {
        console.log('Fetched books:', data)
        setBooks(data)
      })
      .catch(error => console.error('Error fetching books:', error))
  }, [])

  return (
    <div>
        <h1>Book Review App</h1>
        <p>Books will appear here...</p>
    </div>
  )
}

export default App
