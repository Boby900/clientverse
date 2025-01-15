import "./App.css";
import SignUp from "./auth/SignUp";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";
import Page2 from "./layout/Page2";
import { Routes, Route } from "react-router";
import Login from "./auth/Login";
import ErrorPage from "./components/ui/error";
import Sidebar from "./pages/dashboard/Sidebar";

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
        {/* Catch-all route for undefined paths */}
        <Route path="*" element={<ErrorPage />} />
        <Route path="/signup" element={<SignUp />} />
        <Route path="/login" element={<Login />} />
        <Route path="/dashboard" element={<Sidebar />} />
      </Routes>
    </div>
  );
}

export default App;
