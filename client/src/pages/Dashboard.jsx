import {useEffect, useState} from "react";
import api from "../utils/api";
import MainLayout from "../layouts/MainLayout";

export default function Dashboard() {
  const [data, setData] = useState({});
  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchDashboard();
  }, []);

  const fetchDashboard = async () => {
    const res = await api.get("/user/dashboard", {
      headers: {
        Authorization: `Bearer ${token}`,
      },
    });

    setData(res.data);
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl font-bold mb-8">Welcome {data.name}</h1>

        <div className="grid md:grid-cols-2 gap-6">
          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2>Status</h2>
            <p>{data.subscriptionStatus}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2>Plan</h2>
            <p>{data.planType}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2>Scores Stored</h2>
            <p>{data.totalScores}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2>Total Won</h2>
            <p>₹{data.totalWon}</p>
          </div>

          <div className="bg-zinc-900 p-6 rounded-xl">
            <h2>Selected Charity</h2>
            <p>{data.charity?.name || "Not Selected"}</p>
          </div>
        </div>
      </div>
    </MainLayout>
  );
}
