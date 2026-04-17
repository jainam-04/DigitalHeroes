import {useEffect, useState} from "react";
import api from "../utils/api";

export default function Charity() {
  const [charities, setCharities] = useState([]);

  useEffect(() => {
    fetchData();
  }, []);

  const fetchData = async () => {
    const res = await api.get("/charities");
    setCharities(res.data);
  };

  return (
    <div className="min-h-screen bg-black text-white p-10">
      <h1 className="text-4xl mb-8">Choose Charity</h1>

      <div className="grid md:grid-cols-3 gap-6">
        {charities.map((item) => (
          <div key={item._id} className="bg-zinc-900 p-6 rounded-xl">
            <h2>{item.name}</h2>
            <p>{item.description}</p>
          </div>
        ))}
      </div>
    </div>
  );
}
