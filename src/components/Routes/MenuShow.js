import React, { Component } from 'react'
import { Link, Redirect, withRouter } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Layout from './Layout'
import MenuDelete from './MenuDelete.js'
import MenuEdit from './MenuEdit.js'
import { index, show } from '../../api/menu'
import apiUrl from '../../apiConfig'

class MenuShow extends Component {
  constructor () {
    super()
    this.state = {
      menu: []
    }
  }
  // handleChange = event => setState({
  //   [event.target.name]: event.target.value
  // })
  componentDidMount () {
    const { user, msgAlert } = this.props
    index(this.state, user)
      .then(res => this.setState({ menu: res.data.menu }))
      .then(() => msgAlert({
        heading: 'Here\'s your entire inventory!',
        message: messages.itemIndexSuccess,
        variant: 'success'
      }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t see your inventory.' + error.message,
          message: messages.itemIndexFailure,
          variant: 'danger'
        })
      })
  }

  render () {
  // const { name, quantity, price } = this.state
    const items = this.state.items.map(item => (
      <tr key={item._id}>
        <td><Link to={`/items/${item._id}`}>{item.name}</Link></td>
        <td><QRImage
          height={60} width={60}
          text = {`${item.name}  qty: ${item.quantity} price: ${item.price}`}/></td>
      </tr>
    ))
    return (
      <Layout>
        <table>
          <tbody>
            <tr>
              <th scope="col">Items</th>
              <th scope="col">QRCode</th>
            </tr>
            {items}
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default withRouter(Items)
