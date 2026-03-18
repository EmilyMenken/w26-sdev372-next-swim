import { Link } from "react-router-dom";
import "../styles/navBarStyles.css";

export default function Navbar() {
  return (
    <nav className="navbar">

      <div className="navbar-logo">
        NS
      </div>

      <div className="navbar-links">
        <Link to="/">Home</Link>
        <Link to="/quiz">Quiz</Link>
        <Link to="/resources">Aquatic Resources</Link>
      </div>

    </nav>
  );
}