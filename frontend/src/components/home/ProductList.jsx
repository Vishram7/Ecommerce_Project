import React, { useState } from "react";
import { Button, Col, Container, Row } from "react-bootstrap";
import { useGetProductsQuery } from "../../features/product/productApi";
import { toast } from "react-toastify";
import {
  useAddToCartMutation,
  useGetCartQuery,
} from "../../features/cart/cartApi";
import { useNavigate } from "react-router-dom";

const ProductList = () => {
  const { data } = useGetProductsQuery();
  // console.log(data);

  const { data: cartData } = useGetCartQuery();
  const navigate = useNavigate();

  const [addToCart, { isLoading }] = useAddToCartMutation();

  const [hoveredIndex, setHoveredIndex] = useState(null);

  const handleAdd = async (productid) => {
    try {
      const result = await addToCart({ productid }).unwrap();
      // console.log(result);
      toast.success(result?.message);
    } catch (error) {
      console.log(error.message);
    }
  };

  const isInCart = (productid) => {
    return cartData?.cartDetails?.some((item) => item?.productid === productid);
  };

  return (
    <Container fluid style={{ marginTop: "20px" }}>
      <div style={{ background: "white", padding: "15px" }}>
        <Row style={{ rowGap: "20px" }}>
          {/* {products?.map((value, index) => ( */}
          {data?.map((value, index) => (
            <Col
              lg={2}
              key={value?._id}
              style={{
                padding: "10px",
                boxShadow:
                  hoveredIndex === index
                    ? "0 4px 12px rgba(0, 0, 0, 0.2)"
                    : "none",
                transition: "box-shadow 0.2s ease-in-out",
                cursor: "pointer",
              }}
              onMouseEnter={() => setHoveredIndex(index)}
              onMouseLeave={() => setHoveredIndex(null)}
            >
              <div style={{ height: "285px", width: "100%" }}>
                <img
                  src={value?.imageurl}
                  style={{
                    width: "100%",
                    height: "200px",
                    objectFit: "cover",
                  }}
                  alt=""
                />
                <h2>{value?.productname}</h2>
                <div
                  style={{ display: "flex", gap: "10px", alignItems: "center" }}
                >
                  <p>₹{value?.price}</p>
                  <p className="text-muted" style={{ fontSize: "13px" }}>
                    <s>{value?.discount > 0 && `₹${value?.actualprice}`}</s>
                  </p>
                </div>
              </div>
              {isInCart(value?._id) ? (
                <Button
                  variant="outline-primary"
                  onClick={() => navigate("/cart")}
                >
                  Go to Cart
                </Button>
              ) : (
                <Button onClick={() => handleAdd(value?._id)}>
                  Add to Cart
                </Button>
              )}
            </Col>
          ))}
        </Row>
      </div>
    </Container>
  );
};

export default ProductList;
