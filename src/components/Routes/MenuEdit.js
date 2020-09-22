import React, { Component } from 'react'
import { withRouter, Redirect } from 'react-router-dom'
import { menuEdit, show } from '../../api/menu'
import messages from '../AutoDismissAlert/messages'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
// import { BsFillCalendarFill } from 'react-icons/bs'
// import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Layout from './Layout'

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
      redirectedId: null
    }
  }
  componentDidMount () {
    const { user, msgAlert } = this.props
    show(this.props.match.params.id, user)
      .then(res => this.setState({ menu: res.data.menu }))
      .then(() => console.log(this.state))
      // .then(() => msgAlert({
      //   heading: 'Here you go!',
      //   message: messages.menuShowSuccess,
      //   variant: 'success'
      // }))
      // .then(() => history.push('/'))
      .catch(error => {
        msgAlert({
          heading: 'Can\'t seem to find that. ' + error.message,
          message: messages.menuShowFailure,
          variant: 'danger'
        })
      })
  }
  handleChange = (event) => {
    event.persist()
    this.setState(prevState => {
      const updatedField = { [event.target.name]: event.target.value }
      const editedMenu = Object.assign({}, prevState.menu, updatedField)
      return { menu: editedMenu }
    })
  }

  onMenuEdit = event => {
    event.preventDefault()
    const { msgAlert, history, user } = this.props
    menuEdit(this.props.match.params.id, user, this.state)
      .then(() => msgAlert({
        heading: 'Updated!',
        message: messages.menuEditSuccess,
        variant: 'success'
      }))
      .then(() => history.push('/menu'))
      .then(() => <Redirect to={{
        // Redirect to the home page ('/')
        pathname: '/menu/'
      }} />)
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
    const { breakfast, lunch, snack, dinner } = this.state.menu

    return (
      <Layout>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Edit Item</h3>
            <h4>Date: {this.state.menu.date}</h4>
            <Form onSubmit={this.onMenuEdit}>
              <Form.Group controlId="breakfast">
                <Form.Label>Breakfast</Form.Label>
                <Form.Control
                  required
                  name="breakfast"
                  value={breakfast}
                  type="text"
                  placeholder="Enter your breakfast choice"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="lunch">
                <Form.Label>Lunch</Form.Label>
                <Form.Control
                  required
                  name="lunch"
                  value={lunch}
                  type="text"
                  placeholder="Enter your lunch choice"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="snack">
                <Form.Label>Snack</Form.Label>
                <Form.Control
                  required
                  name="snack"
                  value={snack}
                  type="text"
                  placeholder="Enter your snack choice"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Form.Group controlId="dinner">
                <Form.Label>Dinner</Form.Label>
                <Form.Control
                  required
                  name="dinner"
                  value={dinner}
                  type="text"
                  placeholder="Enter your dinner choice"
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
