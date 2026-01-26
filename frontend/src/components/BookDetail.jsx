import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'

function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState(null)

    useEffect(() => {
        fetch(`http://localhost:8000/api/books/${id}/`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error:', error))
    }, [id])

    if (!book) {
        return <div>Loading...</div>
    }

    return (
        <div>
            <div className='book-info'>
                <Link to='/'>Back to Books</Link>
                <h1>{book.title}</h1>
                <h2>by {book.author}</h2>
                {book.description && <p>{book.description}</p>}
                {book.isbn && <p><strong>ISBN:</strong> {book.isbn}</p>}
                {book.pub_date && <p><strong>Published:</strong> {book.pub_date}</p>}
            </div>
            <div className='book-reviews'>
                {book.reviews.map(review => (
                    <div className='review'>
                        <p><strong>{review.reviewer_name} </strong>{new Date(review.create_date).toLocaleDateString()}</p>
                        <p>{review.review_text}</p>
                        <p>{review.rating} stars</p>
                    </div>
                ))}
            </div>
        </div>
    )
}

export default BookDetail