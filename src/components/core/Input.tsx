import { forwardRef } from 'react'

type Props = {
  autoFocus?: boolean
  name?: string
  placeholder?: string
  value?: string
  type?: React.HTMLInputTypeAttribute
  className?: string
  error?: boolean
  onChange?: React.ChangeEventHandler<HTMLInputElement> | undefined
}

const Input = forwardRef<HTMLInputElement, Props>(
  (
    {
      autoFocus,
      name,
      placeholder,
      value,
      type,
      className,
      error,
      onChange,
    }: Props,
    ref
  ) => {
    return (
      <div className='relative'>
        <input
          autoFocus={!!autoFocus ? autoFocus : false}
          ref={ref}
          name={name}
          value={value}
          onChange={onChange}
          type={!!type ? type : 'text'}
          placeholder={placeholder}
          className={`outline-none transition-all rounded-xl border-[1.5px] p-3 ${className} ${
            error
              ? 'border-rose-500 hover:border-rose-500 focus:border-rose-500 text-rose-500'
              : 'border-gray-500 hover:border-sky-400 focus:border-sky-500'
          }`}
        />
      </div>
    )
  }
)

export default Input
