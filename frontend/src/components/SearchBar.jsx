import { useState} from 'react'
import {useNavigate } from 'react-router-dom'
import '../styles/SearchBar.css'

function SearchBar() {
    const [search, setSearch] = useState('')
    const navigate = useNavigate()

    function handleSubmit(e) {
        e.preventDefault()
        navigate(`/search?q=${encodeURIComponent(search)}`)
    }
    return (
        <form onSubmit={handleSubmit}>
            <input
                type='text'
                placeholder='Title / Author / ISBN'
                value={search}
                onChange={(e) => setSearch(e.target.value)}
            />
            <button type='submit'>Submit</button>
        </form>
    )

}

export default SearchBar