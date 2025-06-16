import React from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";

const Index = () => {
    const navigate = useNavigate()


    const handleSubmit = (e) => {
        e.preventDefault()
        navigate('/home')
    }


  return (
    <>
    <Container>
        <Form onSubmit={handleSubmit}>
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

            <Button type='submit'>Login</Button>
            <p>New user? <Link to='/register'>Register</Link></p>
        </Form>
    </Container>
    </>
  )
}

export default Index