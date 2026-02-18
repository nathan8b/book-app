import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import SearchBar from './components/SearchBar'
import './App.css'

function App() {
  return (
    <div className='App'>
      <SearchBar></SearchBar>
      <Routes>
        <Route path='/' element={<BookList/>}></Route>
        <Route path='/books/:id' element={<BookDetail/>}></Route>
      </Routes>
    </div>
  )
}

export default App
