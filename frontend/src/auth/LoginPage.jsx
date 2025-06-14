import { useState } from "react";
import { useAuth } from "./AuthContext";
import { Link } from "react-router-dom";

const LoginPage = () => {
  const { login } = useAuth();
  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handelChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    const success = await login(form.email, form.password);
    if (success) {
      console.log("Login successful");
    } else {
      console.error("Login failed");
    }
  };

  return (
    <form onSubmit={handleSubmit}>
      <h2>Login</h2>
      <input
        type="email"
        name="email"
        placeholder="Email"
        value={form.email}
        onChange={handelChange}
        required
      />
      <input
        type="password"
        name="password"
        placeholder="Password"
        value={form.password}
        onChange={handelChange}
        required
      />
      <button type="submit">Login</button>
      <p>
        
        Don't have an account? <Link to="/register">Register</Link>
      </p>
    </form>
  );
};

export default LoginPage;
