import { useQuery } from '@tanstack/react-query'
import { useEffect } from 'react'
import { getPosts } from '../../../apis/post.api'
import { useAuthContext } from '../../../context/auth.context'
import FilesList from '../../files-list/FilesList'

const MyFiles = () => {
  const { currentUser } = useAuthContext()
  const { data, isSuccess } = useQuery({
    queryKey: ['posts', currentUser],
    queryFn: () => getPosts(currentUser?.id),
  })

  useEffect(() => {
    if (currentUser) {
      document.title = `Hi! ${currentUser.fullName}`
    }
  }, [])

  if (isSuccess) {
    return (
      <div className='overflow-hidden h-full'>
        <FilesList postsList={data.data.posts} />
      </div>
    )
  }

  return <div></div>
}

export default MyFiles
