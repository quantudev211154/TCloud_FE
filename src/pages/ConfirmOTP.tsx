import ConfirmOTPLeft from '../components/confirm-otp/left/ConfirmOTPLeft'
import ConfirmOTPRight from '../components/confirm-otp/right/ConfirmOTPRight'

const ConfirmOTP = () => {
  return (
    <div className='w-full min-h-screen flex justify-between items-center'>
      <ConfirmOTPLeft />
      <ConfirmOTPRight />
    </div>
  )
}

export default ConfirmOTP
