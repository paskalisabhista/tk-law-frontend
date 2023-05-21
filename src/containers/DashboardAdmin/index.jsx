export default function DashboardAdminContainer() {
    return (
        <div className="flex h-screen">
            <div className="p-3 space-y-2 overflow-y-scroll bg-stone-300 w-64 h-full rounded">
                <h2 className="text-2xl font-semibold text-gray-800">Admin Dashboard</h2>
                <nav>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Dashboard
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Customers Users
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Kitchen Users
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Courier Users
                    </a>
                    <a href="#" className="block py-2.5 px-4 rounded transition duration-200 hover:bg-blue-400 hover:text-white">
                        Admin Users
                    </a>
                </nav>
            </div>
            <div className="flex-grow p-6">
                <h2 className="text-2xl font-semibold text-gray-800 mb-4">Welcome to the Admin Dashboard</h2>
                <div className="bg-stone-300 p-4 rounded-lg shadow">
                    Main content
                </div>
            </div>
        </div>
    );
};

