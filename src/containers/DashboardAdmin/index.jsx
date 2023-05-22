import { useState } from "react";

export default function DashboardAdminContainer() {
  const [tab, setTab] = useState("menu");

  return (
    <div className="flex h-screen">
      <div className="p-3 space-y-2 overflow-y-scroll bg-stone-300 w-64 h-full rounded">
        <h2 className="text-2xl font-semibold text-gray-800">
          Admin Dashboard
        </h2>
        <nav className="flex items-center">
          {["menu", "coupon"].map((tab) => (
            <button
              key={tab}
              type="button"
              className="px-2 py-1 text-[#F4ECE1] bg-[#2F2F2F] rounded-xl drop-shadow-2xl capitalize"
              onClick={() => setTab(tab)}
            >
              {tab}
            </button>
          ))}
        </nav>
      </div>

      <div className="flex-grow p-6">
        <h2 className="text-2xl font-semibold text-gray-800 mb-4">
          Welcome to the Admin Dashboard
        </h2>
        <div className="bg-stone-300 p-4 rounded-lg shadow">
          {tab === "menu" ? <></> : tab === "coupon" ? <></> : null}
        </div>
      </div>
    </div>
  );
}
