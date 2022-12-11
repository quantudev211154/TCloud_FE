import { BiFile } from 'react-icons/bi'
import { useState } from 'react'
import FirebaseService from '../../../services/firebase'
import { useMutation } from '@tanstack/react-query'
import { AddPostType } from '../../../types/post.type'
import { addPost } from '../../../apis/post.api'
import { useAuthContext } from '../../../context/auth.context'

const UploadFileBtn = () => {
  const { currentUser } = useAuthContext()
  const [uploadFiles, setUploadFiles] = useState<FileList | null>(null)

  const { mutate } = useMutation({
    mutationFn: async (data: AddPostType) => await addPost(data),
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
        <BiFile />
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
