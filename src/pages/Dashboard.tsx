import Sidebar from '../components/sidebar/Sidebar'
import { Navigate, Outlet } from 'react-router-dom'
import Header from '../components/header/Header'
import { useAuthContext } from '../context/auth.context'
import { useEffect } from 'react'
import LoadingAuth from '../components/loading_auth/LoadingAuth'
import { useFileMenuContext } from '../context/file-menu-context.context'

const Dashboard = () => {
  const { isAuth, isLoading, checkAuth, currentUser } = useAuthContext()
  const { setCurrentPost } = useFileMenuContext()

  useEffect(() => {
    const authenticate = async () => {
      await checkAuth()

      if (currentUser) {
        document.title = `Hi! ${currentUser.fullName}`
      }
    }

    authenticate()

    window.onclick = () => {
      setCurrentPost(undefined)
    }
  }, [])

  if (isLoading) return <LoadingAuth />

  if (!isAuth) return <Navigate to='/login' />

  return (
    <div className='dashboard w-full h-screen max-h-screen flex justify-between'>
      <Sidebar />
      <div className='w-full h-full flex-1 flex flex-col justify-start items-center'>
        <Header />
        <div className='flex-1 w-full pl-3 overflow-y-auto'>
          <Outlet />
        </div>
      </div>
    </div>
  )
}

export default Dashboard
