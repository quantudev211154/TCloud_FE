import React, { useEffect } from 'react'
import { useAuthContext } from '../../../context/auth.context'

type Props = {}

const FavoriteFiles = (props: Props) => {
  const { currentUser } = useAuthContext()

  useEffect(() => {
    if (currentUser) {
      document.title = `Hi! ${currentUser.fullName}`
    }
  }, [])
  return <div>FavoriteFiles</div>
}

export default FavoriteFiles
