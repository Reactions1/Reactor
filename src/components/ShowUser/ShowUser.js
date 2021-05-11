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
      posts: null,
      owner: null
    }
  }

  // do this whenever MovieIndex is first shown on the page (mounted)
  // do this whenever MovieIndex is first shown on the page (mounted)
  componentDidMount () {
    // this function runs at the end of the Mounting stage
    // Here we will make any HTTP requests
    axios({
      method: 'GET',
      url: `${apiUrl}/posts/${this.props.match.match.params.id}`,
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ posts: res.data.posts })
        this.setState({ owner: res.data.posts[0].owner.email })
      })
      .catch(console.error)
  }

  // componentDidUpdate (prevState) {
  //   if (this.state !== prevState) {
  //     axios({
  //       method: 'GET',
  //       url: `${apiUrl}/posts/${this.props.match.match.params.id}`,
  //       headers: {
  //         Authorization: 'Bearer ' + this.props.user.token
  //       }
  //     })
  //       .then((res) => {
  //         this.setState({ posts: res.data.posts })
  //         this.setState({ owner: res.data.posts[0].owner.email })
  //       })
  //       .catch(console.error)
  //   }
  // }

  render () {
    // console.log('user id?', this.props.match.match.params.id)
    const { posts } = this.state
    console.log('here is the owner ', this.state.owner)
    // console.log('this is our user email ', posts.0.title)
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

    const postsJsx = posts.map(post => (
      <li key={post._id}>
        {post.title} {post.body}
      </li>
    )
    )
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>{`${this.state.owner}'s Wall`}</h3>
          <ul>
            {postsJsx}
          </ul>
        </div>
      </div>
    )
  }
}

export default ShowUser
