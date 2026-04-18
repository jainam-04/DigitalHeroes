import {useEffect, useState} from "react";
import api from "../utils/api";
import MainLayout from "../layouts/MainLayout";

export default function Admin() {
  const token = localStorage.getItem("token");

  const [users, setUsers] = useState([]);
  const [draw, setDraw] = useState(null);

  useEffect(() => {
    fetchUsers();
  }, []);

  const fetchUsers = async () => {
    const res = await api.get("/admin/users", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setUsers(res.data);
  };

  const runDraw = async () => {
    const res = await api.post(
      "/admin/draw",
      {},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setDraw(res.data);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Admin Dashboard</h1>

        <button
          onClick={runDraw}
          className="bg-green-600 px-6 py-3 rounded mb-8"
        >
          Run Monthly Draw
        </button>

        <div className="mb-10">
          <h2 className="text-2xl mb-4">Users</h2>

          {users.map((user) => (
            <div key={user._id} className="bg-zinc-900 p-4 rounded mb-2">
              {user.name} - {user.email}
            </div>
          ))}
        </div>

        {draw && (
          <div className="bg-zinc-900 p-6 rounded">
            <h2 className="text-2xl mb-4">Draw Numbers:</h2>

            <p>{draw.numbers.join(", ")}</p>

            <h3 className="mt-6 text-xl">Winners:</h3>

            {draw.winners.length === 0 ? (
              <p>No winners</p>
            ) : (
              draw.winners.map((w, i) => (
                <p key={i}>
                  {w.name} - {w.matchType} Matches - ₹{w.prize.toFixed(0)}
                </p>
              ))
            )}
          </div>
        )}
      </div>
    </MainLayout>
  );
}
