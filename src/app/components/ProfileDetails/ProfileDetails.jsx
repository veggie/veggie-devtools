import './ProfileDetails.css'
import React from 'react'

export default function ProfileDetails (props) {
  return (
    <div className="Profile-details">
      <h1>
        Profile
        {props.is_current &&
          <span className="Content-info">CURRENT</span>
        }
      </h1>
      <p>Name: {props.profile.name}</p>
      <p>Require path: {props.profile.requirePath}</p>
      {props.profile.data &&
        <pre className="Profile-details--json">
          {JSON.stringify(props.profile.data, null, 2)}
        </pre>
      }
    </div>
  )
}
