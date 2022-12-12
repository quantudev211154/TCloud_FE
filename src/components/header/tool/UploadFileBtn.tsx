import { AiOutlineFileAdd } from 'react-icons/ai'
import FirebaseService from '../../../services/firebase'
import { useMutation, useQueryClient } from '@tanstack/react-query'
import { AddPostType } from '../../../types/post.type'
import { addPost } from '../../../apis/post.api'
import { useAuthContext } from '../../../context/auth.context'

const UploadFileBtn = () => {
  const { currentUser } = useAuthContext()
  const queryClient = useQueryClient()

  const { mutate } = useMutation({
    mutationFn: (data: AddPostType) => addPost(data),
    onSuccess: (data) => {
      queryClient.setQueryData(['posts', currentUser], (oldData: any) =>
        oldData
          ? {
              ...oldData,
              data: {
                ...oldData.data,
                posts: [...oldData.data.posts, data.data.newPost],
              },
            }
          : oldData
      )
    },
  })

  const onUploadFileSuccess = (data: AddPostType) => {
    mutate(data)
  }

  const onInputFileChange = (event: React.ChangeEvent<HTMLInputElement>) => {
    if (currentUser) {
      const files = event.target.files

      if (files) {
        for (let i = 0; i < files.length; ++i) {
          FirebaseService.uploadFile(
            currentUser.id,
            files[i],
            onUploadFileSuccess
          )
        }
      }

      event.target.value = ''
    }
  }

  return (
    <label
      className='font-medium ml-3 flex justify-between items-center px-5 py-2 cursor-pointer rounded-2xl border border-sky-600 text-sky-600 transition-all hover:text-sky-700'
      htmlFor='upload-file'
    >
      <span className='text-2xl'>
        <AiOutlineFileAdd />
      </span>
      <span className='ml-3'>Upload new file</span>
      <input
        onChange={onInputFileChange}
        multiple
        id='upload-file'
        type='file'
        className='hidden'
      />
    </label>
  )
}

export default UploadFileBtn
