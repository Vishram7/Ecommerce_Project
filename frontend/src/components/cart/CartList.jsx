import React from 'react'
import { Button, Container, Row } from 'react-bootstrap'
import { useNavigate } from 'react-router-dom'

const CartList = () => {

    const navigate = useNavigate()
    const products = [
        {
            id: 1,
            name: "Product11111111111111111111111111111111111111111111111111111",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        {
            id: 2,
            name: "Product2",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        {
            id: 3,
            name: "Product3",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        {
            id: 4,
            name: "Product4",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        {
            id: 5,
            name: "Product1",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        {
            id: 6,
            name: "Product2",
            specs: "demo specs",
            price: "200",
            actualprice: "500"
        },
        // {   
        //     id: 7,
        //     name: "Product3",
        //     price: "200",
        //     actualprice: "500"
        // },
        // {   
        //     id: 8,
        //     name: "Product4",
        //     price: "200",
        //     actualprice: "500"
        // },
    ]


    return (
        <>
            <Container style={{ background: 'white', marginTop: '20px' }}>

                {
                    products?.map((value) => (
                        <div
                            key={value?.id}
                            style={{
                                // border: '1px solid grey',
                                padding: "10px 20px",
                                borderBottom: '1px solid #e0e0e0',
                                width: '100%',
                            }}>
                            <div style={{
                                display: 'flex',
                                gap: '10px'
                            }}>
                                <div>
                                    <h1 style={{ height: '112px', width: '100px' }}>Img</h1>
                                    <p>quantity</p>
                                </div>

                                <div>
                                    <h1 style={{
                                        whiteSpace: 'nowrap',
                                        overflow: 'hidden',
                                        textOverflow: 'ellipsis',
                                        maxWidth: '420px'
                                    }}>{value.name}</h1>
                                    <p className='text-muted'>{value.specs}</p>
                                    <strong>{value.price}</strong>
                                    <p>remove button</p>
                                </div>
                            </div>
                            {/* <hr style={{ margin: 0 }} /> */}
                        </div>
                    ))
                }

            </Container>
            <div
                style={{
                    position: 'absolute',
                    bottom: 0,
                    position: 'sticky',
                    background: 'white',
                    display: 'flex',
                    justifyContent: 'flex-end',
                    padding: '20px',
                        boxShadow: '0 -2px 10px 0 rgba(0, 0, 0, .1)'
                }}>
                <Button style={{width: '300px'}} onClick={() => navigate('/checkout')}>PLACE ORDER</Button>
            </div>
        </>
    )
}

export default CartList