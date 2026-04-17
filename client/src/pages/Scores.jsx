import {useEffect, useState} from "react";
import api from "../utils/api";

export default function Scores() {
  const [score, setScore] = useState("");
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

  const deleteScore = async (id) => {
    await api.delete(`/scores/${id}`, {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    fetchScores();
  };

  return (
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
          <div
            key={item._id}
            className="bg-zinc-900 p-4 rounded flex justify-between"
          >
            <div>
              {item.date} - Score: {item.score}
            </div>

            <button
              onClick={() => deleteScore(item._id)}
              className="bg-red-600 px-4 rounded"
            >
              Delete
            </button>
          </div>
        ))}
      </div>
    </div>
  );
}
