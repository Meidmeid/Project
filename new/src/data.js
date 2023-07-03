import axios from "axios";
import { useState, useEffect } from "react";

export const fetchData = async () => {
  try {
    const response = await axios.get(
      "https://64745acf7de100807b1ab87d.mockapi.io/products"
    );
    return response.data;
  } catch (err) {
    return [];
  }
};

export const useProductData = () => {
  const [product, setProduct] = useState([]);

  useEffect(() => {
    const getData = async () => {
      const data = await fetchData();
      setProduct(data);
    };
    getData();
  }, []);

  return product;
};
