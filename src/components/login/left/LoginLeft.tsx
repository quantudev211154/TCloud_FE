import LeftBgr from '../../../assets/login_bgr.webp'

const LoginLeft = () => {
  return (
    <div className='hidden lg:flex w-0 md:w-1/2 bg-[#0e0348] flex-col justify-center items-center'>
      <div className='mb-3'>
        <p className='font-medium text-[3rem] text-white'>Hi there,</p>
        <span className='text-[3rem] text-sky-500 font-medium'>Tcloud </span>
        <span className='text-white font-medium text-[3rem]'>miss you!</span>
      </div>
      <figure className='w-3/4'>
        <img src={LeftBgr} className='object-cover pointer-events-none' />
      </figure>
    </div>
  )
}

export default LoginLeft
