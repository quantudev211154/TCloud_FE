import { ReactNode, useEffect, useRef } from 'react'

type Props = {
  children: ReactNode
  title: string
  placement?: 'top' | 'left' | 'bottom' | 'right'
}

const Tooltip = ({ title, children, placement = 'bottom' }: Props) => {
  const ref = useRef<HTMLSpanElement>(null)

  useEffect(() => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.visibility = 'hidden'
    }
  }, [])

  const onMouseOver = () => {
    if (ref.current) {
      ref.current.style.opacity = '1'
      ref.current.style.visibility = 'visible'
    }
  }

  const onMouseLeave = () => {
    if (ref.current) {
      ref.current.style.opacity = '0'
      ref.current.style.visibility = 'hidden'
    }
  }

  return (
    <div className='relative inline-block h-full z-10'>
      <span
        ref={ref}
        className={`z-50 w-max h-max text-sm text-white font-medium pointer-events-none px-3 py-2 bg-gray-400 rounded-lg transition-all transform absolute -bottom-2 
        ${placement === 'top' ? 'left-1/2 -top-10 -translate-x-1/2' : ''} 
        ${placement === 'bottom' ? 'left-1/2 -bottom-10  -translate-x-1/2' : ''}
        ${placement === 'left' ? '-left-[110%] top-1/2 -translate-y-1/2' : ''}
        ${placement === 'right' ? 'left-[110%] top-1/2 -translate-y-1/2' : ''}
        `}
      >
        {title}
      </span>
      <div
        className='w-full h-full z-10'
        onMouseOver={onMouseOver}
        onMouseLeave={onMouseLeave}
      >
        {children}
      </div>
    </div>
  )
}

export default Tooltip
