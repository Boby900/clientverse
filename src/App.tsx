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
import { TableDemo } from "./pages/dashboard/Home";
import AllCollection from "./pages/dashboard/AllCollection";
import Pinata from "./pages/dashboard/uploadPinata";
import EditCard from "./pages/dashboard/EditCard";

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
        <Route path="/dashboard" element={<Sidebar />}>
          <Route index element={<TableDemo />} /> {/* Default child route */}
          <Route path="collections" element={<AllCollection />} />
          <Route path="logs" element={<h1>Logs Component</h1>} />
          <Route path="settings" element={<Pinata />} />
          <Route path="card/:id" element={<EditCard />} /> {/* New route for card details */}

        </Route>{" "}
      </Routes>
    </div>
  );
}

export default App;
