import { useEffect } from 'react'
import { useAuthContext } from '../../context/auth.context'

const Main = () => {
  const { currentUser } = useAuthContext()

  useEffect(() => {
    if (currentUser) {
      document.title = `Hi! ${currentUser.fullName}`
    }
  }, [])

  return <div className='flex-1 w-full'>Main</div>
}

export default Main
