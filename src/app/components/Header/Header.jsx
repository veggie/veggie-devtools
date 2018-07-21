import './Header.css'
import React from 'react'

export default function Header (props) {
  return (
    <header className="Header">
      {props.headerText &&
        <h1>{props.headerText}</h1>
      }
      {props.primaryAction &&
        <button className="Button Button--primary"
          onClick={props.primaryAction}>
          {props.primaryActionText}
        </button>
      }
      {props.secondaryAction &&
        <button className="Button Button--secondary"
          onClick={props.secondaryAction}>
          {props.secondaryActionText}
        </button>
      }
    </header>
  )
}
