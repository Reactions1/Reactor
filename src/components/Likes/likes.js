import React, { Component } from 'react'
import axios from 'axios'
import apiUrl from './../../apiConfig'

class LikeButton extends Component {
  constructor (props) {
    super(props)
    this.state = {
      likes: 0
    }
  }

addLike = () => {
  const newCount = this.state.likes + 1
  this.setState({
    likes: newCount
  })
  axios({
    method: 'PATCH',
    url: `${apiUrl}/posts/${this.props.value}`,
    data: { post: this.state.post },
    headers: {
      Authorization: 'Bearer ' + this.props.name.user.token
    }
  })
}

render () {
  return <button onClick={this.addLike}>Likes {this.state.likes} </button>
}
}

export default LikeButton
