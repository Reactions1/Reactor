import React, { Component } from 'react'
import Spinner from 'react-bootstrap/Spinner'
// import { Link } from 'react-router-dom'
import axios from 'axios'
import apiUrl from './../../apiConfig'
// import { movieShow } from '../../api/movies'

class ShowUser extends Component {
  constructor (props) {
    super(props)

    this.state = {
      posts: null
    }
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/posts`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ posts: res.data.posts })
      })
      .catch(console.error)
  }

  render () {
    const { posts } = this.state
    console.log('this is our user state ', posts)
    console.log('this is our props ', this.props)
    //
    // // if we haven't loaded any movies
    if (!posts) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    // const postsJsx = posts.map(post => (
    //   <Link to={`/users/${user._id}`} key={user._id}>
    //     <li key={post._id}>
    //       {post.title} {post.body}
    //     </li>
    //   </Link>
    // )
    // )
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>{this.props.user.email} Wall</h3>
          <ul>
            {this.props.email}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowUser
