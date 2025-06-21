import React from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import PriceDetails from "./PriceDetails";
import CartList from "./CartList";
import { useGetCartQuery } from "../../features/cart/cartApi";

const Index = () => {
  const { data } = useGetCartQuery();
  const navigate = useNavigate();

  if (!data || data.cartDetails?.length === 0) {
    return <h1 style={{ marginTop: "20px" }}>Cart is empty</h1>;
  }

  return (
    <>
      <Container>
        <Row>
          <Col lg={7} style={{ position: "relative", margin: 0, padding: 0 }}>
            <CartList />
          </Col>

          <Col lg={5} style={{ position: "relative" }}>
            <PriceDetails />
          </Col>
        </Row>
      </Container>
    </>
  );
};

export default Index;
