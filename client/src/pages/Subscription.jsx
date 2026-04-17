import MainLayout from "../layouts/MainLayout";
import api from "../utils/api";

export default function Subscription() {
  const token = localStorage.getItem("token");

  const subscribe = async (plan) => {
    await api.post(
      "/user/subscribe",
      {plan},
      {
        headers: {
          Authorization: `Bearer ${token}`,
        },
      },
    );
    alert("Subscribed");
  };

  return (
    <MainLayout>
      <div className="min-h-screen bg-black text-white p-10">
        <h1 className="text-4xl mb-8">Choose Plan</h1>

        <div className="flex gap-6">
          <button
            onClick={() => subscribe("monthly")}
            className="bg-blue-600 px-8 py-4 rounded"
          >
            Monthly ₹499
          </button>

          <button
            onClick={() => subscribe("yearly")}
            className="bg-green-600 px-8 py-4 rounded"
          >
            Yearly ₹4999
          </button>
        </div>
      </div>
    </MainLayout>
  );
}
