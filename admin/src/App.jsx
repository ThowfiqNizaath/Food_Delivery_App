import React from 'react'
import Navbar from './components/Navbar/Navbar'
import Sidebar from './components/Sidebar/Sidebar'
import { Navigate, Route, Routes } from 'react-router-dom'
import Add from './Pages/Add/Add'
import Order from './Pages/Order/Order'
import List from './Pages/List/List'

const App = () => {
  return (
    <div>
      <Navbar />
      <hr />
      <div className="app-content">
        <Sidebar />
        <Routes>
          <Route path="/" element={<Navigate to="/add" />} />
          <Route path="/add" element={<Add />} />
          <Route path="/orders" element={<Order />} />
          <Route path="/list" element={<List />} />
        </Routes>
      </div>
    </div>
  )
}

export default App