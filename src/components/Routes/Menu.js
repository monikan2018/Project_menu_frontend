import React, { Component } from 'react'
import { Link, Redirect } from 'react-router-dom'
import Layout from './Layout'
import messages from '../AutoDismissAlert/messages'
import { show } from '../../api/menu'
import apiUrl from '../../apiConfig'
import axios from 'axios'


class Menu extends Component {
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
    const { user, msgAlert } = this.props
    show(this.props.match.params.id, user)
      .then(res => this.setState({ menu: res.data.menu }))
      .then(() => msgAlert({
        heading: 'Here you go!',
        message: messages.menuShowSuccess,
        variant: 'success'
      }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t seem to find that. ' + error.message,
          message: messages.menuShowFailure,
          variant: 'danger'
        })
      })
  }



    return (
      <Layout>
        <h4>{item.name}</h4>
        <p>Item: {item.name}</p>
        <p>Quantity: {item.quantity}</p>
        <p>Price: {item.price}</p>
        <button onClick={this.destroyItem}>Delete Item</button>
        {/* Add a link to the edit item route when you click the edit button */}
        <Link to={`/items/${this.props.match.params.id}/edit`}>
          <button>Edit</button>
        </Link>
        <Link to='/items'>Back to all items</Link>
      </Layout>
    )
  }
}

export default Menu
