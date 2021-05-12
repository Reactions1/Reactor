import React, { Component } from 'react'
// import { Link } from 'react-router-dom'
import Spinner from 'react-bootstrap/Spinner'
import axios from 'axios'
import apiUrl from './../../apiConfig'
import LikePost from './../LikePost/LikePost'
// import { FaTrash } from 'react-icons/fa'

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
    console.log('the props ', this.props)
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/allposts`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ posts: res.data.posts })
      })
      .catch(console.error)
  }

  componentDidUpdate (prevState) {
    if (this.state !== prevState) {
      axios({
        method: 'GET',
        url: `${apiUrl}/allposts`,
        headers: {
          Authorization: 'Bearer ' + this.props.user.token
        }
      })
        .then((res) => {
          this.setState({ posts: res.data.posts })
        })
        .catch(console.error)
    }
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
        {post.owner.email}
        {post.title} {post.body}
        <LikePost value={post._id} name={this.props}/>
      </li>
    )
    )
    return (
      <div className="wall">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3 className="wall-title">News Feed</h3>
          <ul className="post-list">
            {postsJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default IndexPost
