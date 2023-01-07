import { useFileMenuContext } from '../../context/file-menu-context.context'
import { useOverlaysContext } from '../../context/overlays.context'
import Modal from '../core/Modal'
import { BiX, BiDownArrowAlt } from 'react-icons/bi'
import { downloadPosts } from '../../utils/menu-context.util'

const PreviewFile = () => {
  const { isOpenPreviewFileOverlay, setIsOpenPreviewFileOverlay } =
    useOverlaysContext()
  const { inBackgroundPost, setInBackgroundPost } = useFileMenuContext()

  const onClosePreviewModal = () => {
    setIsOpenPreviewFileOverlay(false)
    setInBackgroundPost(undefined)
  }

  return (
    <Modal open={isOpenPreviewFileOverlay} onClose={onClosePreviewModal}>
      <>
        <div className='absolute right-0 top-0 py-2 pr-5'>
          <button
            onClick={() => {
              if (inBackgroundPost) downloadPosts([inBackgroundPost])
            }}
            className='p-1 mr-3 rounded-full bg-white hover:bg-slate-100'
          >
            <span className='text-3xl'>
              <BiDownArrowAlt />
            </span>
          </button>
          <button
            onClick={() => onClosePreviewModal()}
            className='p-1 rounded-full bg-white hover:bg-slate-100'
          >
            <span className='text-3xl'>
              <BiX />
            </span>
          </button>
        </div>
        <div className='absolute top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2'>
          <iframe
            className='absolute w-[90vw] md:w-[75vw] h-[95vh] top-1/2 left-1/2 transform -translate-x-1/2 -translate-y-1/2 rounded-2xl max-h-[90vh] shadow-2xl'
            frameBorder='0'
            src={`https://docs.google.com/gview?url=${inBackgroundPost?.fileUrl}&embedded=true`}
          ></iframe>
        </div>
      </>
    </Modal>
  )
}
export default PreviewFile
