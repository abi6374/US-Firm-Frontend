import { useState } from 'react'
import Home from './Components/Home'
import Services from './Components/Services'
function App() {
  const [count, setCount] = useState(0)

  return (

    <div className='font-poppins'>
      <Home />
      <Services />
    </div>
  )
}

export default App
