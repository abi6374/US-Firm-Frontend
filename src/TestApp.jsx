import { BrowserRouter as Router, Routes, Route } from 'react-router-dom'

function TestApp() {
  return (
    <Router>
      <div className='min-h-screen bg-blue-50 flex items-center justify-center'>
        <div className='text-center'>
          <h1 className='text-4xl font-bold text-blue-600 mb-4'>Legal AI Test</h1>
          <p className='text-gray-600 mb-8'>If you can see this, React is working!</p>
          <div className='space-y-4'>
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-xl font-semibold'>✅ React Loading</h2>
            </div>
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-xl font-semibold'>✅ Tailwind Styling</h2>
            </div>
            <div className='bg-white p-4 rounded-lg shadow'>
              <h2 className='text-xl font-semibold'>✅ Router Working</h2>
            </div>
          </div>
        </div>
      </div>
    </Router>
  )
}

export default TestApp
