import { ReactNode } from 'react'

type Props = {
  icon: ReactNode
  label: string
  handleClick: React.MouseEventHandler<HTMLDivElement> | undefined
  isDanger?: boolean
}

const FileMenuContextItem = ({ icon, label, handleClick, isDanger }: Props) => {
  return (
    <div
      className={`w-full flex justify-start items-center cursor-pointer p-3 rounded-lg hover:bg-slate-200 ${
        isDanger ? 'text-red-600' : ''
      }`}
      onClick={handleClick}
    >
      <span className='text-2xl'>{icon}</span>
      <span className='ml-3'>{label}</span>
    </div>
  )
}

export default FileMenuContextItem
