import { MenuItemEnum } from '../types/enums/menu-items.enum'
import { createContext, useContext, ReactNode, useState } from 'react'

type MenuContextType = {
  selectedItem: MenuItemEnum
  setSelectedItem: React.Dispatch<React.SetStateAction<MenuItemEnum>>
}

const initValue: MenuContextType = {
  selectedItem: MenuItemEnum.MY_FILES,
  setSelectedItem: () => {},
}

const MenuContext = createContext<MenuContextType>(initValue)

export const useMenuContext = () => useContext(MenuContext)

const MenuContextProvider = ({ children }: { children: ReactNode }) => {
  const [selectedItem, setSelectedItem] = useState(MenuItemEnum.MY_FILES)

  const menuContextData = {
    selectedItem,
    setSelectedItem,
  }

  return (
    <MenuContext.Provider value={menuContextData}>
      {children}
    </MenuContext.Provider>
  )
}

export default MenuContextProvider
