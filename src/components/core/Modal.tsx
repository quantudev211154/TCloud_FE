import React, { ReactNode, useEffect, useRef } from 'react'

type Props = {
  open: boolean
  children: ReactNode
  className?: string
  onClose?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Modal = ({ open, onClose, className, children }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`modal z-50 overflow-y-auto fixed top-0 left-0 w-[100vw] h-[100vh] transition-all bg-black bg-opacity-25 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      } ${className}`}
    >
      {children}
    </div>
  )
}

export default Modal
