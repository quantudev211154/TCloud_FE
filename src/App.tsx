import { Route, Routes } from 'react-router'
import { BrowserRouter } from 'react-router-dom'
import ConfirmOTP from './pages/ConfirmOTP'
import Login from './pages/Login'
import Dashboard from './pages/Dashboard'
import Register from './pages/Register'
import Main from './components/main/Main'
import ForgetPassword from './pages/ForgetPassword'
import NotFound from './pages/NotFound'
import AuthContextProvider from './context/auth.context'

function App() {
  return (
    <AuthContextProvider>
      <BrowserRouter>
        <Routes>
          <Route path='login' element={<Login />} />
          <Route path='register' element={<Register />} />
          <Route path='confirm-otp' element={<ConfirmOTP />} />
          <Route path='forget-password' element={<ForgetPassword />} />
          <Route path='' element={<Dashboard />}>
            <Route index element={<Main />} />
          </Route>
          <Route path='*' element={<NotFound />} />
        </Routes>
      </BrowserRouter>
    </AuthContextProvider>
  )
}

export default App
