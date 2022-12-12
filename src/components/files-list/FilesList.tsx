import { PostType } from '../../types/post.type'
import FileListHeader from '../file-list-header/FileListHeader'
import { convertISODateToDayMonthYearFormat } from './../../../../server/src/utils/date.util'

type Props = {
  postsList: PostType[]
}

const FilesList = ({ postsList }: Props) => {
  return (
    <table className='w-full flex-1 overflow-hidden overflow-y-auto'>
      <thead>
        <FileListHeader />
      </thead>
      <tbody>
        {postsList.map((item, index) => (
          <tr key={item.id}>
            <td className='py-3'>{index + 1}</td>
            <td
              title={item.fileName}
              className='max-w-[20rem] md:max-w-none whitespace-nowrap overflow-hidden text-ellipsis break-all'
            >
              {item.fileName}
            </td>
            <td>{convertISODateToDayMonthYearFormat(item.createdAt)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  )
}

export default FilesList
