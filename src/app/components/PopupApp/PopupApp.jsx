import './PopupApp.css'
import Header from '../Header/Header.jsx'
import ProfileDetails from '../ProfileDetails/ProfileDetails.jsx'
import * as veggieApi from 'veggie'
import React from 'react'

export default class PopupApp extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      order: {
        alpha: true,
        last: false
      },
      viewProfileId: null
    }

    this.select = this.select.bind(this)
    this.clickBack = this.clickBack.bind(this)
    this.clickReset = this.clickReset.bind(this)
    this.loadProfile = this.loadProfile.bind(this)
    this.loadCurrentProfile = this.loadCurrentProfile.bind(this)
  }

  select (id, event) {
    event.preventDefault()
    event.stopPropagation()
    if (this.state.viewProfileId === id) {
      this.setState({ viewProfileId: null })
    } else {
      this.setState({ viewProfileId: id })
    }
  }

  clickBack () {
    this.setState({ viewProfileId: null })
  }

  async clickReset () {
    await veggieApi._resetProfile()
    this.props.getData()
  }

  async loadProfile (id) {
    const payload = { id }
    await veggieApi._loadProfile({ payload })
    this.props.getData()
  }

  loadCurrentProfile () {
    return this.loadProfile(this.state.viewProfileId)
  }

  render () {
    let header, section

    if (this.props.status.fetching) {
      header = <Header headerText="Veggie"/>
      section = 'Loading...'
    }
    
    if (this.props.status.error) {
      header = (
        <Header
          headerText="Veggie"
          primaryActionText="Try again"
          primaryAction={this.props.getData}
        />
      )

      section = this.props.status.errorMessage
    }

    if (this.props.status.ok) {
      if (this.state.viewProfileId) {
        header = (
          <Header
            primaryActionText="Back"
            primaryAction={this.clickBack}
            secondaryActionText="Load"
            secondaryAction={this.loadCurrentProfile}
          />
        )

        section = (
          <ProfileDetails
            profile={this.props.profilesById[this.state.viewProfileId]}
            isCurrent={this.props.currentProfile === this.state.viewProfileId}
          />
        )
      } else {
        header = (
          <Header
            headerText="Veggie"
            primaryActionText="Reset"
            primaryAction={this.clickReset}
          />
        )

        section = (
          <div>
            <h2>Current Profiles</h2>
            <ul className="Profile-list">
              {this.props.profileIds.map(id =>           
                <li key={id}
                  onClick={this.loadProfile.bind(this, id)}
                  className={`List-item--selectable ${this.props.currentProfile === id ? 'is-current' : ''}`}
                >
                  {this.props.profilesById[id].name}
                  <a href="#" className="List-itemDetails Button Button--secondary" onClick={this.select.bind(this, id)}>Details</a>
                </li>
              )}
            </ul>
          </div>
        )
      }
    }

    return (
      <div className="Popup">
        {header}
        <section className="Popup-section">
          {section}
        </section>
      </div>
    )
  }
}
