import { useEffect, useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import DashboardWrapper from "./Layout/DashboardWrapper";

import Login from "./Pages/Login";
import Register from "./Pages/Register";
import { QueryClient, QueryClientProvider } from "@tanstack/react-query";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";
import { store } from "./Redux/store";
import { loadCustomer } from "./Redux/Reducer/Customer";
import DashboardHome from "./Pages/DashboardHome";
import Homepage from "./Pages/E-Commerce/Homepage";
import EcommerceLayout from "./Layout/EcommerceLayout";
const queryClient = new QueryClient();
function App() {
  const [count, setCount] = useState(0);

  useEffect(() => {
    store.dispatch(loadCustomer());
  }, []);
  return (
    <div className="">
      <QueryClientProvider client={queryClient}>
        <ToastContainer />
        <Routes>
          <Route
            path="/"
            element={
              <DashboardWrapper>
                <DashboardHome />
              </DashboardWrapper>
            }
          />
          <Route path="/login" element={<Login />} />
          <Route path="/register" element={<Register />} />
          <Route
            path="/homepage"
            element={
              <EcommerceLayout>
                <Homepage />
              </EcommerceLayout>
            }
          />
        </Routes>
      </QueryClientProvider>
    </div>
  );
}

export default App;
