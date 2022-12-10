import { Link } from 'react-router-dom'

const RegisterFooter = () => {
  return (
    <div>
      <span className='text-slate-800'>
        You already have a TCloud account?{' '}
      </span>
      <Link to='/login'>
        <span className='font-medium text-blue-600 hover:underline'>
          Oh sheeet, let's login!
        </span>
      </Link>
    </div>
  )
}

export default RegisterFooter
