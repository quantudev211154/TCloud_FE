const LoadingAuth = () => {
  return (
    <div className='loading-auth w-screen h-screen bg-cyan-600 flex justify-center items-center'>
      <div className='w-5/6 sm:w-3/4 md:w-1/2 text-center'>
        <span className='text-3xl text-white font-medium'>
          Wait TCloud some seconds to check your authentication...
        </span>
      </div>
    </div>
  )
}

export default LoadingAuth
