import React, { Component } from 'react'

import messages from '../AutoDismissAlert/messages'

import axios from 'axios'
import apiUrl from './../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'

class CreatePost extends Component {
  constructor () {
    super()
    this.state = {
      post: {
        title: '',
        body: ''
      },
      createdId: null
    }
  }

  handleChange = (event) => {
    console.log(event.target)
    event.persist()
    this.setState((prevState) => {
      console.log(prevState)
      const name = event.target.name
      const value = event.target.value
      const updatedValue = { [name]: value }
      return { post: { ...prevState.post, ...updatedValue } }
    })
  }
  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'POST',
      url: `${apiUrl}/posts`,
      data: { post: this.state.post },
      headers: {
        Authorization: 'Bearer ' + this.props.user.token
      }
    })
      .then((res) => {
        this.setState({ createdId: res.data.post._id })
      })
      .then(() => this.props.msgAlert({
        heading: 'Post Created',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .catch(error => this.props.msgAlert({
        heading: 'Failed with error: ' + error.message,
        message: messages.createPostFailure,
        variant: 'danger'
      })
      )
  }
  render () {
    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Post</h3>
          <Form onSubmit={this.handleSubmit}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
                value={this.state.title}
                placeholder="Post"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Form.Group controlId="body">
              <Form.Label>Body</Form.Label>
              <Form.Control
                required
                name="body"
                type="text"
                value={this.state.body}
                placeholder="Body"
                onChange={this.handleChange}
              />
            </Form.Group>
            <Button
              variant="primary"
              type="submit"
            >
              Submit
            </Button>
          </Form>
        </div>
      </div>
    )
  }
}
export default CreatePost
