import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import SearchBar from './components/SearchBar'
import SearchResults from './components/SearchResults'
import './App.css'

function App() {
  return (
    <div className='App'>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element={<BookList/>}></Route>
        <Route path='/books/:id' element={<BookDetail/>}></Route>
        <Route path='/search' element={<SearchResults/>}></Route>
      </Routes>
    </div>
  )
}

export default App
