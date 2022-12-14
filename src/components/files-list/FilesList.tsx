import { PostType } from '../../types/post.type'
import FileListHeader from '../file-list-header/FileListHeader'
import FileItem from './FileItem'

type Props = {
  postsList: PostType[]
}

const FilesList = ({ postsList }: Props) => {
  return (
    <div className='h-full overflow-y-auto'>
      <table className='w-full flex-1 text-left'>
        <thead className='sticky top-0'>
          <FileListHeader />
        </thead>
        <tbody className='overflow-y-scroll'>
          {postsList.map((item) => (
            <FileItem key={item.id} item={item} />
          ))}
        </tbody>
      </table>
      {postsList.length === 0 ? (
        <p className='py-10 text-center italic font-medium'>
          Nothing to show. Let's store some your files.
        </p>
      ) : (
        <></>
      )}
    </div>
  )
}

export default FilesList
