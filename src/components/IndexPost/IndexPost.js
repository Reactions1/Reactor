import React, { Component } from 'react'

// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class IndexPost extends Component {
  constructor (props) {
    // this is a best practice
    // this sets `this.props` in the constructor
    super(props)

    // keep track of all the movies we want to show, they will initially be null
    this.state = {
      posts: null
    }
  }

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
        console.log(res.data)
        this.setState({ posts: res.data.posts })
      })
      .catch(console.error)
  }

  render () {
    console.log('this is the state' + this.state.posts)
    const { posts } = this.state
    console.log(posts)

    // if we haven't loaded any movies
    if (!posts) {
      // show a loading spinner
      return (
        <Spinner animation="border" role="status">
          <span className="sr-only">Loading...</span>
        </Spinner>
      )
    }

    const postsJsx = posts.map(post => (
      <li key={post._id}>
        {post.title} {post.body}
      </li>
    ))

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>My Wall</h3>
          <ul>
            <li>
              {postsJsx}
            </li>
          </ul>
        </div>
      </div>
    )
  }
}

export default IndexPost
