import { Formik } from 'formik'
import Input from '../../core/Input'
import { Link, useNavigate } from 'react-router-dom'
import Button from '../../core/Button'
import * as yup from 'yup'
import Alert from '../../core/Alert'
import { useMutation } from '@tanstack/react-query'
import { login } from '../../../apis/auth.api'
import { useRef } from 'react'
import { useAuthContext } from '../../../context/auth.context'
import { AxiosError } from 'axios'
import JwtManager from '../../../utils/jwt.util'
import { LoginFormData } from '../../../types/auth.type'

const initFormikValue: LoginFormData = {
  phone: '',
  password: '',
}

const LoginForm = () => {
  const navigate = useNavigate()
  const { setIsAuth, setCurrentUser } = useAuthContext()
  const btnSubmitSpanChildRef = useRef<HTMLSpanElement>(null)
  const displayLoginResultRef = useRef<HTMLParagraphElement>(null)

  const loginMutation = useMutation({
    mutationFn: async (data: LoginFormData) => await login(data),
    onSuccess: (data) => {
      JwtManager.setAccessToken(data.data.accessToken)
      setCurrentUser(data.data.user)
      setIsAuth(true)
      navigate('/')
    },
    onError: (error: AxiosError) => {
      let timer = -1

      if (
        btnSubmitSpanChildRef.current &&
        displayLoginResultRef.current &&
        error.response
      ) {
        displayLoginResultRef.current.textContent = (
          error.response.data as any
        ).msg

        timer = window.setTimeout(() => {
          if (displayLoginResultRef.current)
            displayLoginResultRef.current.textContent = ''
        }, 5000)

        btnSubmitSpanChildRef.current.textContent = 'Login now!'
      }

      return () => window.clearTimeout(timer)
    },
  })

  const onFormSubmit = (values: LoginFormData) => {
    if (btnSubmitSpanChildRef.current) {
      btnSubmitSpanChildRef.current.textContent = 'Processing...'
    }
    loginMutation.mutate(values)
  }

  return (
    <div className='w-full mt-5'>
      <p
        ref={displayLoginResultRef}
        className='text-center mb-3 text-red-600 font-medium text-lg'
      ></p>
      <Formik
        initialValues={initFormikValue}
        onSubmit={onFormSubmit}
        validationSchema={yup.object({
          phone: yup
            .string()
            .required("Let's enter your phone")
            .matches(
              /^(0[3|5|7|8|9])+([0-9]{8})$/,
              'Your phone must start with (03|05|07|08|09) and contain 10 characters'
            ),
          password: yup.string().required("Let's enter your password"),
        })}
      >
        {({ handleSubmit, handleChange, values, errors }) => (
          <form onSubmit={handleSubmit}>
            <Input
              name='phone'
              placeholder='Enter your phone...'
              className='w-full'
              onChange={handleChange}
              value={values.phone}
              error={errors.phone ? true : false}
            />
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
            <Link to='/forget-password'>
              <span className='inline-block mt-4 text-blue-600 hover:underline'>
                Forget password
              </span>
            </Link>
            <Button type='submit' className='py-3 my-4'>
              <span ref={btnSubmitSpanChildRef}>Login now!</span>
            </Button>
          </form>
        )}
      </Formik>
    </div>
  )
}

export default LoginForm
