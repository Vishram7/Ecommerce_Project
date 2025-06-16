import React from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import { Link } from "react-router-dom";

const Index = () => {
  return (
    <>
    <Container>
        <Form>

          <Form.Label>Username</Form.Label>
            <Form.Control
            placeholder='Enter username'
            type='text'
            required
            />

            <Form.Label>Email</Form.Label>
            <Form.Control
            placeholder='Enter email'
            type='email'
            required
            />

            <Form.Label>Password</Form.Label>
            <Form.Control
            placeholder='Enter password'
            type='password'
            required
            />

            <Button type='submit'>Register</Button>
            <p>Existing user? <Link to='/login'>Login</Link></p>
        </Form>
    </Container>
    </>
  )
}

export default Index