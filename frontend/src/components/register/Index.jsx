import React from 'react'
import {Button, Container, Form} from 'react-bootstrap'
import { Link, useNavigate } from "react-router-dom";
import { useRegisterUserMutation } from '../../features/user/userApi';
import { toast } from 'react-toastify';

const Index = () => {

  const [registerUser] = useRegisterUserMutation()
  const navigate = useNavigate()


  const handleSubmit = async (e) => {
      e.preventDefault();
      const formData = new FormData(e.target);
      const email = formData.get("email");
      const password = formData.get("password");
  
      try {
        const result = await registerUser({ email, password }).unwrap();
        // console.log(result?.token, "result from login user");
        if (result?.statusCode === 200) {
          toast.success(result?.message);
          navigate("/login");
        }
      } catch (error) {
        toast.error(error?.data?.message || "Error");
      }
    };

  return (
    <>
    <Container>
        <Form onSubmit={handleSubmit}>

            <Form.Label>Email</Form.Label>
            <Form.Control
            placeholder='Enter email'
            type='email'
            name='email'
            required
            />

            <Form.Label>Password</Form.Label>
            <Form.Control
            placeholder='Enter password'
            type='password'
            name='password'
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