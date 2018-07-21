import React from 'react'

export default function HeaderActions (props) {
  return (
    <header className="Popup-header">
      {props.headerText && <h1>{props.headerText}</h1>}
      <div className="Popup-accessory">
        <button className="Button Button--primary"
          onClick={props.primaryAction}>
          {props.primaryActionText}
        </button>
        {props.secondaryAction &&
          <button className="Button Button--secondary Content-right"
            onClick={props.secondaryAction}>
            {props.secondaryActionText}
          </button>
        }
      </div>
    </header>
  )
}
