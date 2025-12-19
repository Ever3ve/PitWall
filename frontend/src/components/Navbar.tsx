import { useState, useContext } from "react";
import { Link } from "react-router-dom";
import AuthModal from "../components/AuthModal";
import "../styles/navbar.css";
import userImg from "../assets/images/user.png";
import { AuthContext } from "../context/AuthContext";

const Navbar = () => {
  const { user, setUser } = useContext(AuthContext);
  const [authModal, setAuthModal] = useState<{
    open: boolean;
    mode: "login" | "register";
  }>({
    open: false,
    mode: "login",
  });

  const [menuOpen, setMenuOpen] = useState(false);

  const handleLogout = () => {
    localStorage.removeItem("DanielRicciardoSupremacy");
    localStorage.removeItem("user");
    setUser(null);
  };

  return (
    <div className="sidebar">
      <h2 className="logo">PitWall</h2>

      {user ? (
        <div className="menu-items">
          <Link to="/calendar">
            <button>Календар</button>
          </Link>
          <Link to="/profile">
            <button>Профіль</button>
          </Link>
          <button onClick={handleLogout}>Вийти</button>
        </div>
      ) : (
        <div className="auth-section">
          <img
            src={userImg}
            alt="User"
            className="user-icon"
            onClick={() => setMenuOpen(!menuOpen)}
          />
          {menuOpen && (
            <div className="dropdown">
              <button
                onClick={() => setAuthModal({ open: true, mode: "login" })}
              >
                Log In
              </button>
              <button
                onClick={() => setAuthModal({ open: true, mode: "register" })}
              >
                Sign Up
              </button>
            </div>
          )}
        </div>
      )}

      {authModal.open && (
        <AuthModal
          onClose={() => setAuthModal((prev) => ({ ...prev, open: false }))}
          initialMode={authModal.mode}
        />
      )}
    </div>
  );
};

export default Navbar;
