import logo from "./logo.svg";
import "./App.css";
import { Routes, Route, Navigate } from "react-router-dom";
import Login from "./pages/Auth/Login/Login";
import Signup from "./pages/Auth/Signup/Signup";
import Fail from "./pages/Cancel/Fail";
import LandingPage from "./pages/LandingPage/LandingPage";
import { Productpage } from "./pages/ProductPage/Productpage";
import { SearchPage } from "./pages/SearchPage/SearchPage";
import { CartPage } from "./pages/Cartpage/CartPage";
import { CheckoutPage } from "./pages/CheckoutPage/CheckoutPage";
import { PaymentPage } from "./pages/PaymentPage/PaymentPage";
import { ResetPassword } from "./pages/Auth/ResetPassword/ResetPassword";
import { ForgetPassword } from "./pages/Auth/ForgetPassword/ForgetPassword";
import { Success } from "./pages/Success/Success";
import { FilterPage } from "./pages/SearchPage/FilterPage";
import { createTheme, ThemeProvider } from "@mui/material/styles";
import { useEffect } from "react";
function Apps() {
  useEffect(() => {
    window.scrollTo(0, 0);
    console.log(process.env.REACT_APP_BackendURL, "Backend URL");
  }, []);

  return (
    <div className="Apps">
      <Routes>
        <Route path="/" element={<LandingPage />} />
        <Route path="/login/" element={<Login />} />
        <Route path="/signup" element={<Signup />}></Route>
        <Route path="/forgetpassword" element={<ForgetPassword />}></Route>
        <Route path="/resetpassword" element={<ResetPassword />}></Route>
        <Route path="/product" element={<Productpage />} />
        <Route path="/search-page" element={<SearchPage />}></Route>
        <Route path="/cart-page" element={<CartPage />}></Route>
        <Route path="/checkout" element={<CheckoutPage />}></Route>
        <Route path="/payment" element={<PaymentPage />}></Route>
        <Route path="/Success" element={<Success />}></Route>
        <Route path="/Fail" element={<Fail />}></Route>
        <Route path="/filter" element={<FilterPage />}></Route>
        <Route path="*" element={<Navigate to="/" replace={true} />}></Route>
        {/* <Route path="/favorite" element={<FavoritePage />}></Route> */}
      </Routes>
    </div>
  );
}
export default function App() {
  const theme = createTheme();
  return <Apps />;
}
