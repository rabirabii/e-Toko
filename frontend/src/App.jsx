import { useState } from "react";
import "./App.css";
import { Button } from "./components/ui/button";
import Navbar from "./components/Navbar";
import { Route, Routes } from "react-router-dom";
import DashboardWrapper from "./Layout/DashboardWrapper";
import Homepage from "./Pages/Homepage";

function App() {
  const [count, setCount] = useState(0);

  return (
    <div className="">
      <Routes>
        <Route
          path="/"
          element={
            <DashboardWrapper>
              <Homepage />
            </DashboardWrapper>
          }
        />
      </Routes>
    </div>
  );
}

export default App;
