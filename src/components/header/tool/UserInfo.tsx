import { useAuthContext } from '../../../context/auth.context'
import UserAvatar from '../../core/UserAvatar'

const UserInfo = () => {
  const { currentUser } = useAuthContext()
  return (
    <div className='flex-initial ml-5'>
      {currentUser ? (
        <UserAvatar bgr={currentUser.avatar} name={currentUser.fullName} />
      ) : (
        <></>
      )}
    </div>
  )
}

export default UserInfo
