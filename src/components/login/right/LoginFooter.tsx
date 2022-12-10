import { Link } from 'react-router-dom'
type Props = {}

const LoginFooter = (props: Props) => {
  return (
    <div>
      <span className='text-slate-800'>You need a TCloud account? </span>
      <Link to='/register'>
        <span className='font-medium text-rose-600 hover:underline'>
          Oh yeah, register here!
        </span>
      </Link>
    </div>
  )
}

export default LoginFooter
