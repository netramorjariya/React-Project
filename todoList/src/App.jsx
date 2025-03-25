import React from 'react'
import { useState } from 'react'
import reactLogo from './assets/react.svg'
import viteLogo from '/vite.svg'
import './App.css'
import ToggleProject from './ToggleProject'

function App() {
  const [count, setCount] = useState(0)

  return (
    <>
      
  <ToggleProject/>
    </>
  )
}

export default App
