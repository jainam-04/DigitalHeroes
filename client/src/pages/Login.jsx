import {useState} from "react";
import {useNavigate, Link} from "react-router-dom";
import api from "../utils/api";

export default function Login() {
  const navigate = useNavigate();

  const [form, setForm] = useState({
    email: "",
    password: "",
  });

  const handleChange = (e) => {
    setForm({
      ...form,
      [e.target.name]: e.target.value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      const res = await api.post("/auth/login", form);

      localStorage.setItem("token", res.data.token);
      localStorage.setItem("user", JSON.stringify(res.data.user));

      navigate("/dashboard");
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  return (
    <div className="min-h-screen bg-black text-white flex justify-center items-center">
      <form
        onSubmit={handleSubmit}
        className="bg-zinc-900 p-8 rounded-xl w-96 space-y-4"
      >
        <h2 className="text-3xl font-bold">Login</h2>

        <input
          name="email"
          placeholder="Email"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <input
          type="password"
          name="password"
          placeholder="Password"
          onChange={handleChange}
          className="w-full p-3 rounded bg-zinc-800"
        />

        <button className="w-full bg-blue-600 py-3 rounded">Login</button>

        <Link to="/register">Create account</Link>
      </form>
    </div>
  );
}
