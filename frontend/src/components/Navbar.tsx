import { useState } from "react";
import AuthModal from "../components/AuthModal";
import "../styles/navbar.css";
import userImg from "../assets/images/user.png";

const Navbar = () => {
  const [authModal, setAuthModal] = useState({
    open: false,
    mode: "login" as "login" | "register",
  });

  const [menuOpen, setMenuOpen] = useState(false);

  return (
    <nav className="navbar">
      <div className="navbar-left">
        <h2 className="logo">PitWall</h2>
      </div>

      <div className="navbar-right">
        <img
          src={userImg}
          alt="User"
          className="user-icon"
          onClick={() => setMenuOpen(!menuOpen)}
        />

        {menuOpen && (
          <div className="dropdown">
            <button onClick={() => setAuthModal({ open: true, mode: "login" })}>
              Log In
            </button>
            <button
              onClick={() => setAuthModal({ open: true, mode: "register" })}
            >
              Sign In
            </button>
          </div>
        )}
      </div>

      {authModal.open && (
        <AuthModal
          onClose={() => setAuthModal({ ...authModal, open: false })}
          initialMode={authModal.mode}
        />
      )}
    </nav>
  );
};

export default Navbar;
