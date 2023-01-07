import { createContext, ReactNode, useContext, useState } from 'react'

type OverlaysContextType = {
  isOpenPreviewFileOverlay: boolean
  setIsOpenPreviewFileOverlay: React.Dispatch<React.SetStateAction<boolean>>
}

const initValue: OverlaysContextType = {
  isOpenPreviewFileOverlay: false,
  setIsOpenPreviewFileOverlay: () => {},
}

const OverlaysContext = createContext<OverlaysContextType>(initValue)

export const useOverlaysContext = () => useContext(OverlaysContext)

const OverlaysContextProvider = ({ children }: { children: ReactNode }) => {
  const [isOpenPreviewFileOverlay, setIsOpenPreviewFileOverlay] =
    useState(false)

  const overlaysContextData = {
    isOpenPreviewFileOverlay,
    setIsOpenPreviewFileOverlay,
  }

  return (
    <OverlaysContext.Provider value={overlaysContextData}>
      {children}
    </OverlaysContext.Provider>
  )
}

export default OverlaysContextProvider
