import ConfirmOTPBgr from '../../../assets/confirm-otp-bgr.webp'

const ConfirmOTPRight = () => {
  return (
    <div className='hidden lg:flex w-0 md:w-1/2 flex-col justify-center items-center'>
      <figure className='w-3/4 h-full'>
        <img src={ConfirmOTPBgr} className='object-cover pointer-events-none' />
      </figure>
    </div>
  )
}

export default ConfirmOTPRight
