import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/BookList.css'

function BookList() {
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
            <Link to={`/books/${book.id}`} key={book.id}>
                <div className='book-card'>
                    <h2>{book.title}</h2>
                    <p><strong>Author:</strong> {book.author}</p>
                    {book.description && <p>{book.description}</p>}
                    {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
                </div>
            </Link>
          ))}
        </div>
    </div>
  )
}

export default BookList