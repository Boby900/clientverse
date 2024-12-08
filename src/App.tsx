import "./App.css";
import SignIn from "./auth/SignIn";
import Footer from "./layout/Footer";
import Main from "./layout/Main";
import Navbar from "./layout/Navbar";
import Page2 from "./layout/Page2";
import { Routes, Route } from "react-router";

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
          path="/login"
          element={
            <>
              <SignIn />
            </>
          }
        />
      </Routes>
    
    </div>
  );
}

export default App;
