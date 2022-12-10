import RegisterFooter from './RegisterFooter'
import RegisterForm from './RegisterForm'
import RegisterHeader from './RegisterHeader'

const RegisterRight = () => {
  return (
    <div className='register-right flex-1 flex justify-center items-center'>
      <div className='w-5/6 md:w-3/4 flex flex-col justify-center items-center'>
        <RegisterHeader />
        <RegisterForm />
        <RegisterFooter />
      </div>
    </div>
  )
}

export default RegisterRight
