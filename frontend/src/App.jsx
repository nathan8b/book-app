import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import './styles/App.css'

function App() {
  return (
    <div className='App'>
      <div className='top-bar'>
        <div className='search-bar'>
          <SearchBar/>
        </div>
      </div>
      
      <Routes>
        <Route path='/' element={<BookList/>}></Route>
        <Route path='/books/:id' element={<BookDetail/>}></Route>
        <Route path='/search' element={<SearchResults/>}></Route>
      </Routes>
    </div>
  )
}

export default App
