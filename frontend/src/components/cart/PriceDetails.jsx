import React from 'react'
import { Container } from 'react-bootstrap'

const PriceDetails = () => {
    let total = 1000
  return (
    <>
    <Container style={{background: 'white', marginTop: '20px', paddingTop: '20px', paddingBottom: '5px', position: 'absolute', top: 0, position: 'sticky'}}>
        
        <h1 style={{fontSize: '16px'}} className='text-muted'>PRICE DETAILS</h1>
        <hr style={{margin: 0}}/>
        
        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '15px', fontSize: '16px'}}>
        <p>Price <span>{`(${3} items)`}</span></p>
        <p>₹{total}</p>
        </div>

        <div style={{display: 'flex', justifyContent: 'space-between', paddingTop: '15px', fontSize: '16px'}}>
        <p>Discount</p>
        <p>₹{total}</p>
        </div>
        
        {/* <hr style={{borderTop: '1px dotted grey'}}/> */}
        

        <div 
        style={{
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center', 
            fontSize: '18px', 
            borderTop: '1px dashed #e0e0e0', 
            borderBottom: '1px dashed #e0e0e0',
            padding: '10px 0px'}}>
        <h3>Total Amount</h3>
        <p style={{ margin: 0 }}>₹{total}</p>
        </div>
    </Container>
    </>
  )
}

export default PriceDetails