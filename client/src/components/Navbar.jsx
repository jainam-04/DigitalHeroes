import {Link, useNavigate} from "react-router-dom";

export default function Navbar() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <nav className="bg-zinc-950 text-white px-6 py-4 border-b border-zinc-800">
      <div className="max-w-7xl mx-auto flex justify-between items-center">
        <Link to="/dashboard" className="text-2xl font-bold text-blue-500">
          DigitalHeroes
        </Link>

        <div className="flex gap-5 items-center text-sm md:text-base">
          <Link to="/dashboard">Dashboard</Link>
          <Link to="/scores">Scores</Link>
          <Link to="/charity">Charity</Link>
          <Link to="/subscription">Plans</Link>

          {user?.role === "admin" && <Link to="/admin">Admin</Link>}

          <button onClick={logout} className="bg-red-600 px-4 py-1 rounded">
            Logout
          </button>
        </div>
      </div>
    </nav>
  );
}
