import React, { Component } from 'react'
import { withRouter, Link } from 'react-router-dom'
import messages from '../AutoDismissAlert/messages'
import Layout from './Layout'
// import MenuDelete from './MenuDelete.js'
// import MenuEdit from './MenuEdit.js'
import { index } from '../../api/menu'

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
      .then(res => this.setState({ menu: res.data.menus }))
      .then(() => console.log(this.state))
      .then(() => msgAlert({
        heading: 'Here\'s weekly Menu!',
        message: messages.menuIndexSuccess,
        variant: 'success'
      }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t see weekly menu.' + error.message,
          message: messages.menuIndexFailure,
          variant: 'danger'
        })
      })
  }
  // onDelete () {
  //   event.preventDefault()
  //   const { msgAlert, user } = this.props
  //   // const { menu, deleted } = this.state
  //   menuDelete(this.props.match.params.id, user)
  //     .then(() => msgAlert({
  //       heading: 'Day from Menu Removed',
  //       message: messages.menuDeleteSuccess,
  //       variant: 'success'
  //     }))
  //     .then(() => {
  //       this.setState({ deleted: true })
  //     })
  //     .then(() => <Redirect to={{ pathname: '/menu/'
  //     }} />)
  //     .catch(console.error)
  //     .catch(error => {
  //       msgAlert({
  //         heading: 'Failed to remove item.' + error.message,
  //         message: messages.menuDeleteFailure,
  //         variant: 'danger'
  //       })
  //     })
  // }

  render () {
    const menuData = this.state.menu.map((menu) => {
      return (
        <tr key={menu.id}>
          <td ref={menu.id}> {menu.date}</td>
          <td ref={menu.id}> {menu.breakfast}</td>
          <td ref={menu.id}>{menu.lunch} </td>
          <td ref={menu.id}>{menu.snack}</td>
          <td ref={menu.id}> {menu.dinner}</td>
          <td>
            <Link to={`/menu-edit/${menu.id}`}>
              <button className="btn btn-primary" type="button">Edit</button>
            </Link>
          </td>
          <td>
            <Link to={`/menu-delete/${menu.id}`}>
              <button className="btn btn-danger" type="button" >Delete</button>
            </Link>
          </td>
        </tr>
      )
    })
    return (
      <Layout>
        <table>
          <tbody>
            <tr>
              <th scope="col">Date</th>
              <th scope="col">Breakfast</th>
              <th scope="col">Lunch</th>
              <th scope="col">Snack</th>
              <th scope="col">Dinner</th>
            </tr>
            {menuData}
          </tbody>
        </table>
      </Layout>
    )
  }
}

export default withRouter(MenuShow)
