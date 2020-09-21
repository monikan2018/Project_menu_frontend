import React, { Component } from 'react'
import { withRouter } from 'react-router-dom'
import { BsFillCalendarFill } from 'react-icons/bs'
import { menuCreate } from '../../api/menu'
// import { index } from '../../api/item'
import messages from '../AutoDismissAlert/messages'
import DatePicker from 'react-datepicker'
import 'react-datepicker/dist/react-datepicker.css'
import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Layout from './Layout'
// import moment from 'moment'

class MenuCreate extends Component {
  constructor () {
    super()

    this.state = {
      menu: {
        date: new Date(),
        breakfast: null,
        lunch: null,
        snack: null,
        dinner: null
      },
      focused: false,
      redirectedId: null
    }
  }

  handleChange = (event) => {
    this.setState({
      [event.target.name]: event.target.value
    })
  }

  onMenuCreate = (event) => {
    event.preventDefault()
    // this.setState = { date: this.state.date.format('L') }
    const { msgAlert, user } = this.props
    const { date, breakfast, lunch, snack, dinner } = this.state
    const menu = {
      date: date.toISOString().substring(0, 10),
      breakfast: breakfast,
      lunch: lunch,
      snack: snack,
      dinner: dinner
    }
    menuCreate(menu, user)
      .then(() => msgAlert({
        heading: 'Added to your inventory!',
        message: messages.menuCreateSuccess,
        variant: 'success'
      }))
      .then(() => this.setState({ date: '', breakfast: '', lunch: '', snack: '', dinner: '' }))
      .catch(error => {
        this.setState({ date: '', breakfast: '', lunch: '', snack: '', dinner: '' })
        msgAlert({
          heading: 'Couldn\'t add this to menu. ' + error.message,
          message: messages.menuCreationFailure,
          variant: 'danger'
        })
      })
  }

  render () {
    const { breakfast, lunch, snack, dinner } = this.state
    return (
      <Layout>
        <div className="row">
          <div className="col-sm-10 col-md-8 mx-auto mt-5">
            <h3>Let&apos;s add meal to Menu</h3>
            <Form onSubmit={this.onMenuCreate}>
              <Form.Group>
                <Form.Label>Select the date
                  <span><BsFillCalendarFill />&nbsp;</span>
                  <DatePicker
                    className="form-control"
                    dateFormat="yyyy-MM-dd"
                    selected={this.state.date}
                    onChange={date => this.setState({ date: date })}
                    focused={this.state.focused}
                    onFocusChange={({ focused }) => this.setState({ focused })}
                  />
                </Form.Label>
              </Form.Group>
              <Form.Group controlId="breakfast">
                <Form.Label>Breakfast</Form.Label>
                <Form.Control
                  required
                  name="breakfast"
                  value={breakfast || ''}
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
                  value={lunch || ''}
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
                  value={snack || ''}
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
                  value={dinner || ''}
                  type="text"
                  placeholder="Enter your dinner choice"
                  onChange={this.handleChange}
                />
              </Form.Group>
              <Button
                variant="primary"
                type="submit">
                Submit
              </Button>
            </Form>
          </div>
        </div>
      </Layout>
    )
  }
}

export default withRouter(MenuCreate)
