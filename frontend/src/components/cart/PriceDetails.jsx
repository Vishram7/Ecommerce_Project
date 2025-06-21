import React from "react";
import { Container } from "react-bootstrap";
import { useGetCartQuery } from "../../features/cart/cartApi";

const PriceDetails = () => {
  const { data } = useGetCartQuery();

  const total = data?.carttotal;
  const items = data?.cartDetails?.length;

  return (
    <>
      <Container
        style={{
          background: "white",
          marginTop: "20px",
          paddingTop: "20px",
          paddingBottom: "5px",
          position: "absolute",
          top: 0,
          position: "sticky",
        }}
      >
        <h1 style={{ fontSize: "16px" }} className="text-muted">
          PRICE DETAILS
        </h1>
        <hr style={{ margin: 0 }} />

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "15px",
            fontSize: "16px",
          }}
        >
          <p>
            Price{" "}
            <span>{items > 1 ? `(${items} items)` : `(${items} item)`}</span>
          </p>
          <p>₹{data?.totalActualPrice}</p>
        </div>

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            paddingTop: "15px",
            fontSize: "16px",
          }}
        >
          <p>Discount</p>
          <p>- {`₹${data?.totalDiscount}`}</p>
        </div>

        {/* <hr style={{borderTop: '1px dotted grey'}}/> */}

        <div
          style={{
            display: "flex",
            justifyContent: "space-between",
            alignItems: "center",
            fontSize: "18px",
            borderTop: "1px dashed #e0e0e0",
            borderBottom: "1px dashed #e0e0e0",
            padding: "10px 0px",
          }}
        >
          <h3>Total Amount</h3>
          <p style={{ margin: 0 }}>₹{data?.cartTotal}</p>
        </div>
      </Container>
    </>
  );
};

export default PriceDetails;
