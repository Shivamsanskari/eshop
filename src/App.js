import { BrowserRouter, Routes, Route } from "react-router-dom";
import styles from './App.module.scss';
// Pages
import { Home, Contact, Login, Register, Reset, Cart, Admin } from './pages';

// Components
import { Header, Footer } from './components';

import AdminOnlyRoute from "./components/adminOnlyRoutes/AdminOnlyRoute";

import { ToastContainer } from 'react-toastify';
import 'react-toastify/dist/ReactToastify.css';


function App() {

  return (
    <>
      <BrowserRouter>
        <ToastContainer style={{ fontSize: "1.3rem" }} />
        <Header />
        <Routes>
          <Route path="/" element={<Home />}></Route>
          <Route path="/contact" element={<Contact />}></Route>
          <Route path="/login" element={<Login />}></Route>
          <Route path="/register" element={<Register />}></Route>
          <Route path="/reset" element={<Reset />}></Route>

          <Route path="/admin/*" element={<AdminOnlyRoute><Admin /></AdminOnlyRoute>}></Route>

          <Route path="/cart" element={<Cart />}></Route>
        </Routes>
        <Footer />
      </BrowserRouter>
    </>
  );
}

export default App;
