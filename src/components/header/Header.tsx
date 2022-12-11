import Search from './search/Search'
import Tool from './tool/Tool'
const Header = () => {
  return (
    <div className='flex-initial flex justify-between items-center w-full px-3 min-h-[11vh]'>
      <Search />
      <Tool />
    </div>
  )
}

export default Header
