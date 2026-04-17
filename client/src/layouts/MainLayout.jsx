import Navbar from "../components/Navbar";

export default function MainLayout({children}) {
  return (
    <div className="min-h-screen bg-black text-white">
      <Navbar />
      {children}
    </div>
  );
}
