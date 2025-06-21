import React from "react";
import { Button, Form } from "react-bootstrap";
import { useAddProductMutation } from "./features/product/productApi";
import { toast } from "react-toastify";
import { useNavigate } from "react-router-dom";

const AddProduct = () => {
  const [addProduct, { isLoading, isSuccess, isError, error }] =
    useAddProductMutation();
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();

    const form = e.target;
    const formData = new FormData(form); // Automatically includes file input

    try {
      const result = await addProduct(formData).unwrap();

      if (result.statusCode === 200) {
        toast.success(result.message);
        form.reset();
        navigate("/home");
      } else {
        toast.error(result.message);
      }
    } catch (err) {
      toast.error("Failed to add product: " + err.message);
    }
  };

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
          placeholder="Actual Price"
          className="mb-3"
          name="actualprice"
        />
        <Form.Control
          type="text"
          placeholder="Discount"
          className="mb-3"
          name="discount"
        />
        <Form.Control
          type="file"
          accept="image/*"
          name="productimage"
          className="mb-3"
        />

        {/* <Form.Control
          type="text"
          placeholder="Price"
          className="mb-3"
          name="price"
        /> */}
        <Button type="submit">Add</Button>
      </Form>
    </>
  );
};

export default AddProduct;
