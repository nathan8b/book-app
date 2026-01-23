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
        <div className='book-list'>
          {books.map(book => (
            <div key={book.id} className='book-card'>
              <h2>{book.title}</h2>
              <p><strong>Author:</strong> {book.author}</p>
              {book.description && <p>{book.description}</p>}
              {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
            </div>
          ))}
        </div>
    </div>
  )
}

export default App
