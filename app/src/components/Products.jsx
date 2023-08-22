import { useEffect, useState } from "react";
import styled from "styled-components";
import { popularProducts } from "../data";
import Product from "./Product";
import axios from "axios";

const Container = styled.div`
    padding: 20px;
    display: flex;
    flex-wrap: wrap;
    justify-content: space-between;
`;

const Products = ({ cat, filters, sort }) => {

  const [products, setProducts] = useState([]);

  useEffect(() => {
    
    const getProducts = async () => {
      try {
        const res = await axios.get(
          cat
            ? `http://localhost:5000/api/products?category=${cat}`
            : "http://localhost:5000/api/products"
        );
        setProducts(res.data);
      } catch (err) {}
    };
    getProducts();
  }, [cat]);

  return (
    
    <Container>
      { products
            .slice(0, 8)
            .map((item) => {
              console.log(item);
              return (
            <Product item={item} key={item.id} />
            )} )}
    </Container>
    
  );
};

export default Products;
