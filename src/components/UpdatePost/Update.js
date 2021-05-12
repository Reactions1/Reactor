import React, { Component } from 'react'

import messages from '../AutoDismissAlert/messages'

import axios from 'axios'
import apiUrl from './../../apiConfig'

import Form from 'react-bootstrap/Form'
import Button from 'react-bootstrap/Button'
import Modal from 'react-bootstrap/Modal'
// import { FaEdit } from 'react-icons/fa'

class UpdatePost extends Component {
  constructor () {
    super()
    this.state = {
      post: {
        title: '',
        body: ''
      },
      updated: false,
      show: false
    }
  }

  handleChange = (event) => {
    console.log(this.props)
    event.persist()
    this.setState((prevState) => {
      const name = event.target.name
      const value = event.target.value
      const updatedValue = { [name]: value }
      return { post: { ...prevState.post, ...updatedValue } }
    })
  }

  changeModal = () => {
    this.setState({ show: !this.state.show })
  }

  handleSubmit = (event) => {
    event.preventDefault()

    axios({
      method: 'PATCH',
      url: `${apiUrl}/posts/${this.props.value}`,
      data: { post: this.state.post },
      headers: {
        Authorization: 'Bearer ' + this.props.name.user.token
      }
    })
      .then(() => this.props.name.msgAlert({
        heading: 'Post Updated',
        message: messages.createPostSuccess,
        variant: 'success'
      }))
      .catch(error => this.props.name.msgAlert({
        heading: 'Failed with error: ' + error.message,
        message: messages.createPostFailure,
        variant: 'danger'
      })
      )
  }
  render () {
    // if (this.state.created) {
    //   return <Redirect to={`/posts/${this.state.createdId}`} />
    // }

    return (

      <div className="row">
        <div className="col-sm-10 col-md-8 mx-auto mt-5">
          <Button onClick={this.changeModal}> Update Post </Button>
          <Modal show={this.state.show}>
            <Modal.Header>Modal Head</Modal.Header>
            <Modal.Body>
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
            </Modal.Body>
            <Modal.Footer>
              <Button onClick={this.changeModal}> Close</Button>
            </Modal.Footer>
          </Modal>

        </div>
      </div>
    )
  }
}
export default UpdatePost
