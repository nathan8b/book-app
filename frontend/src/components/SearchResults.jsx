import { useSearchParams } from "react-router-dom";
import { useEffect, useState } from 'react'


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



}


export default SearchResults