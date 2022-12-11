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
import MenuContextProvider from './context/menu.context'
import MyFiles from './components/dashboard/my-files/MyFiles'
import FavoriteFiles from './components/dashboard/favorite-files/FavoriteFiles'
import RecycleBinFiles from './components/dashboard/recycle-bin-files/RecycleBinFiles'

function App() {
  return (
    <AuthContextProvider>
      <MenuContextProvider>
        <BrowserRouter>
          <Routes>
            <Route path='login' element={<Login />} />
            <Route path='register' element={<Register />} />
            <Route path='confirm-otp' element={<ConfirmOTP />} />
            <Route path='forget-password' element={<ForgetPassword />} />
            <Route path='' element={<Dashboard />}>
              <Route index element={<MyFiles />} />
              <Route path='/favorite-files' element={<FavoriteFiles />} />
              <Route path='/recycle-bin-files' element={<RecycleBinFiles />} />
            </Route>
            <Route path='*' element={<NotFound />} />
          </Routes>
        </BrowserRouter>
      </MenuContextProvider>
    </AuthContextProvider>
  )
}

export default App
