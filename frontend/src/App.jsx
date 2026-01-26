import { Routes, Route } from 'react-router-dom'
import BookList from './components/BookList'
import BookDetail from './components/BookDetail'
import './App.css'

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path='/' element={<BookList/>}></Route>
        <Route path='/books/:id' element={<BookDetail/>}></Route>
      </Routes>
    </div>
  )
}

export default App
