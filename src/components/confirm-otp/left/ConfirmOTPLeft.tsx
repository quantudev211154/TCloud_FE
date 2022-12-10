import { Formik } from 'formik'
import {
  ConfirmOTPFormType,
  LoginFormData,
  RegisterFormData,
} from '../../../types/auth.type'
import Button from '../../core/Button'
import * as yup from 'yup'
import Input from '../../core/Input'
import Alert from '../../core/Alert'
import { Navigate, useNavigate } from 'react-router-dom'
import PendingAccount from '../../../utils/register-pending'
import { useRef, useState, useEffect } from 'react'
import FirebaseService from '../../../services/firebase'
import { useMutation } from '@tanstack/react-query'
import { login, register } from '../../../apis/auth.api'
import { useAuthContext } from '../../../context/auth.context'
import JwtManager from '../../../utils/jwt.util'

const initValue: ConfirmOTPFormType = {
  otp: '',
}

const ConfirmOTPLeft = () => {
  const { setIsAuth, setIsLoading, setCurrentUser } = useAuthContext()
  const navigate = useNavigate()
  const otpFieldRef = useRef<HTMLInputElement>(null)
  const [confirmOTPResult, setConfirmOTPResult] = useState({
    isShowAlert: false,
    isSuccess: false,
    msg: '',
  })
  let defaultTimeToRedirect = 4
  let intervalToDetermineRemainingTime = -1
  let timeoutToRedirect = -1

  useEffect(() => {
    document.title = 'Confirm TCloud OTP'

    FirebaseService.generateRecaptchatVerifier('recaptchatPopup')
  }, [])

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => await login(data),
    onSuccess: (data) => {
      JwtManager.setAccessToken(data.data.accessToken)
      setCurrentUser(data.data.user)
      setIsAuth(true)
      setIsLoading(false)
    },
  })

  const registerMutation = useMutation({
    mutationFn: async (data: RegisterFormData) => await register(data),
    onSuccess: () => {
      const pendingAccount =
        PendingAccount.getPendingAccount() as RegisterFormData

      loginMutation.mutate({
        phone: pendingAccount.phone,
        password: pendingAccount.password,
      })
    },
  })

  if (!PendingAccount.getPendingAccount()) return <Navigate to='/register' />

  const onConfirmOTPFailure = () => {
    if (otpFieldRef.current) {
      otpFieldRef.current.disabled = false
    }
    setConfirmOTPResult({
      ...confirmOTPResult,
      isShowAlert: true,
      isSuccess: false,
      msg: 'Your OTP code is incorrect',
    })
  }

  const onConfirmOTPSuccess = () => {
    const pendingAccount =
      PendingAccount.getPendingAccount() as RegisterFormData

    registerMutation.mutate(pendingAccount)

    intervalToDetermineRemainingTime = window.setInterval(() => {
      setConfirmOTPResult({
        ...confirmOTPResult,
        isShowAlert: true,
        isSuccess: true,
        msg: `Confirmed your OTP. You will be redirect after ${
          defaultTimeToRedirect - 1
        } seconds`,
      })

      --defaultTimeToRedirect
    }, 1000)

    timeoutToRedirect = window.setTimeout(() => {
      navigate('/')
    }, 4000)

    return () => {
      window.clearTimeout(timeoutToRedirect)
      window.clearInterval(intervalToDetermineRemainingTime)
    }
  }

  const onFormSubmit = (value: ConfirmOTPFormType) => {
    FirebaseService.confirmFirebaseAuthOTP(
      value.otp,
      onConfirmOTPSuccess,
      onConfirmOTPFailure
    )
  }

  const onOTPFieldChange = (
    event: React.ChangeEvent<HTMLInputElement | HTMLTextAreaElement>
  ) => {
    setConfirmOTPResult({
      ...confirmOTPResult,
      isShowAlert: false,
    })
    const value = event.target.value

    if (otpFieldRef.current) {
      if (value.length === 6) {
        otpFieldRef.current.disabled = true
        onFormSubmit({
          otp: value,
        })
      } else {
        otpFieldRef.current.disabled = false
      }
    }
  }

  return (
    <div className='flex-1 flex justify-center items-center'>
      <div className='w-5/6 md:w-3/4'>
        <p className='text-2xl font-medium mb-5'>
          Let's confirm your latest OTP!
        </p>
        {confirmOTPResult.isShowAlert ? (
          <p
            className={`text-lg font-medium mb-3 ${
              confirmOTPResult.isSuccess ? 'text-green-700' : 'text-red-600'
            }`}
          >
            {confirmOTPResult.msg}
          </p>
        ) : (
          <></>
        )}
        <Formik
          initialValues={initValue}
          onSubmit={onFormSubmit}
          validationSchema={yup.object({
            otp: yup
              .string()
              .required("Let's enter your OTP")
              .min(6, 'OTP code must have 6 characters at least')
              .max(6, 'OTP code only has 6 characters'),
          })}
        >
          {({ handleChange, handleSubmit, values, errors }) => (
            <form onSubmit={handleSubmit}>
              <Input
                ref={otpFieldRef}
                name='otp'
                type='text'
                error={errors.otp ? true : false}
                placeholder='Your latest OTP'
                onChange={(e) => {
                  handleChange(e)
                  onOTPFieldChange(e)
                }}
                value={values.otp}
                className='w-full'
              />
              {errors.otp ? <Alert title={errors.otp} error={true} /> : <></>}
            </form>
          )}
        </Formik>
        <Button
          className='py-3 mt-5'
          onClick={() => {
            FirebaseService.sendFirebaseAuthOTP(
              (PendingAccount.getPendingAccount() as RegisterFormData).phone
            )
          }}
        >
          <span>Resend OTP again</span>
        </Button>
        <div id='recaptchatPopup'></div>
      </div>
    </div>
  )
}

export default ConfirmOTPLeft
