import React, { useEffect } from "react";
import Header from "../Common/Header";
import Footer from "../Common/Footer";
import { Outlet } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { fetchCart } from "../../redux/slice/cartSlice";

function UserLayout() {
  const dispatch = useDispatch();
  const { user, guestId, isLoading } = useSelector((state) => state.auth);
  useEffect(() => {
    if (user) dispatch(fetchCart({ userId: user, guestId }));
  }, [dispatch, user]);

  return (
    <>
      {/* Header */}
      <Header />
      {/* Main content */}
      <main>
        <Outlet />
      </main>
      {/* Footer */}
      <Footer />
    </>
  );
}

export default UserLayout;
