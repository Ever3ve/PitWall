import { useContext, useState } from "react";
import success from "../utils/toastService";
import { AuthContext } from "../context/AuthContext";
import { login, register } from "../api/auth";
import "../styles/authmodal.css";

const AuthModal = ({
  onClose,
  initialMode,
}: {
  onClose: () => void;
  initialMode: "login" | "register";
}) => {
  const { setUser } = useContext(AuthContext);
  const [mode, setMode] = useState<"login" | "register">(initialMode);
  const [form, setForm] = useState({ username: "", email: "", password: "" });

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    try {
      if (mode === "login") {
        const res = await login({
          username: form.username,
          password: form.password,
        });
        console.log("LOGIN RESPONSE:", res.data);
        success("Успішний вхід!");
        const user = res.data.user ?? res.data;
        setUser(user);
        localStorage.setItem("DanielRicciardoSupremacy", res.data.token);
        localStorage.setItem("user", JSON.stringify(user));
      } else {
        await register(form);
        success("Акаунт створено!");
      }

      onClose();
    } catch (err) {
      console.log(err);
    }
  };

  return (
    <div className="modal-backdrop">
      <div className="modal">
        <button className="close-btn" onClick={onClose}>
          ✖
        </button>

        <h2>{mode === "login" ? "Увійти" : "Зареєструватись"}</h2>

        <form onSubmit={handleSubmit}>
          <input
            type="text"
            placeholder="Username"
            value={form.username}
            onChange={(e) => setForm({ ...form, username: e.target.value })}
          />

          {mode === "register" && (
            <input
              type="email"
              placeholder="Email"
              value={form.email}
              onChange={(e) => setForm({ ...form, email: e.target.value })}
            />
          )}

          <input
            type="password"
            placeholder="Password"
            value={form.password}
            onChange={(e) => setForm({ ...form, password: e.target.value })}
          />

          <button type="submit" className="submit-btn">
            {mode === "login" ? "Увійти" : "Створити акаунт"}
          </button>
        </form>

        <p className="switch-text">
          {mode === "login" ? (
            <>
              Немає акаунта?
              <span onClick={() => setMode("register")}>Зареєструйся</span>
            </>
          ) : (
            <>
              Вже є акаунт?
              <span onClick={() => setMode("login")}>Увійти</span>
            </>
          )}
        </p>
      </div>
    </div>
  );
};

export default AuthModal;
