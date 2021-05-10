import React, { Component } from 'react'

// import axios from 'axios'
// import apiUrl from './../apiConfig'

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

  render () {
    // const { title, body } = this.state

    return (
      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <h3>Create Post</h3>
          <Form onSubmit={this.onCreatePost}>
            <Form.Group controlId="title">
              <Form.Label>Title</Form.Label>
              <Form.Control
                required
                type="text"
                name="title"
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
