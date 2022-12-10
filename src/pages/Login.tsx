import { useEffect } from 'react'
import LoginLeft from '../components/login/left/LoginLeft'
import LoginRight from '../components/login/right/LoginRight'

const Login = () => {
  useEffect(() => {
    document.title = 'TCloud login'
  }, [])

  return (
    <div className='login w-full min-h-[100vh] flex justify-between'>
      <LoginLeft />
      <LoginRight />
    </div>
  )
}

export default Login
