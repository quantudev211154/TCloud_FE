import Sidebar from '../components/sidebar/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import { useAuthContext } from '../context/auth.context'
import { useEffect } from 'react'
import LoadingAuth from '../components/loading_auth/LoadingAuth'

const Dashboard = () => {
  const { isAuth, isLoading, checkAuth } = useAuthContext()

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth()
    }

    authenticate()
  }, [])

  if (isLoading) return <LoadingAuth />

  if (!isAuth) return <Navigate to='/login' />

  return (
    <div className='dashboard w-full min-h-screen flex justify-between'>
      <Sidebar />
      <div className='flex-1 flex flex-col justify-start items-center'>
        <Header />
        <div className='flex-1 w-full px-3'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
