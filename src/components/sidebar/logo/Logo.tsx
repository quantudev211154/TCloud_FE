import { Link } from 'react-router-dom'
import ViteLogo from '../../../assets/vite-logo.png'
import Tooltip from '../../core/Tooltip'

const Logo = () => {
  return (
    <div className='logo max-h-[11vh]'>
      <Link to='/'>
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
