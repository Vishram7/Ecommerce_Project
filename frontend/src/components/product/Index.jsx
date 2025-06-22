import React from "react";
import { useParams } from "react-router-dom";
import { useGetSingleProductQuery } from "../../features/product/productApi";

const Index = () => {
  const { productid } = useParams();
  const { data: product } = useGetSingleProductQuery(productid);

  return (
    <>
      <h1>{product?.productname}</h1>
      <img src={product?.imageurl} style={{ width: "200px" }} alt="" />
      <p>{product?.price}</p>
      <p>{product?.actualprice}</p>
      <p>{product?.discount}</p>
    </>
  );
};

export default Index;
