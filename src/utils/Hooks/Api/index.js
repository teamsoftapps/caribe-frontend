import axios from "axios";

export const fethchProducts = () => {
  try {
    const response = axios.get(`${process.env.BackendURL}/products`);
  } catch (e) {}
};
