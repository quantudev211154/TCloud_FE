import { Formik } from 'formik'
import * as yup from 'yup'
import Alert from '../../core/Alert'
import Button from '../../core/Button'
import Input from '../../core/Input'
import { useRef } from 'react'
import { useMutation } from '@tanstack/react-query'
import { checkExistingPhone, register } from '../../../apis/auth.api'
import { useState, useEffect } from 'react'
import { AxiosError } from 'axios'
import { RegisterFormData } from '../../../types/auth.type'
import PendingAccount from '../../../utils/register-pending'
import { useNavigate } from 'react-router-dom'
import FirebaseService from '../../../services/firebase'

const initValue: RegisterFormData = {
  fullName: '',
  phone: '',
  password: '',
}

const RegisterForm = () => {
  const btnRegisterSpanChildRef = useRef<HTMLSpanElement>(null)
  const [isPhoneValid, setIsPhoneValid] = useState(false)
  const navigate = useNavigate()

  useEffect(() => {
    FirebaseService.generateRecaptchatVerifier('reptcapchaPopup')
  }, [])

  const checkExistingPhoneMutation = useMutation({
    mutationFn: async (data: string) => await checkExistingPhone(data),
    onSuccess: () => {
      setIsPhoneValid(true)
    },
    onError: (error: AxiosError) => {
      if (error.response) {
        setIsPhoneValid(false)
      }
    },
  })

  const onFormSubmit = (value: RegisterFormData) => {
    if (isPhoneValid && btnRegisterSpanChildRef.current) {
      btnRegisterSpanChildRef.current.textContent =
        "Let's ready to receive OTP..."

      PendingAccount.setPendingAccount(value)

      FirebaseService.sendFirebaseAuthOTP(value.phone, () => {
        navigate('/confirm-otp')
      })
    }
  }

  return (
    <div className='w-full mt-8'>
      <Formik
        initialValues={initValue}
        onSubmit={onFormSubmit}
        validationSchema={yup.object({
          fullName: yup.string().required("Let's enter your fullname"),
          phone: yup
            .string()
            .required("Let's enter your phone")
            .matches(
              /^(0[3|5|7|8|9])+([0-9]{8})$/,
              'Your phone must start with (03|05|07|08|09) and contain 10 characters'
            ),
          password: yup
            .string()
            .required("Let's enter your password")
            .min(6, 'Your password must have more than 6 characters'),
        })}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name='fullName'
              placeholder='Enter your fullname...'
              className='w-full'
              onChange={handleChange}
              value={values.fullName}
              error={errors.fullName ? true : false}
            />
            {errors.fullName ? (
              <Alert error={true} title={errors.fullName} />
            ) : (
              <></>
            )}
            <Input
              name='phone'
              placeholder='Enter your phone...'
              className='w-full mt-4'
              onChange={(e) => {
                handleChange(e)

                const value = e.target.value

                if (value.length === 10)
                  checkExistingPhoneMutation.mutate(value)
              }}
              value={values.phone}
              error={
                values.phone.length > 1 && (errors.phone || !isPhoneValid)
                  ? true
                  : false
              }
            />
            {values.phone.length > 1 && !isPhoneValid && !errors.phone ? (
              <Alert error={true} title='This phone is used by other people' />
            ) : (
              <></>
            )}
            {errors.phone ? <Alert error={true} title={errors.phone} /> : <></>}
            <Input
              type='password'
              name='password'
              placeholder='Enter your password...'
              className='w-full mt-4'
              onChange={handleChange}
              value={values.password}
              error={errors.password ? true : false}
            />
            {errors.password ? (
              <Alert error={true} title={errors.password} />
            ) : (
              <></>
            )}
            <Button type='submit' className='py-3 my-4'>
              <span ref={btnRegisterSpanChildRef}>Register now!</span>
            </Button>
            <div id='reptcapchaPopup'></div>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default RegisterForm
