import JSZip from 'jszip'
import {
  MenuContextPositionType,
  OverflowStateType,
} from '../context/file-menu-context.context'
import { PostType } from '../types/post.type'

export const calContextMenuPos = (
  pageX: number,
  pageY: number,
  setCurrentPosition: React.Dispatch<
    React.SetStateAction<MenuContextPositionType>
  >,
  setOverflowState: React.Dispatch<React.SetStateAction<OverflowStateType>>
): void => {
  const safeHeight = Math.ceil((window.innerHeight / 5) * 3)
  const safeWidth = Math.ceil((window.innerWidth / 5) * 4)

  if (pageX > safeWidth && pageY > safeHeight) {
    setCurrentPosition({
      currentPageX: pageX,
      currentPageY: pageY,
    })
    setOverflowState({
      isOverflowX: true,
      isOverflowY: true,
    })
  } else if (pageX > safeWidth && pageY < safeHeight) {
    setCurrentPosition({
      currentPageX: pageX,
      currentPageY: pageY,
    })
    setOverflowState({
      isOverflowX: false,
      isOverflowY: true,
    })
  } else if (pageX < safeWidth && pageY > safeHeight) {
    setCurrentPosition({
      currentPageX: pageX,
      currentPageY: pageY,
    })
    setOverflowState({
      isOverflowX: true,
      isOverflowY: false,
    })
  } else if (pageX < safeWidth && pageY < safeHeight) {
    setCurrentPosition({
      currentPageX: pageX,
      currentPageY: pageY,
    })
    setOverflowState({
      isOverflowX: false,
      isOverflowY: false,
    })
  }
}

export const calTransformStyleForContextMenu = (
  isOverflowScreenHeight: boolean,
  isOverflowScreenWidth: boolean
): string => {
  let transform = 'translate'

  if (isOverflowScreenWidth && isOverflowScreenHeight)
    transform += '(-100%, -100%)'
  else if (isOverflowScreenWidth && !isOverflowScreenHeight)
    transform += '(-100%, 0)'
  else if (!isOverflowScreenWidth && isOverflowScreenHeight)
    transform += '(0%, -100%)'
  else if (!isOverflowScreenWidth && !isOverflowScreenHeight)
    transform += '(0, 0)'
  return transform
}

const downloadPostsAndCompressToZipFolder = async (postsList: PostType[]) => {
  let zip = new JSZip()

  for (let iterator of postsList) {
    const response = await fetch(iterator.fileUrl)
    const blob = await response.blob()

    zip.file(iterator.fileName, blob)
  }

  zip.generateAsync({ type: 'blob' }).then((content) => {
    let customUrl = window.URL.createObjectURL(content)
    let aTag = document.createElement('a')
    aTag.style.display = 'none'
    aTag.href = customUrl
    aTag.download = 'TCloud-' + new Date().getTime().toString()
    aTag.click()
    window.URL.revokeObjectURL(customUrl)
  })
}

export const downloadPosts = async (postsList: PostType[]) => {
  if (postsList.length === 1) {
    const response = await fetch(postsList[0].fileUrl)
    const blob = await response.blob()

    let customUrl = window.URL.createObjectURL(blob)
    let aTag = document.createElement('a')
    aTag.style.display = 'none'
    aTag.href = customUrl
    aTag.download = postsList[0].fileName
    aTag.click()
    window.URL.revokeObjectURL(customUrl)
  } else {
    downloadPostsAndCompressToZipFolder(postsList)
  }
}
