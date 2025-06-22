import React from "react";
import { Button, Container, Row } from "react-bootstrap";
import { useNavigate } from "react-router-dom";
import {
  useGetCartQuery,
  useRemoveFromCartMutation,
  useUpdateQuantityMutation,
} from "../../features/cart/cartApi";
import { toast } from "react-toastify";

const CartList = () => {
  const navigate = useNavigate();

  const { data } = useGetCartQuery();
  // console.log(data);

  const [removeFromCart] = useRemoveFromCartMutation();
  const [updateQuantity] = useUpdateQuantityMutation();

  const handleRemove = async (productid) => {
    // console.log(productid);

    try {
      const result = await removeFromCart({ productid }).unwrap();

      if (result?.statusCode === 200) {
        toast.success(result?.message);
      } else {
        toast.error(result?.message);
      }
    } catch (error) {
      console.log(error);
    }
  };

  const handleQuantityChange = async (productid, newqty) => {
    if (newqty < 1) return;

    try {
      const result = await updateQuantity({
        productid,
        quantity: newqty,
      }).unwrap();

      if (result?.statusCode === 200) {
        toast.success(result?.message);
      } else {
        toast.error("Failed to update quantity");
      }
    } catch (err) {
      toast.error("Something went wrong");
      console.error(err);
    }
  };

  return (
    <>
      <Container style={{ background: "white", marginTop: "20px" }}>
        {data?.cartDetails?.map((value) => (
          <div
            key={value?._id}
            style={{
              padding: "10px 20px",
              borderBottom: "1px solid #e0e0e0",
              width: "100%",
            }}
          >
            <div
              style={{
                display: "flex",
                gap: "10px",
              }}
            >
              <div>
                <img
                  src={value?.imageurl}
                  style={{
                    height: "112px",
                    width: "100px",
                    objectFit: "cover",
                  }}
                />
              </div>

              <div>
                <h1
                  style={{
                    whiteSpace: "nowrap",
                    overflow: "hidden",
                    textOverflow: "ellipsis",
                    maxWidth: "420px",
                    height: "80px",
                  }}
                >
                  {value?.productname}
                </h1>
                <p className="text-muted">{value.specs}</p>
                <div
                  style={{ display: "flex", alignItems: "center", gap: "20px" }}
                >
                  <strong>₹{value?.price}</strong>
                  <p
                    className="text-muted"
                    style={{ fontSize: "13px", margin: 0 }}
                  >
                    <s>{value?.discount > 0 && `₹${value?.actualprice}`}</s>
                  </p>
                </div>
              </div>
            </div>
            <div style={{ display: "flex", gap: "50px" }}>
              <div
                style={{
                  display: "flex",
                  alignItems: "center",
                  gap: "50px",
                  marginTop: "10px",
                }}
              >
                <div
                  style={{ display: "flex", alignItems: "center", gap: "10px" }}
                >
                  <Button
                    variant="light"
                    onClick={() =>
                      handleQuantityChange(
                        value?.productid,
                        value?.quantity - 1
                      )
                    }
                    disabled={value?.quantity <= 1}
                  >
                    -
                  </Button>
                  <span>{value?.quantity}</span>
                  <Button
                    variant="light"
                    onClick={() =>
                      handleQuantityChange(
                        value?.productid,
                        value?.quantity + 1
                      )
                    }
                  >
                    +
                  </Button>
                </div>
                <Button onClick={() => handleRemove(value?.productid)}>
                  Remove
                </Button>
              </div>
            </div>
          </div>
        ))}
      </Container>
      <div
        style={{
          position: "absolute",
          bottom: 0,
          position: "sticky",
          background: "white",
          display: "flex",
          justifyContent: "flex-end",
          padding: "20px",
          boxShadow: "0 -2px 10px 0 rgba(0, 0, 0, .1)",
        }}
      >
        <Button
          style={{ width: "300px" }}
          onClick={() => navigate("/checkout")}
        >
          PLACE ORDER
        </Button>
      </div>
    </>
  );
};

export default CartList;
