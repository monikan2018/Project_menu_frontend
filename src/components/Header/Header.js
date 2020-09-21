import React, { Fragment } from 'react'
// import Nav from 'react-bootstrap/Nav'
// import Navbar from 'react-bootstrap/Navbar'
import { Nav, Navbar, NavDropdown } from 'react-bootstrap'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#menu">Menu</Nav.Link>
    <Nav.Link href="#menu-create">Add meals</Nav.Link>
    <NavDropdown title="Settings" alignRight id="settings-dropdown">
      <NavDropdown.Item href="#change-password">Change Password</NavDropdown.Item>
      <NavDropdown.Divider />
      <NavDropdown.Item href="#sign-out">Sign Out</NavDropdown.Item>
    </NavDropdown>
    {/* <Nav.Link href="#change-password">Change Password</Nav.Link>
     <Nav.Link href="#sign-out">Sign Out</Nav.Link> */}
  </Fragment>
)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
    <Nav.Link href="/">Home</Nav.Link>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="{background-color}" variant="light" expand="md">
    <Navbar.Brand href="#">
      Family Menu
    </Navbar.Brand>
    <Navbar.Toggle aria-controls="basic-navbar-nav" />
    <Navbar.Collapse id="basic-navbar-nav">
      <Nav className="ml-auto">
        { user && <span className="navbar-text mr-2">Welcome, {user.email}</span>}
        { alwaysOptions }
        { user ? authenticatedOptions : unauthenticatedOptions }
      </Nav>
    </Navbar.Collapse>
  </Navbar>
)

export default Header
