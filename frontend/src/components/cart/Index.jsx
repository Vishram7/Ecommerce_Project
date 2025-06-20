import React from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'
import PriceDetails from './PriceDetails'
import CartList from './CartList'

const Index = () => {

    const navigate = useNavigate()
  return (
    <>
    <Container >
    <Row>
      <Col lg={7} style={{position: 'relative', margin: 0, padding: 0}}>
      <CartList/>
      </Col>

      <Col lg={5} style={{position: 'relative'}}>
      <PriceDetails/>
      </Col>
    </Row>

    </Container>
    </>
  )
}

export default Index