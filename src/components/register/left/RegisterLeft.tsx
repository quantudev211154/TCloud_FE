import RegisterBgr from '../../../assets/register-bgr.png'

const RegisterLeft = () => {
  return (
    <div className='register-left hidden lg:flex w-0 md:w-1/2 bg-[#58acff] flex-col justify-center items-center'>
      <div className='mb-3'>
        <p className='text-[2.5rem] font-medium text-gray-700'>
          Welcome to
          <span className='text-blue-700'> TCloud!</span>
        </p>
        <p className='text-3xl text-gray-700 ml-5'>Let's create a account</p>
        <p className='text-3xl text-gray-700 ml-10'>to explore our services!</p>
      </div>
      <figure className='w-3/4'>
        <img src={RegisterBgr} className='object-cover pointer-events-none' />
      </figure>
    </div>
  )
}

export default RegisterLeft
