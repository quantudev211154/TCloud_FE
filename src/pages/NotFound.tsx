import NotFoundBgr from '../assets/NotFoundBgr.png'
import { Link } from 'react-router-dom'
import Button from '../components/core/Button'

const NotFound = () => {
  return (
    <div className='relative w-full h-screen'>
      <figure className='w-full h-full'>
        <img
          src={NotFoundBgr}
          className='w-full h-full object-cover'
          alt='Không tìm thấy trang này.'
        />
      </figure>
      <div className='w-5/6 sm:w-3/4 md:w-1/3 absolute bottom-[12%] left-1/2 transform -translate-x-1/2 text-center'>
        <p className='text-[2rem] font-semibold'>Oh sheeet, my human.</p>
        <p className='text-3xl font-semibold mt-2'>Are you losing your way?</p>
        <p className='text-xl mt-2'>Tcloud can not find your target page.</p>
        <Link to='/'>
          <Button className='py-4 mt-3'>
            <span className='text-lg'>Back to dashboard</span>
          </Button>
        </Link>
      </div>
    </div>
  )
}

export default NotFound
