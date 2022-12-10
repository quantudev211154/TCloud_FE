import { ReactNode } from 'react'

type Props = {
  children: ReactNode
  ref?: React.LegacyRef<HTMLButtonElement> | undefined
  className?: string
  onClick?: React.MouseEventHandler<HTMLButtonElement> | undefined
  type?: 'button' | 'submit'
}

const Button = ({ children, ref, className, onClick, type }: Props) => {
  return (
    <button
      ref={ref}
      type={!!type ? type : 'button'}
      onClick={onClick}
      className={`transition-all w-full py-2 rounded-lg font-medium text-white border border-transparent border-dashed bg-blue-600 hover:bg-blue-700 focus:bg-white focus:text-black focus:border-black ${className}`}
    >
      {children}
    </button>
  )
}

export default Button
