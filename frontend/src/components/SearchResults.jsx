import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react'
import '../styles/SearchResults.css'


function SearchResults() {
    const [books, setBooks] = useState([])
    const [searchParams] = useSearchParams();
    const query = searchParams.get('q')

    useEffect(() => {
        fetch(`https://www.googleapis.com/books/v1/volumes?q=intitle:${query}&key=${import.meta.env.VITE_GOOGLE_BOOKS_KEY}`)
        .then(response => response.json())
        .then(data => {
            console.log(`Search Results for ${query}:`, data.items)
            setBooks(data.items)
        })
        .catch(error => console.error('Search error:', error))
    }, [query])

    if (!books) {
        return <div>Loading...</div>
    }

    return (
        <div className="results-container">
            {books.map(book => (
                <div className="results-book-card" key={book.id}>
                    <h2>{book.volumeInfo.title}</h2>
                    {book.volumeInfo.subtitle && <p>{book.volumeInfo.subtitle}</p>}
                    <p>by <strong>{book.volumeInfo.authors.join(', ')}</strong></p>
                </div>
            ))}

        </div>
    )

}


export default SearchResults