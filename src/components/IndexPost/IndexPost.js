import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import messages from '../AutoDismissAlert/messages'
import Button from 'react-bootstrap/Button'
import UpdatePost from './../UpdatePost/Update'

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
  destroyPost = (event) => {
    axios({
      method: 'DELETE',
      url: `${apiUrl}/posts/${event.target.value}`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then(() => this.props.msgAlert({
        heading: 'Post Deleted',
        message: messages.deletePostSuccess,
        variant: 'success'
      }))
      .catch(error => this.props.msgAlert({
        heading: 'Failed with error: ' + error.message,
        message: messages.deletePostFailure,
        variant: 'danger'
      }))
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
        this.setState({ posts: res.data.posts })
      })
      .catch(console.error)
  }
  render () {
    const { posts } = this.state

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
        <Button value={post._id} onClick={this.destroyPost}>Delete</Button>
        <UpdatePost value={post._id} name={this.props}/>
      </li>
    )
    )
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>My Wall</h3>
          <ul>
            {postsJsx}
          </ul>
        </div>
      </div>
    )
  }
}
export default IndexPost
