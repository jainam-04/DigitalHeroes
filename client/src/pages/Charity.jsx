import {useEffect, useState} from "react";
import api from "../utils/api";
import MainLayout from "../layouts/MainLayout";

export default function Charity() {
  const [charities, setCharities] = useState([]);
  const [donation, setDonation] = useState(10);

  const token = localStorage.getItem("token");

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/charities");
    setCharities(res.data);
  };

  const selectCharity = async (charityId) => {
    try {
      await api.post(
        "/user/charity",
        {
          charityId,
          donationPercent: donation,
        },
        {
          headers: {
            Authorization: `Bearer ${token}`,
          },
        },
      );

      alert("Charity selected successfully!");
    } catch (error) {
      alert("Failed to save charity");
    }
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white px-4 md:px-10 py-8">
        <h1 className="text-4xl font-bold mb-8">Choose Charity</h1>

        <div className="mb-8">
          <label className="block mb-2 text-zinc-400">
            Donation Percentage
          </label>

          <input
            type="number"
            min="10"
            max="100"
            value={donation}
            onChange={(e) => setDonation(e.target.value)}
            className="bg-zinc-900 p-3 rounded w-40"
          />
        </div>

        <div className="grid grid-cols-1 md:grid-cols-3 gap-6">
          {charities.map((item) => (
            <div
              key={item._id}
              className="bg-zinc-900 p-6 rounded-2xl border border-zinc-800"
            >
              <h2 className="text-2xl font-bold">{item.name}</h2>

              <p className="text-zinc-400 mt-3">{item.description}</p>

              <button
                onClick={() => selectCharity(item._id)}
                className="mt-6 bg-green-600 px-5 py-2 rounded hover:bg-green-500"
              >
                Select Charity
              </button>
            </div>
          ))}
        </div>
      </div>
    </MainLayout>
  );
}
