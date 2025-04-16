import { Link } from "react-router-dom";

export default function Navbar() {
  return (
    <nav className="navbar navbar-expand navbar-dark bg-dark">
      <div className="container">
        <Link className="navbar-brand" to="/">
          Contact Book
        </Link>
        <div>
          <Link className="btn btn-outline-light me-2" to="/">
            Home
          </Link>
          <Link className="btn btn-outline-light" to="/new">
            Add Contact
          </Link>
        </div>
      </div>
    </nav>
  );
}
