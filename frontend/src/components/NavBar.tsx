import { Link } from "react-router-dom";
import "../styles/navBarStyles.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <Link to="/" className="navbar-logo">
        NS
      </Link>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/resources">Resources</Link>
      </div>

    </nav>
  );
}