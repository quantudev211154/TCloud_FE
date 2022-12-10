import RegisterLeft from '../components/register/left/RegisterLeft'
import RegisterRight from '../components/register/right/RegisterRight'
import { useEffect } from 'react'

const Register = () => {
  useEffect(() => {
    document.title = 'TCloud login'
  }, [])

  return (
    <div className='register w-full min-h-[100vh] flex justify-between'>
      <RegisterLeft />
      <RegisterRight />
    </div>
  )
}

export default Register
