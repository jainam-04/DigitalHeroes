// import {useEffect, useState} from "react";
// import api from "../utils/api";
// import MainLayout from "../layouts/MainLayout";

// export default function Dashboard() {
//   const [data, setData] = useState({});
//   const token = localStorage.getItem("token");

//   useEffect(() => {
//     fetchDashboard();
//   }, []);

//   const fetchDashboard = async () => {
//     const res = await api.get("/user/dashboard", {
//       headers: {
//         Authorization: `Bearer ${token}`,
//       },
//     });

//     setData(res.data);
//   };

//   return (
//     <MainLayout>
//       <div className="min-h-screen bg-black text-white p-10">
//         <h1 className="text-4xl font-bold mb-8">Welcome {data.name}</h1>

//         <div className="grid md:grid-cols-2 gap-6">
//           <div className="bg-zinc-900 p-6 rounded-xl">
//             <h2>Status</h2>
//             <p>{data.subscriptionStatus}</p>
//           </div>

//           <div className="bg-zinc-900 p-6 rounded-xl">
//             <h2>Plan</h2>
//             <p>{data.planType}</p>
//           </div>

//           <div className="bg-zinc-900 p-6 rounded-xl">
//             <h2>Scores Stored</h2>
//             <p>{data.totalScores}</p>
//           </div>

//           <div className="bg-zinc-900 p-6 rounded-xl">
//             <h2>Total Won</h2>
//             <p>₹{data.totalWon}</p>
//           </div>

//           <div className="bg-zinc-900 p-6 rounded-xl">
//             <h2>Selected Charity</h2>
//             <p>{data.charity?.name || "Not Selected"}</p>
//           </div>
//         </div>
//       </div>
//     </MainLayout>
//   );
// }

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
    try {
      const res = await api.get("/user/dashboard", {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      });

      setData(res.data);
    } catch (error) {
      console.log(error);
    }
  };

  const Card = ({title, value}) => (
    <div className="bg-zinc-900 rounded-2xl p-6 border border-zinc-800 shadow-lg">
      <p className="text-zinc-400 text-sm">{title}</p>
      <h2 className="text-3xl font-bold mt-2">{value}</h2>
    </div>
  );

  return (
    <MainLayout>
      <div className="px-4 md:px-10 py-8 text-white">
        <h1 className="text-4xl font-bold mb-2">Welcome {data.name}</h1>

        <p className="text-zinc-400 mb-8">
          Track performance, win rewards, support causes.
        </p>

        <div className="grid grid-cols-1 md:grid-cols-2 lg:grid-cols-4 gap-6">
          <Card title="Scores Stored" value={data.scoresStored || 0} />

          <Card title="Highest Score" value={data.highestScore || 0} />

          <Card title="Average Score" value={data.averageScore || 0} />

          <Card title="Latest Score" value={data.latestScore || 0} />

          <Card
            title="Subscription"
            value={data.subscriptionStatus || "inactive"}
          />

          <Card title="Plan" value={data.planType || "None"} />

          <Card
            title="Selected Charity"
            value={data.charity?.name || "Not Selected"}
          />

          <Card title="Total Won" value={`₹${data.totalWon || 0}`} />
        </div>
      </div>
    </MainLayout>
  );
}
