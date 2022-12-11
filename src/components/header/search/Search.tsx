import Input from '../../core/Input'
import { BiSearch } from 'react-icons/bi'

const Search = () => {
  return (
    <div className='flex-1 relative'>
      <span className='absolute text-2xl text-slate-600 left-2 top-1/2 transform -translate-y-1/2 z-30'>
        <BiSearch />
      </span>
      <Input
        className='w-full md:w-3/4 border-slate-200 bg-slate-100 pl-10 focus:bg-white focus:border-sky-600'
        placeholder='Find your files...'
      />
    </div>
  )
}

export default Search
