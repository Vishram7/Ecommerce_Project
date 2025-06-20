import React from 'react'
import { Button, Form } from 'react-bootstrap'
import { useAddProductMutation } from './features/product/productApi';
import { toast } from 'react-toastify';
import { useNavigate } from 'react-router-dom';

const AddProduct = () => {

    const [addProduct, { isLoading, isSuccess, isError, error }] = useAddProductMutation();
    const navigate = useNavigate()



    const handleSubmit = async (e) => {

        e.preventDefault();
        const formData = new FormData(e.target);
        const productname = formData.get('productname');
        const price = formData.get('price');

        try {
            const result = await addProduct({ productname, price }).unwrap();
            console.log(result, "result from add product");
            if(result.statusCode === 200){
            navigate('/home');
            toast.success(result.message)
            e.target.reset();
            }
            else {
                toast.error(result.message);
            }
        } catch (err) {
            alert('Failed to add product: ' + err.message);
        }

    }


    return (
        <>
            <Form onSubmit={handleSubmit}>
                <Form.Control
                    type="text"
                    placeholder="Product Name"
                    className="mb-3"
                    name="productname"
                />
                <Form.Control
                    type="text"
                    placeholder="Price"
                    className="mb-3"
                    name="price"
                />
                <Button type='submit'>Add</Button>
            </Form>
        </>
    )
}

export default AddProduct