import { useMutation } from '@tanstack/react-query'
import { useState } from 'react'
import { useNavigate } from 'react-router-dom'
import { useAuthContext } from '../../../context/auth.context'
import { useMenuContext } from '../../../context/menu.context'
import { MenuItemEnum } from '../../../types/enums/menu-items.enum'
import Button from '../../core/Button'
import UserAvatar from '../../core/UserAvatar'
import { logout as logoutOnServer } from '../../../apis/auth.api'

const UserInfo = () => {
  const { currentUser } = useAuthContext()
  const [isShowUserInfo, setShowUserInfo] = useState(false)
  const { logout } = useAuthContext()
  const { setSelectedItem } = useMenuContext()
  const navigate = useNavigate()
  const { mutate } = useMutation({
    mutationFn: async (userId: string) => await logoutOnServer(userId),
    onSuccess: () => {
      setSelectedItem(MenuItemEnum.MY_FILES)
      logout()
      navigate('/login')
    },
  })

  if (!currentUser) return <></>

  const onShowUserInfo = () => {
    setShowUserInfo(!isShowUserInfo)
  }

  const onLogout = async () => {
    mutate(currentUser.id)
  }

  return (
    <div className='flex-initial ml-5 relative'>
      <figure
        onClick={onShowUserInfo}
        className='rounded-full border-4 border-transparent transition-all cursor-pointer hover:border-sky-100'
      >
        <UserAvatar
          bgr={currentUser.avatar}
          name={currentUser.fullName}
          className='text-lg'
        />
      </figure>
      <div
        style={{
          boxShadow:
            'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
        }}
        className={`absolute min-w-[16rem] max-w-[25rem] bg-white right-0 top-full rounded-lg transition-all ${
          isShowUserInfo ? 'visible opacity-100' : 'invisible opacity-0'
        }`}
      >
        <div className='flex flex-col justify-center items-center px-10 py-5 border-b'>
          <UserAvatar
            bgr={currentUser.avatar}
            name={currentUser.fullName}
            className='w-20 h-20 text-3xl'
          />
          <p className='font-medium whitespace-nowrap mt-3 text-lg'>
            {currentUser.fullName}
          </p>
          <p className='text-slate-700'>{currentUser.phone}</p>
        </div>
        <div className='flex justify-center items-center px-10 py-5'>
          <Button
            onClick={onLogout}
            className='px-10 bg-transparent border border-slate-700 border-solid text-slate-600 hover:bg-gray-300 hover:border-transparent hover:text-slate-800'
          >
            <span>Log out</span>
          </Button>
        </div>
      </div>
    </div>
  )
}

export default UserInfo
