import { useState } from 'react'
import './App.css'
import Navbar from './Components/Navbar'
import { Route, Routes } from 'react-router-dom'
import DashBoard from './Components/DashBoard'
import BooksPg from './Components/BooksPg'
import Members from './Components/Members'

function App() {

  return (
    < div className='main-container'>
      <div className="navbar-section">
     <Navbar/>
    </div>

    <div className="routes-container">
     <Routes>
      <Route path='/' element={<DashBoard />}/>
      <Route path='/books' element={<BooksPg />}/>
      <Route path='/members' element={<Members />}/>
     </Routes>
     </div>
    </div>
  )
}

export default App
