import React from 'react'
import { useParams } from 'react-router-dom'

const Profile = () => {
  const { playerName } = useParams()
  return (
    <div>Profile {playerName}</div>
  )
}

export default Profile