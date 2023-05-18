import { useState, useEffect } from "react";

export default function MenuContainer(){
    const allCategories = ["Seafood", "Salad", "Dessert", "Drink", "Western", "Mexican", "Asian", "Fast Food", "Italian", "Vegan"];
    const [categories, setCategories] = useState(allCategories.slice(0, 5));
    const [viewMore, setViewMore] = useState(false);
    const menu = ["Item 1", "Item 2", "Item 3", "Item 4", "Item 5"];
    // const [menu, setMenu] = useState([]);

    const handleViewMore = () => {
        setCategories(allCategories);
        setViewMore(true);
    }
    
    useEffect(() => {
        fetch('https://example.com/api/categories')
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setCategories(data);
            })
            .catch((error) => {
                console.error(error);
            });

        fetch('MENU_URL')
            .then((response) => {
                if (!response.ok) {
                throw new Error('Network response was not ok');
                }
                return response.json();
            })
            .then((data) => {
                setMenu(data);
            })
            .catch((error) => {
                console.error('There has been a problem with your fetch operation:', error);
            });
    }, []);


    return (
        <div className="min-h-screen px-20 py-10">
            <div className="grid grid-cols-3 gap-1">
                <div className="col-span-1 w-full max-w-md p-4 bg-stone-200 border border-gray-200 rounded-lg shadow sm:p-8  dark:border-gray-700">
                    <div className="flex items-center justify-between mb-4">
                        <h5 className="text-3xl font-bold leading-none text-gray-900">Categories</h5>
                        {!viewMore && <button onClick={handleViewMore} className="text-sm font-medium text-blue-600 hover:no-underline dark:text-blue-500">View more</button>}
                    </div>
                    <div className="flow-root">
                        <ul role="list">
                            {categories.map((category, index) => (
                                <li key={index} className="py-3 sm:py-4">
                                    <div className="flex items-center space-x-4">
                                        <div className="flex-1 min-w-0">
                                            <p className="text-sm font-medium text-gray-900 truncate">
                                                {category}
                                            </p>
                                        </div>
                                    </div>
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
                <div className="col-span-2">
                    <h1 className="text-2xl text-black font-semibold">Popular Menu</h1>
                    <div>
                        <ul className="grid grid-cols-4">
                            {menu.map((menuItem, index) => (
                                <li key={index}>
                                    {menuItem}
                                </li>
                            ))}
                        </ul>
                    </div>
                </div>
            </div>
        </div>
    );
}