import React, { ReactNode, useEffect, useRef } from 'react'

type Props = {
  open: boolean
  children: ReactNode
  onClose?: React.MouseEventHandler<HTMLDivElement> | undefined
}

const Modal = ({ open, onClose, children }: Props) => {
  return (
    <div
      onClick={onClose}
      className={`z-50 overflow-y-auto fixed top-0 left-0 w-[100vw] h-[100vh] transition-all bg-black bg-opacity-25 ${
        open ? 'visible opacity-100' : 'invisible opacity-0'
      }`}
    >
      {children}
    </div>
  )
}

export default Modal
