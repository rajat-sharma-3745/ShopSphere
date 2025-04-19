import React from "react";
import { BrowserRouter, Route, Routes } from "react-router-dom";
import UserLayout from "./components/Layout/UserLayout";
import Home from "./Pages/Home";
import { Toaster } from "sonner";
import Login from "./Pages/Login";
import Register from "./Pages/Register";
import Profile from "./Pages/Profile";
import CollectionPage from "./Pages/CollectionPage";
import ProductDetails from "./components/Products/ProductDetails";
import Checkout from "./components/Cart/Checkout";
import OrderConfirmationPage from "./Pages/OrderConfirmationPage";
import OrderDetails from "./Pages/OrderDetails";
import MyOrderPage from "./Pages/MyOrderPage";
import AdminLayout from "./components/Admin/AdminLayout";
import AdminHomePage from "./Pages/AdminHomePage";
import UserManagement from "./components/Admin/UserManagement";
import ProductManagement from "./components/Admin/ProductManagement";
import EditProductPage from "./components/Admin/EditProductPage";
import OrderManagement from "./components/Admin/OrderManagement";
import { Provider } from "react-redux";
import store from "./redux/store";
import ProtectedRoute from "./components/Common/ProtectedRoute";
import { ScrollToTop } from "./components/Common/ScrollToTop";
import AdminGetOrderDetails from "./components/Admin/AdminGetOrderDetails";
import AddProductPage from "./components/Admin/AddProductPage";
import UpdateProfile from "./Pages/UpdateProfile";
import DeleteModal from "./components/Admin/DeleteModal";

function App() {
  return (
    <Provider store={store}>
      <BrowserRouter>
        <ScrollToTop/>
        <Toaster position="top-right" />
        <Routes>
          {/* User Layout */}
          <Route path="register" element={<Register />} />
          <Route path="/" element={<UserLayout />}>
            <Route index element={<Home />} />
            <Route path="login" element={<Login />} />
            <Route path="loader" element={<DeleteModal />} />
            {/* <Route path="register" element={<Register />} /> */}
            <Route path="profile" element={<Profile />} />
            <Route path="update-profile" element={<UpdateProfile />} />
            <Route
              path="collections/:collection"
              element={<CollectionPage />}
            />
            <Route path="product/:id" element={<ProductDetails />} />
            <Route path="checkout" element={<Checkout />} />
            <Route
              path="order-confirmation"
              element={<OrderConfirmationPage />}
            />
            <Route path="order/:id" element={<OrderDetails />} />
            <Route path="my-orders" element={<MyOrderPage />} />
          </Route>
          {/* Admin Layout */}
          <Route
            path="/admin"
            element={
              <ProtectedRoute role="admin">
                <AdminLayout />
              </ProtectedRoute>
            }
          >
            <Route index element={<AdminHomePage />} />
            <Route path="users" element={<UserManagement />} />
            <Route path="products" element={<ProductManagement />} />
            <Route path="orders" element={<OrderManagement />} />
            <Route path="order/:id" element={<AdminGetOrderDetails />} />
            <Route path="products/:id/edit" element={<EditProductPage />} />
            <Route path="products/add" element={<AddProductPage />} />
          </Route>
        </Routes>
      </BrowserRouter>
    </Provider>
  );
}

export default App;
