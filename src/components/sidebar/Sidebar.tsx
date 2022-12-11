import Logo from './logo/Logo'
import Menu from './menu/Menu'

const Sidebar = () => {
  return (
    <div className='flex-initial flex flex-col justify-start w-1/5 md:w-1/6 px-1 md:px-3'>
      <Logo />
      <Menu />
    </div>
  )
}

export default Sidebar
