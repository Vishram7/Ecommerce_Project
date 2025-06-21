import React from "react";
import { Button, Container, Form } from "react-bootstrap";
import { Link, useNavigate } from "react-router-dom";
import { useLoginUserMutation } from "../../features/user/userApi";
import { toast } from "react-toastify";

const Index = () => {
  const [loginUser, { isLoading }] = useLoginUserMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const formData = new FormData(e.target);
    const email = formData.get("email");
    const password = formData.get("password");

    try {
      const result = await loginUser({ email, password }).unwrap();
      // console.log(result?.token, "result from login user");
      if (result?.statusCode === 200) {
        localStorage.setItem("authToken", result?.token);
        toast.success(result?.message);
        navigate("/home");
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
            placeholder="Enter email"
            type="email"
            name="email"
            required
          />

          <Form.Label>Password</Form.Label>
          <Form.Control
            placeholder="Enter password"
            type="password"
            name="password"
            required
          />

          <Button type="submit">{isLoading ? "Logging in..." : "Login"}</Button>
          <p>
            New user? <Link to="/register">Register</Link>
          </p>
        </Form>
      </Container>
    </>
  );
};

export default Index;
