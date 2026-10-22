import { BrowserRouter, Routes, Route, Link } from "react-router-dom";
import "./App.css";

function Pages({ title, children }) {
  return (
    <div className="card">
      <h2>{title}</h2>
      {children}
    </div>
  );
}

function App() {
  return (
    <BrowserRouter>
      <h1>Student Management</h1>

      <nav>
        <Link to="/">Register</Link>
        <Link to="/login">Login</Link>
        <Link to="/contact">Contact</Link>
        <Link to="/about">About</Link>
      </nav>

      <Routes>
        <Route path="/"
          element={
            <Pages title="Registration Page">
              <input placeholder="Enter your Name" />
              <input placeholder="Email" />
              <input placeholder="Password" />
              <button>Register</button>
            </Pages>
          }
        />

        <Route
          path="/login"
          element={
            <Pages title="Login">
              <input placeholder="Email" />
              <input placeholder="Password" />
              <button>Login</button>
            </Pages>
          }
        />

        <Route
          path="/contact"
          element={
            <Pages title="Contact">
              <p>Email: student@college.com</p>
            </Pages>
          }
        />

        <Route
          path="/about"
          element={
            <Pages title="About">
              <p>Student Management System using React.</p>
            </Pages>
          }
        />
      </Routes>
    </BrowserRouter>
  );
}

export default App;
