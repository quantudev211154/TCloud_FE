import { ReactNode } from 'react'
import { Link } from 'react-router-dom'
import { useMenuContext } from '../../../context/menu.context'
import { MenuItemEnum } from '../../../types/enums/menu-items.enum'

type Props = {
  path: string
  label: string
  menuItemIndex: MenuItemEnum
  icon?: ReactNode
  className?: string
  onClickMenuItem?: Function
}

const MenuItem = ({
  path,
  icon,
  menuItemIndex,
  label,
  className,
  onClickMenuItem,
}: Props) => {
  const { selectedItem, setSelectedItem } = useMenuContext()

  return (
    <Link to={path}>
      <div
        onClick={() => {
          setSelectedItem(menuItemIndex)
          if (!!onClickMenuItem) onClickMenuItem()
        }}
        className={`menu-item flex justify-start items-center cursor-pointer px-2 py-3 rounded-xl transition-all hover:bg-slate-200 ${className} ${
          menuItemIndex === selectedItem
            ? 'bg-blue-100 hover:bg-blue-100 text-sky-800'
            : ''
        }`}
      >
        <span className='text-xl'>{icon}</span>
        <span className='ml-5 font-medium'>{label}</span>
      </div>
    </Link>
  )
}

export default MenuItem
