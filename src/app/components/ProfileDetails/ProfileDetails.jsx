import React from 'react'
import './ProfileDetails.css'

export default function ProfileDetails (props) {
  return (
    <div className="Profile-details">
      <h1>Profile</h1>
      <p>Name: {props.profile.name}</p>
      {props.is_current ? <p>CURRENT</p> : ''}
      <p>Require path: {props.profile.requirePath}</p>
      {props.profile.data ? <pre className="Profile-details--json">{JSON.stringify(props.profile.data, null, 2)}</pre> : ''}
    </div>
  )
}
