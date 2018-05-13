import './VeggiePopup.css'
import ProfileDetails from '../ProfileDetails/ProfileDetails.jsx'
import * as veggieApi from 'veggie'
import React from 'react'

export default class VeggiePopup extends React.Component {
  constructor (props) {
    super(props)
    this.state = {
      order: {
        alpha: true,
        last: false
      },
      selectedId: null
    }

    this.select = this.select.bind(this)
    this.clickBack = this.clickBack.bind(this)
    this.clickReset = this.clickReset.bind(this)
    this.loadProfile = this.loadProfile.bind(this)
  }

  select (id) {
    if (this.state.selectedId === id) {
      this.setState({ selectedId: null })
    } else {
      this.setState({ selectedId: id })
    }
  }

  clickBack () {
    this.setState({ selectedId: null })
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

  render () {
    let section

    if (this.props.status.fetching) {
      section = 'Loading...'
    }
    
    if (this.props.status.error) {
      section = (
        <div>
          <button onClick={this.props.getData}>Try again</button>
          {this.props.status.errorMessage}
        </div>
      )
    }
    
    if (this.props.status.ok) {
      if (this.state.selectedId) {
        section = (
          <div className="Detail">
            <button onClick={this.clickBack}>Back</button>
            <ProfileDetails profile={this.props.profilesById[this.state.selectedId]} is_current={this.props.currentProfile === this.state.selectedId} load={this.loadProfile} />
          </div>
        )
      } else {
        section = (
          <div>
            <button onClick={this.clickReset}>Reset</button>
            <ul>
              {this.props.profileIds.map(id =>
                <li className="Selectable-list-item" onClick={this.select.bind(this, id)} key={id}>
                  {this.props.profilesById[id].name}
                  {this.props.currentProfile === id ? <span className="Content-right">CURRENT</span> : ''}
                </li>
              )}
            </ul>
          </div>
        )
      }
    }

    return (
      <div className='Popup'>
        <h1>Veggie Dev Tools</h1>
        <section>{section}</section>
      </div>
    )
  }
}
