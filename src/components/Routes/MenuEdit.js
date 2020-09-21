import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { menuEdit } from '../../api/item'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from '../../components/Layout'

class MenuEdit extends Component {
  constructor () {
    super()

    this.state = {
      menu: {
        date: '',
        breakfast: '',
        lunch: '',
        snack: '',
        dinner: ''
      },
      focused: false,
      redirectedId: false
    }
  }

  handleChange = event => this.setState({
    [event.target.name]: event.target.value
  })

  onMenuEdit = event => {
    event.preventDefault()

    const { msgAlert, history, user } = this.props
    menuEdit(this.props.match.params.id, user, this.state)
      .then(() => msgAlert({
        heading: 'Updated!',
        message: messages.menuEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/items'))
      .catch(error => {
        this.setState({ date: '', breakfast: '', lunch: '', snack: '', dinner: '' })
        msgAlert({
          heading: 'Item hasn\'t changed! ' + error.message,
          message: messages.menuEditFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { breakfast, lunch, snack, dinner} = this.state

    return (
      <Layout>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Edit Item</h3>
            <Form onSubmit={this.onMenuEdit}>
              <Form.Group controlId="name">
                <Form.Label>Item Name</Form.Label>
                <Form.Control
                  // required
                  type="text"
                  name="name"
                  value={name}
                  placeholder="Enter Item Name"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="quantity">
                <Form.Label>Quantity</Form.Label>
                <Form.Control
                  // required
                  name="quantity"
                  value={quantity}
                  type="number"
                  min='0'
                  placeholder="Quantity"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="price">
                <Form.Label>Price</Form.Label>
                <Form.Control
                  // required
                  name="price"
                  value={price}
                  type="number"
                  min='0'
                  placeholder="Price"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit"
              >
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(MenuEdit)
