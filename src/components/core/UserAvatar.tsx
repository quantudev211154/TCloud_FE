const createAvatarName = (name: string) => {
  let hashed = name.split(' ')

  return hashed[0][0]
}

type Props = {
  bgr: string
  name?: string
  className?: string
}

const UserAvatar = ({ bgr, name, className }: Props) => {
  return (
    <figure
      style={bgr.startsWith('#') ? { backgroundColor: bgr } : {}}
      className={`cursor-pointer w-10 h-10 rounded-full flex justify-center items-center z-50 ${
        className ? className : ''
      }`}
    >
      {bgr.startsWith('#') ? (
        <span className='text-white font-semibold text-lg'>
          {name ? createAvatarName(name) : ''}
        </span>
      ) : (
        <img src={bgr} className='w-full h-full object-cover' />
      )}
    </figure>
  )
}

export default UserAvatar
