import MenuItem from './MenuItem'
import { BiFolder, BiStar, BiTrashAlt, BiExit } from 'react-icons/bi'
import { MenuItemEnum } from '../../../types/enums/menu-items.enum'

const Menu = () => {
  return (
    <div className='menu flex flex-col justify-start'>
      <MenuItem
        path='/'
        menuItemIndex={MenuItemEnum.MY_FILES}
        label='My files'
        icon={<BiFolder />}
      />
      <MenuItem
        path='/favorite-files'
        menuItemIndex={MenuItemEnum.FAVORITE}
        label='Favorite'
        icon={<BiStar />}
      />
      <MenuItem
        path='/recycle-bin-files'
        menuItemIndex={MenuItemEnum.RECYCLE_BIN}
        label='Recycle Bin'
        icon={<BiTrashAlt />}
      />
    </div>
  )
}

export default Menu
