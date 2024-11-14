import { useEffect, useState } from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import Home from "./components/Home";
import Navbar from "./components/Navbar";
import About from "./components/About";
import Contact from "./components/Contact";
import AddFund from "./components/AddFund";
import Footer from "./components/Footer";
import Login from "./components/Login";
import Signup from "./components/Signup";
import Dashboard from "./components/Dashboard";
import Verify from "./components/Verify";
import PrivacyPolicy from "./components/PrivacyPolicy";
import TermsConditions from "./components/TermsConditions";
import Refund from "./components/Refund";
import Shipingpolicy from "./components/Shipingpolicy";
import Backend from "./components/Backend";
import AddProduct from "./components/AddProduct";
import Chat from "./components/Chat";
import MyProducts from "./components/MyProducts";
import Profile from "./components/Profile";
import BuyProduct from "./components/BuyProduct";
import Upurchase from "./components/Upurchase";
import Spurchase from "./components/Spurchase";

function App() {
  const [logged, setLogged] = useState(false);
  const [isLogged, setIsLogged] = useState(false);
  let auth = localStorage.getItem("user");
  useEffect(() => {
    let data = fetch(`${Backend}`);
    if (auth) {
      setIsLogged(true);
    }
  }, []);

  return (
    <>
      <BrowserRouter>
        <Navbar logged={logged} />
        <Routes>
          <Route path="/" element={<Home isLogged={isLogged} />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
          <Route path="/add-funds" element={<AddFund />} />
          <Route path="/login" element={<Login setLogged={setLogged} />} />
          <Route path="/signup" element={<Signup />} />
          <Route path="/dashboard" element={<Dashboard />} />
          <Route path="/myproducts" element={<MyProducts />} />
          <Route path="/addproduct" element={<AddProduct />} />
          <Route path="/ai" element={<Chat />} />
          <Route path="/profile" element={<Profile />} />
          <Route path="/upurchase/:id" element={<Upurchase />} />
          <Route path="/spurchase/:id" element={<Spurchase />} />

          <Route path="/buy/:id" element={<BuyProduct />} />

          <Route path="/verify" element={<Verify setLogged={setLogged} />} />
          <Route path="/privacypolicy" element={<PrivacyPolicy />} />
          <Route path="termsandcondition" element={<TermsConditions />} />
          <Route path="refundpolicy" element={<Refund />} />
          <Route path="shippingpolicy" element={<Shipingpolicy />} />
          <Route path="/*" element={<h1>404 page not found</h1>} />
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
