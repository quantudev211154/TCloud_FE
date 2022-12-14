import { PostType } from '../types/post.type'
import { createContext, useContext, ReactNode, useState } from 'react'

type MenuContextPositionType = {
  currentPageX: number
  currentPageY: number
}

type OverflowStateType = {
  isOverflowY: boolean
  isOverflowX: boolean
}

type FileMenuContextType = {
  currentPost: PostType | undefined
  setCurrentPost: React.Dispatch<React.SetStateAction<PostType | undefined>>
  currentPosition: MenuContextPositionType
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<MenuContextPositionType>
  >
  overflowState: OverflowStateType
  setOverflowState: React.Dispatch<React.SetStateAction<OverflowStateType>>
}

const initValue: FileMenuContextType = {
  currentPost: undefined,
  setCurrentPost: () => {},
  currentPosition: {
    currentPageX: 0,
    currentPageY: 0,
  },
  setCurrentPosition: () => {},
  overflowState: {
    isOverflowX: false,
    isOverflowY: false,
  },
  setOverflowState: () => {},
}

const FileMenuContext = createContext<FileMenuContextType>(initValue)

export const useFileMenuContext = () => useContext(FileMenuContext)

const FileMenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [currentPost, setCurrentPost] = useState<PostType | undefined>(
    undefined
  )
  const [currentPosition, setCurrentPosition] =
    useState<MenuContextPositionType>({ currentPageX: 0, currentPageY: 0 })
  const [overflowState, setOverflowState] = useState<OverflowStateType>({
    isOverflowX: false,
    isOverflowY: false,
  })

  const fileMenuContextData = {
    currentPost,
    setCurrentPost,
    currentPosition,
    setCurrentPosition,
    overflowState,
    setOverflowState,
  }

  return (
    <FileMenuContext.Provider value={fileMenuContextData}>
      {children}
    </FileMenuContext.Provider>
  )
}

export default FileMenuContextProvider
