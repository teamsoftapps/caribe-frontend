/** @format */

import axios from "axios";
import { UseSelector, useSelector } from "react-redux/es/hooks/useSelector";

import React from "react";
const BackendUrl = "http://localhost:5000/api/v2/auth";

const UsecreateApi = () => {
  const id = useSelector((state) => state.auth.id);
  const token = useSelector((state) => state.auth.token);
  const UsePostAuthData = async (endpoint, body) => {
    try {
      const response = await axios.post(`${BackendUrl}/${endpoint}`, body);

      return response;
    } catch (error) {
      return error;
    }
  };

  const UsePatchPrams = async (endpoint, params, body) => {
    try {
      const resPatch = await axios.patch(
        `${BackendUrl}/${endpoint}/${params}`,
        body
      );

      return resPatch;
    } catch (error) {
      return error;
    }
  };

  const getData = async (body) => {
    try {
      const response = await axios.get(
        "http://localhost:5000/api/v2/products",

        {
          params: body,
          headers: {
            "Content-Type": "application/json",
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  const postOrder = async (body) => {
    try {
      const response = await axios.post(
        `http://localhost:5000/api/v2/order/${id}`,
        body
      );
      return response;
    } catch (error) {
      return error;
    }
  };

  const getUserProfile = async () => {
    try {
      const response = await axios.get(
        `${BackendUrl}/profile/${id}`,

        {
          headers: {
            "Content-Type": "application/json",
            Authorization: `Bearer ${token}`,
          },
        }
      );

      return response;
    } catch (error) {
      return error;
    }
  };

  return { UsePostAuthData, UsePatchPrams, getData, postOrder, getUserProfile };
};
export default UsecreateApi;
