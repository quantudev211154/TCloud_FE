import LoginFooter from './LoginFooter'
import LoginForm from './LoginForm'
import LoginHeader from './LoginHeader'

const LoginRight = () => {
  return (
    <div className='login-right flex-1 flex justify-center items-center'>
      <div className='w-5/6 md:w-3/4 flex flex-col justify-center items-center'>
        <LoginHeader />
        <LoginForm />
        <LoginFooter />
      </div>
    </div>
  )
}

export default LoginRight
