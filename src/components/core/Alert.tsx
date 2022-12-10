import React from 'react'

type Props = {
  title: string
  className?: string
  error?: boolean
  ref?: React.LegacyRef<HTMLParagraphElement> | undefined
}

const Alert = ({ title, className, error, ref }: Props) => {
  return (
    <p
      ref={ref}
      className={`transition-all ${error ? 'text-rose-600' : ''} ${className}`}
    >
      {title}
    </p>
  )
}

export default Alert
