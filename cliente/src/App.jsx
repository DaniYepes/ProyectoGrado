import './App.css'
import Dashboard from './Components/Dashboard/Dashboard'
import Login from './Components/Login/Login'
import Register from './Components/Register/Register'

import {
  createBrowserRouter,
  RouterProvider
} from 'react-router-dom'

const router = createBrowserRouter([
  {
    path: '/',
    element:<div><Login></Login></div>
  },
  {
    path: '/Register',
    element:<div><Register></Register></div>
  },
  {
    path: '/Dashboard',
    element:<div><Dashboard></Dashboard></div>
  }
])

function App() {


  return (
    <div>
      <RouterProvider router={router}/>
    </div>
  )
}

export default App
