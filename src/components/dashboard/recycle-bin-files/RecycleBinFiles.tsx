import { useEffect } from 'react'
import { useAuthContext } from '../../../context/auth.context'

type Props = {}

const RecycleBinFiles = (props: Props) => {
  const { currentUser } = useAuthContext()

  useEffect(() => {
    if (currentUser) {
      document.title = `Hi! ${currentUser.fullName}`
    }
  }, [])

  return <div>RecycleBinFiles</div>
}

export default RecycleBinFiles
