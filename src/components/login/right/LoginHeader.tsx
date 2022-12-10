import React from 'react'

type Props = {}

const LoginHeader = (props: Props) => {
  return (
    <div className='py-5 text-center'>
      <p className='text-[2.5rem] font-medium text-sky-600'>TCloud login</p>
      <p className='text-xl font-medium text-slate-600'>
        Let's use your account to unbox your data!
      </p>
    </div>
  )
}

export default LoginHeader
