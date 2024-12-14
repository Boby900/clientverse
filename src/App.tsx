import "./App.css";
import SignUp from "./auth/SignUp";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";
import Page2 from "./layout/Page2";
import { Routes, Route } from "react-router";
import Page from "./pages/dashboard/Page";
import Login from "./auth/Login";

function App() {
  return (
    <div>
     
      <Routes>
        <Route
          path="/"
          element={
            <>
             <Navbar />
              <Main />
              <Page2 />
              <Footer />
            </>
          }
        />
        <Route
          path="/signup"
          element={
            <>
              <SignUp />
            </>
          }
        />
        <Route
          path="/login"
          element={
            <>
              <Login />
            </>
          }
        />
        <Route
          path="/dashboard"
          element={
            <>
              <Page />
            </>
          }
        />
      </Routes>
    
    </div>
  );
}

export default App;
