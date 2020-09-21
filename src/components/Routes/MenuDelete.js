import React, { Component } from 'react'
import { Redirect, withRouter } from 'react-router-dom'
// import Layout from './Layout'
import messages from '../AutoDismissAlert/messages'
import { menuDelete } from '../../api/menu'

class MenuDelete extends Component {
  constructor (props) {
    // this makes sure that `this.props` is set in the constructor
    super(props)
    this.state = {
      // Initially, our item state will be null, until the API request finishes
      menu: null,
      // initially this item has not been deleted yet
      deleted: false
    }
  }
  componentDidMount () {
    const { msgAlert, user } = this.props
    //  const { menu, deleted } = this.state
    menuDelete(this.props.match.params.id, user)
      .then(() => msgAlert({
        heading: 'Day from Menu Removed',
        message: messages.menuDeleteSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ deleted: true }))
      .catch(console.error)
      .catch(error => {
        msgAlert({
          heading: 'Failed to remove item.' + error.message,
          message: messages.menuDeleteFailure,
          variant: 'danger'
        })
      })
  }
  render () {
    if (this.state.deleted) {
      return <Redirect to={{
        // Redirect to the home page ('/')
        pathname: '/menu/'
      }} />
    } else {
      return null
    }
  }
}

export default withRouter(MenuDelete)
