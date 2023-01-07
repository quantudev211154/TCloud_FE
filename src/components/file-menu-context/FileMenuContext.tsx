import { useFileMenuContext } from '../../context/file-menu-context.context'
import FileMenuContextItem from './FileMenuContextItem'
import { BiBookOpen, BiDownArrowAlt, BiTrashAlt } from 'react-icons/bi'
import {
  calTransformStyleForContextMenu,
  downloadPosts,
} from '../../utils/menu-context.util'
import { useOverlaysContext } from '../../context/overlays.context'

const FileMenuContext = () => {
  const { currentPosition, currentPost, overflowState } = useFileMenuContext()
  const { setIsOpenPreviewFileOverlay } = useOverlaysContext()

  const onPreviewFile = () => {
    if (currentPost) {
      setIsOpenPreviewFileOverlay(true)
    }
  }

  const onDownLoadPost = () => {
    if (currentPost) downloadPosts([currentPost])
  }

  return (
    <div
      style={{
        left: currentPosition.currentPageX,
        top: currentPosition.currentPageY,
        transform: calTransformStyleForContextMenu(
          overflowState.isOverflowX,
          overflowState.isOverflowY
        ),
        boxShadow:
          'rgba(60, 64, 67, 0.3) 0px 1px 2px 0px, rgba(60, 64, 67, 0.15) 0px 2px 6px 2px',
      }}
      className={`absolute z-50 p-1 flex flex-col justify-start items-start min-w-[12rem] bg-white rounded-md ${
        currentPost ? `visible opacity-100` : 'invisible opacity-0 left-0 top-0'
      }`}
    >
      <FileMenuContextItem
        icon={<BiBookOpen />}
        label='Preview'
        handleClick={() => {
          onPreviewFile()
        }}
      />
      <FileMenuContextItem
        icon={<BiDownArrowAlt />}
        label='Download'
        handleClick={() => {
          onDownLoadPost()
        }}
      />
      <FileMenuContextItem
        icon={<BiTrashAlt />}
        label='Delete'
        handleClick={() => {}}
        isDanger
      />
    </div>
  )
}

export default FileMenuContext
