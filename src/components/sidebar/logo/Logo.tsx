import { Link } from 'react-router-dom'
import ViteLogo from '../../../assets/vite-logo.png'
import { useMenuContext } from '../../../context/menu.context'
import { MenuItemEnum } from '../../../types/enums/menu-items.enum'
import Tooltip from '../../core/Tooltip'

const Logo = () => {
  const { setSelectedItem } = useMenuContext()

  return (
    <div className='logo max-h-[11vh]'>
      <Link
        to='/'
        onClick={() => {
          setSelectedItem(MenuItemEnum.MY_FILES)
        }}
      >
        <Tooltip title='Back to dashboard' placement='right'>
          <figure className='h-full'>
            <img src={ViteLogo} className='h-full object-cover' />
          </figure>
        </Tooltip>
      </Link>
    </div>
  )
}

export default Logo
