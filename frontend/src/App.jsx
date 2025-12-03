import Home from "./components/Home.jsx";
import Shop from "./components/Shop.jsx";
import Product from "./components/Product.jsx";
import { Routes } from "react-router-dom";
import { BrowserRouter, Route } from "react-router-dom";
import Cart from "./components/Cart.jsx";
import Checkout from "./components/Checkout.jsx";
import Login from "./components/admin/Login.jsx";
import { ToastContainer } from "react-toastify";
import Dashboard from "./components/admin/Dashboard.jsx";
import { AdminRequireAuth } from "./components/admin/AdminRequireAuth.jsx";
import { default as ShowCategories } from "./components/admin/category/Show.jsx";
import { default as CreateCategory } from "./components/admin/category/Create.jsx";
import { default as EditCategory } from "./components/admin/category/Edit.jsx";

function App() {
  return (
    <>
      <BrowserRouter>
        <Routes>
          <Route path="/" element={<Home />} />
          <Route path="/shop" element={<Shop />} />
          <Route path="/product/" element={<Product />} />
          <Route path="/cart" element={<Cart />} />
          <Route path="/checkout" element={<Checkout />} />
          <Route path="/admin/login" element={<Login />} />
          <Route
            path="/admin/dashboard"
            element={
              <AdminRequireAuth>
                <Dashboard />
              </AdminRequireAuth>
            }
          />
          <Route
            path="/admin/categories"
            element={
              <AdminRequireAuth>
                <ShowCategories></ShowCategories>
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/categories/create"
            element={
              <AdminRequireAuth>
                <CreateCategory></CreateCategory>
              </AdminRequireAuth>
            }
          />

          <Route
            path="/admin/categories/edit/:id"
            element={
              <AdminRequireAuth>
                <EditCategory></EditCategory>
              </AdminRequireAuth>
            }
          />
        </Routes>
      </BrowserRouter>
      <ToastContainer />
    </>
  );
}

export default App;
