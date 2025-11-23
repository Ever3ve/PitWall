import Navbar from "./components/Navbar";
import { Home } from "./pages/Home";
import { ToastContainer } from "react-toastify";
import "react-toastify/dist/ReactToastify.css";

function App() {
  return (
    <>
      <Navbar />
      <Home />
      <ToastContainer position="top-right" autoClose={2000} />
    </>
  );
}

export default App;
