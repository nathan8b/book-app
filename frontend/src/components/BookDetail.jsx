import { useParams } from 'react-router-dom'
import { useState, useEffect } from 'react'
import { Link } from 'react-router-dom'
import '../styles/BookDetail.css'

function BookDetail() {
    const { id } = useParams()
    const [book, setBook] = useState(null)

    // form state
    const [reviewerName, setReviewerName] = useState('')
    const [rating, setRating] = useState(5)
    const [reviewText, setReviewText] = useState('')

    useEffect(() => {
        fetch(`http://localhost:8000/api/books/${id}/`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error:', error))
    }, [id])

    if (!book) {
        return <div>Loading...</div>
    }

    // function to make POST request
    const handleSubmit = (e) => {
        e.preventDefault()

        const reviewData = {
            book: id, 
            reviewer_name: reviewerName,
            rating: rating,
            review_text: reviewText,
        }
        fetch('http://localhost:8000/api/reviews/', {
            method: 'POST',
            headers: {
                'Content-Type': 'application/json',
            },
            body: JSON.stringify(reviewData)
        })
        .then(response => response.json())
        .then(() => {
            setReviewerName('')
            setRating(5)
            setReviewText('')
            fetch(`http://localhost:8000/api/books/${id}/`)
            .then(response => response.json())
            .then(data => setBook(data))
            .catch(error => console.error('Error:', error))
        })
        
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
            <div className='review-form'>
                <h3>Write a Review</h3>
                <form onSubmit={handleSubmit}>
                    <input
                        type='text'
                        placeholder='Your name'
                        value={reviewerName}
                        onChange={(e) => setReviewerName(e.target.value)}
                    />
                    <select
                        value={rating}
                        onChange={(e) => setRating(Number(e.target.value))}
                    >
                        <option value={5}>5 Stars</option>
                        <option value={4}>4 Stars</option>
                        <option value={3}>3 Stars</option>
                        <option value={2}>2 Stars</option>
                        <option value={1}>1 Stars</option>
                    </select>
                    <textarea
                        placeholder='Write your review...'
                        value={reviewText}
                        onChange={(e) => setReviewText(e.target.value)}
                        required
                    />
                    <button type='submit'>Submit</button>
                </form>
            </div>
            <div className='review-list'>
                {book.reviews.map(review => (
                    <div className='review-card'>
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