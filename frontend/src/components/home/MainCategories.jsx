import React from 'react'
import { Button, Container } from 'react-bootstrap'

const MainCategories = () => {


    const categories = [
        {   
            id: 1,
            name: "Electronics",
            image: "demourl",

        },
        {   
            id: 2,
            name: "Sports",
            image: "demourl",

        },
        {   
            id: 3,
            name: "Clothes",
            image: "demourl",

        },
        {   
            id: 4,
            name: "Gadjets",
            image: "demourl",

        },
]




  return (
    <>
    <Container fluid style={{marginTop: '10px'}}>
        <div style={{background: 'red', padding: '15px', display: 'flex', justifyContent: 'space-evenly'}}>
    {categories?.map((value) => (
        <div key={value?.id}>
            <Button className='btn btn-secondary'>{value.name}</Button>
        </div>
    ))}
    </div>
    </Container>
    </>
  )
}

export default MainCategories