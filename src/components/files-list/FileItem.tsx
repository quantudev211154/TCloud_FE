import { convertISODateToDayMonthYearFormat } from '../../../../server/src/utils/date.util'
import { useFileMenuContext } from '../../context/file-menu-context.context'
import { PostType } from '../../types/post.type'
import { calContextMenuPos } from '../../utils/menu-context.util'

type Props = {
  item: PostType
}

const FileItem = ({ item }: Props) => {
  const {
    setCurrentPost,
    setCurrentPosition,
    setOverflowState,
    setInBackgroundPost,
    currentPost,
  } = useFileMenuContext()

  const onOpenContextMenu = (
    event: React.MouseEvent<HTMLDivElement, MouseEvent>
  ) => {
    event.preventDefault()

    const pageX = event.pageX
    const pageY = event.pageY

    calContextMenuPos(pageX, pageY, setCurrentPosition, setOverflowState)
    setCurrentPost(item)
    setInBackgroundPost(item)
  }

  return (
    <tr
      onContextMenu={onOpenContextMenu}
      className={` ${
        currentPost && currentPost.id === item.id ? 'bg-slate-200' : ''
      }`}
    >
      <td
        title={item.fileName}
        className='py-3 max-w-[20rem] md:max-w-none whitespace-nowrap overflow-hidden text-ellipsis break-all'
      >
        {item.fileName}
      </td>
      <td>{item.fileSize}</td>
      <td>{convertISODateToDayMonthYearFormat(item.createdAt)}</td>
    </tr>
  )
}

export default FileItem
