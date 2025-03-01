import {BrowserRouter,Route,Routes} from 'react-router-dom'
import Home from './pages/Home'
import Login from './pages/Login'
import Signup from './pages/Signup'
import VerifySignup from './pages/VerifySignup'
import {Toaster} from 'react-hot-toast'
import ProtectedRoute from './components/ProtectedRoute'
function App(){
  return (
    <div>
      <Toaster postion="top-center" reverseOrder={false} />
      <BrowserRouter>
       <Routes>
        <Route path='/' element={
          <ProtectedRoute>
            <Home/>
          </ProtectedRoute>
          }></Route>
        <Route path='/login' element={<Login/>}></Route>
        <Route path='/Signup' element={<Signup/>}></Route>
        <Route path="/verifysignup" element={<VerifySignup />} />
       </Routes>
      </BrowserRouter>
    </div>
  )
}
export default App;