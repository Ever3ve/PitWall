import { toast } from "react-toastify";
import CustomToast from "../components/CustomToast";
import "react-toastify/dist/ReactToastify.css";

const success = (message: string) => {
  toast(<CustomToast message={message} />, {
    autoClose: false,
    position: "top-right",
    hideProgressBar: true,
  });
};

export default success;
