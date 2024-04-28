import './App.css'
import Gerente from './Components/Dashboard/Gerente'
import Coordinador from './Components/Dashboard/Coordinador'
import Contador from './Components/Dashboard/Contador'
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
    path: '\Gerente',
    element:<div><Gerente></Gerente></div>
  },
  {
    path: '/Coordinador',
    element:<div><Coordinador></Coordinador></div>
  },
  {
    path: '/Contador',
    element:<div><Contador></Contador></div>
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
