import React, { useState } from 'react'
import { Button, Col, Container, Row } from 'react-bootstrap'
import { useGetProductsQuery } from '../../features/product/productApi'


const ProductList = () => {

    const { data, error, isLoading } = useGetProductsQuery()
    
    // console.log(data, "products data");
    
    console.log(data?.map((i) => i?.productname), "products");
    
    const [hoveredIndex, setHoveredIndex] = useState(null);
    const products = [
        {   
            id: 1,
            productname: "Product1",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 2,
            productname: "Product2",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 3,
            productname: "Product3",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 4,
            productname: "Product4",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 5,
            productname: "Product1",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 6,
            productname: "Product2",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 7,
            productname: "Product3",
            price: "200",
            actualprice: "500"
        },
        {   
            id: 8,
            productname: "Product4",
            price: "200",
            actualprice: "500"
        },
    ]
   

    const handleClick = () => {
        
      alert("hello")
      
    }

  return (
    <Container fluid style={{marginTop: '20px'}}>
    <div style={{background: 'white', padding: '15px'}}>
        <Row style={{rowGap: '20px'}}>
        {/* {products?.map((value, index) => ( */}
            {data?.map((value, index) => (
            <Col lg={2} key={value?.id} 
            style={{
                
                padding: '10px',
                boxShadow:
                  hoveredIndex === index
                    ? '0 4px 12px rgba(0, 0, 0, 0.2)'
                    : 'none',
                transition: 'box-shadow 0.2s ease-in-out',
                cursor: 'pointer',
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
              >
                <div style={{height: '200px'}}>
                <h2>{value?.productname}</h2>
                <div style={{display: 'flex', gap: '10px', alignItems: 'center'}}>
                <p>₹{value?.price}</p>
                <p className='text-muted' style={{fontSize: '13px'}}><s>₹{value?.actualprice}</s></p>
                </div>
                </div>
                <Button onClick={handleClick}>Add to cart</Button>
            </Col>
        ))}
        </Row>
        
    </div>
     
    </Container>
  )
}

export default ProductList