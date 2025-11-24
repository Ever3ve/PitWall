import { useEffect, useState } from "react";
import carImg from "../assets/images/f1.png";
import "../styles/customtoast.css";

const CustomToast = ({ message, closeToast, duration = 3000 }: any) => {
  const [progress, setProgress] = useState(0);

  useEffect(() => {
    const interval = 30;
    const step = 100 / (duration / interval);

    const timer = setInterval(() => {
      setProgress((prev) => {
        const next = prev + step;
        if (next >= 100) {
          clearInterval(timer);
          closeToast();
        }
        return Math.min(next, 100);
      });
    }, interval);

    return () => clearInterval(timer);
  }, [duration, closeToast]);

  return (
    <div className="custom-toast">
      <div className="toast-message">{message}</div>
      <div className="progress-bar">
        <div
          className="progress-fill"
          style={{ width: `${progress}%`, backgroundColor: "#c80000" }}
        ></div>
        <img
          src={carImg}
          alt="toast Car"
          className="toast-car"
          style={{ left: `${progress}%` }}
        />
      </div>
    </div>
  );
};

export default CustomToast;
