import {useNavigate} from "react-router-dom";

export default function Dashboard() {
  const navigate = useNavigate();

  const user = JSON.parse(localStorage.getItem("user"));

  const logout = () => {
    localStorage.clear();
    navigate("/login");
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl font-bold">Welcome, {user?.name}</h1>

      <p className="mt-4">{user?.email}</p>

      <button onClick={logout} className="mt-6 bg-red-600 px-6 py-2 rounded">
        Logout
      </button>
    </div>
  );
}
