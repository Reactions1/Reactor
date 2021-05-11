import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import Button from 'react-bootstrap/Button'

class IndexUsers extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)
    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      users: null
    }
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/users`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        console.log(res)
        this.setState({ users: res.data.users })
      })
      .catch(console.error)
  }

  render () {
    const { users } = this.state
    console.log('this is our user state ', users)
    //
    // // if we haven't loaded any movies
    if (!users) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const usersJsx = users.map(user => (
      <li key={user._id}>
        {user.email}
      </li>
    )
    )
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>All Users</h3>
          <ul>
            {usersJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default IndexUsers
