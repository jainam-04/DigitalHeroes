import {useEffect, useState} from "react";
import api from "../utils/api";
import MainLayout from "../layouts/MainLayout";

export default function Scores() {
  const [score, setScore] = useState("");
  const [editId, setEditId] = useState(null);
  const [editScore, setEditScore] = useState("");
  const [date, setDate] = useState("");
  const [scores, setScores] = useState([]);

  const token = localStorage.getItem("token");

  const fetchScores = async () => {
    const res = await api.get("/scores/my", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setScores(res.data);
  };

  useEffect(() => {
    fetchScores();
  }, []);

  const handleSubmit = async (e) => {
    e.preventDefault();

    try {
      await api.post(
        "/scores/add",
        {score, date},
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      setScore("");
      setDate("");

      fetchScores();
    } catch (error) {
      alert(error.response.data.message);
    }
  };

  const updateScore = async () => {
    await api.put(
      `/scores/${editId}`,
      {score: editScore},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );

    setEditId(null);
    setEditScore("");
    fetchScores();
  };

  const deleteScore = async (id) => {
    await api.delete(`/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchScores();
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-6">My Golf Scores</h1>

        <form onSubmit={handleSubmit} className="flex gap-4 mb-8">
          <input
            type="number"
            placeholder="Score"
            value={score}
            onChange={(e) => setScore(e.target.value)}
            className="p-3 rounded bg-zinc-800"
          />

          <input
            type="date"
            value={date}
            onChange={(e) => setDate(e.target.value)}
            className="p-3 rounded bg-zinc-800"
          />

          <button className="bg-green-600 px-6 rounded">Add</button>
        </form>

        <div className="space-y-3">
          {scores.map((item) => (
            <div key={item._id} className="bg-zinc-900 p-4 rounded mb-3">
              <p>{item.date}</p>

              {editId === item._id ? (
                <div className="flex gap-3 mt-2">
                  <input
                    value={editScore}
                    onChange={(e) => setEditScore(e.target.value)}
                    className="bg-zinc-800 p-2 rounded"
                  />

                  <button
                    onClick={updateScore}
                    className="bg-green-600 px-4 rounded"
                  >
                    Save
                  </button>
                </div>
              ) : (
                <p>Score: {item.score}</p>
              )}

              <div className="flex gap-3 mt-3">
                <button
                  onClick={() => {
                    setEditId(item._id);
                    setEditScore(item.score);
                  }}
                  className="bg-blue-600 px-4 py-1 rounded"
                >
                  Edit
                </button>

                <button
                  onClick={() => deleteScore(item._id)}
                  className="bg-red-600 px-4 py-1 rounded"
                >
                  Delete
                </button>
              </div>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
