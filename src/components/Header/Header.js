import React, { Fragment } from 'react'
import Nav from 'react-bootstrap/Nav'
import Navbar from 'react-bootstrap/Navbar'
// import Button from 'react-bootstrap/Button'
// import CreatePost from '../CreatePost/CreatePost'

const authenticatedOptions = (
  <Fragment>
    <Nav.Link href="#/news-feed">News Feed</Nav.Link>
    <Nav.Link href="#change-password">Change Password</Nav.Link>
    <Nav.Link href="#sign-out">Sign Out</Nav.Link>
    <Nav.Link href="#posts">Your Posts</Nav.Link>
    <Nav.Link href="#users">Users</Nav.Link>
  </Fragment>
  // <Button variant="primary" onClick={() => setModalShow(true)}>
  //   Create
  //   <CreatePost
  //     show={modalShow}
  //     onHide={() => setModalShow(false)}
  //   />
  // </Button>

)

const unauthenticatedOptions = (
  <Fragment>
    <Nav.Link href="#sign-up">Sign Up</Nav.Link>
    <Nav.Link href="#sign-in">Sign In</Nav.Link>
  </Fragment>
)

const alwaysOptions = (
  <Fragment>
  </Fragment>
)

const Header = ({ user }) => (
  <Navbar bg="secondary" variant="primary" expand="md">
    <Navbar.Brand href="#" >
      Reactor
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
