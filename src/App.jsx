import React from 'react'
import { Route, Routes } from 'react-router'
import Charts from './routes/Charts'
import Home from './Home'

function App() {
  return (
   <>
     <Routes>
        <Route path="/" element={<Home />} />
        <Route path="/dashboard" element={<Charts />} />
     </Routes>
   </>
  )
}

export default App