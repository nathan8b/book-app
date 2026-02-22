import { useSearchParams, useNavigate } from "react-router-dom";
import { useEffect, useState } from 'react'
import '../styles/SearchResults.css'


function SearchResults() {
    const [books, setBooks] = useState([])
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')
    const navigate = useNavigate()

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Search Results for ${query}:`, data.items)
            setBooks(data.items)
        })
        .catch(error => console.error('Search error:', error))
    }, [query])

    function handleClick (book) {
        const bookData = {
            title: book.volumeInfo.title,
            author: book.volumeInfo.authors.join(", "),
            isbn: book.volumeInfo.industryIdentifiers?.find(isbn => isbn.type === 'ISBN_13')?.identifier || null,
            description: book.volumeInfo.description || null,
            pub_date: book.volumeInfo.publishedDate?.length === 10 ? book.volumeInfo.publishedDate : null,
        }

        fetch('http://localhost:8000/api/books/', {
            method: 'POST',
            body: JSON.stringify(bookData),
            headers: {
                'Content-Type': 'application/json',
            }
        })
        .then(response => response.json())
        .then(data => {
            navigate(`/books/${data.id}`)
        })
        
    }

    return (
        <div className="results-container">
            {books.map(book => (
                <div className="results-book-card" key={book.id} onClick={() => handleClick(book)}>
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.subtitle && <p>{book.volumeInfo.subtitle}</p>}
                    <p>by <strong>{book.volumeInfo.authors.join(', ')}</strong></p>
                </div>
            ))}

        </div>
    )

}


export default SearchResults