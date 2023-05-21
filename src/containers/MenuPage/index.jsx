import { useState, useEffect } from "react";
import useLogin from "@/src/utils/useLogin";
import axios from "axios";

export default function MenuContainer(){
    const [role, setRole] = useState(null);
    const { detail } = useLogin();
    const [loading, setLoading] = useState(true); 

    const allCategories = ["Seafood", "Salad", "Dessert", "Drink", "Western", "Mexican", "Asian", "Fast Food", "Italian", "Vegan"];
    const [categories, setCategories] = useState([]);
    const [menu, setMenu] = useState([]);
    const [viewMore, setViewMore] = useState(false);
    const [selectedCategory, setSelectedCategory] = useState(null);

    const [newMenuItem, setNewMenuItem] = useState("");
    const [newMenuDescription, setNewMenuDescription] = useState("");
    const [newMenuPrice, setNewMenuPrice] = useState("");
    const [newMenuAvailability, setNewMenuAvailability] = useState(false);
    const [newCategory, setNewCategory] = useState("");

    const handleViewMore = () => {
        setCategories(allCategories);
        setViewMore(true);
    }

    const handleCreateMenu = async (event) => {
        event.preventDefault();
    
        // Create new menu object
        const newMenu = {
            name: newMenuItem,
            description: newMenuDescription,
            price: parseFloat(newMenuPrice),
            availability: newMenuAvailability,
            category: newCategory
        }
    
        const url = `http://localhost:8000/menu`;
    
        // Send newMenu to the server
        axios
            .post(url, newMenu, {
                headers: {
                    "Content-Type": "application/json",
                    "Authorization": `Bearer ${detail().token}` // Add token for authorization
                }
            })
            .then(async (res) => {
                // Update menu state
                const createdMenu = res.data;
                setMenu([...menu, createdMenu]);
    
                // Add category to categories if not already present
                if (!categories.includes(newCategory)) {
                    setCategories([...categories, newCategory]);
                }
            })
            .catch((err) => {
                console.error(err);
            });
    }
    
    useEffect(() => {
        try {
            const user = detail();
            setRole(user["role"]);
            setLoading(false);
        } catch (err) {
            console.log(err);
        }
    });

    const menuToDisplay = selectedCategory ? menu.filter(item => item.category === selectedCategory) : menu;

    if (loading) { 
        return (
            <div>Loading...</div>
        )
    }

    return (
        <div className="min-h-screen px-20 py-10">
            {role === 'Admin' &&
                <div className="col-span-3 mb-6">
                    <h1 className="flex justify-center text-2xl text-black font-semibold px-4 mx-auto max-w-2xl">Menu Management</h1>
                    <section>
                        <div class="py-8 px-4 mx-auto max-w-2xl lg:py-16">
                            <h2 class="mb-4 text-xl font-bold text-gray-900">Add a New Menu</h2>
                            <form onSubmit={handleCreateMenu}>
                                <div class="grid gap-4 sm:grid-cols-2 sm:gap-6">
                                    <div class="sm:col-span-2">
                                        <label htmlFor="name" className="block mb-2 text-sm font-medium text-gray-900 ">Menu Name</label>
                                        <input type="text" name="name" id="name" value={newMenuItem} onChange={(e) => setNewMenuItem(e.target.value)} className="bg-gray-50 border border-gray-300 text-white text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Type Menu Name" required/>
                                    </div>
                                    <div class="w-full">
                                        <label htmlFor="description" className="block mb-2 text-sm font-medium text-gray-900">Description</label>
                                        <input type="text" name="description" id="description" value={newMenuDescription} onChange={(e) => setNewMenuDescription(e.target.value)} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="Menu Description"/>
                                    </div>
                                    <div class="w-full">
                                        <label for="price" className="block mb-2 text-sm font-medium text-gray-900">Price</label>
                                        <input type="number" name="price" id="price" value={newMenuPrice} onChange={(e) => setNewMenuPrice(e.target.value)} class="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500" placeholder="20000" required/>
                                    </div>
                                    <div>
                                        <label for="category" className="block mb-2 text-sm font-medium text-gray-900">Category</label>
                                        <select value={newCategory} onChange={(e) => setNewCategory(e.target.value)} id="category" className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-500 focus:border-primary-500 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            {allCategories.map((category, index) => (
                                                <option value={category} key={index}>
                                                    {category}
                                                </option>
                                        ))}
                                        </select>
                                    </div>
                                    <div>
                                        <label htmlFor="availability" className="block mb-2 text-sm font-medium text-gray-900">Availability</label>
                                        <select name="availability" id="availability" value={newMenuAvailability} onChange={(e) => setNewMenuAvailability(e.target.value === "true")} className="bg-gray-50 border border-gray-300 text-gray-900 text-sm rounded-lg focus:ring-primary-600 focus:border-primary-600 block w-full p-2.5 dark:bg-gray-700 dark:border-gray-600 dark:placeholder-gray-400 dark:text-white dark:focus:ring-primary-500 dark:focus:border-primary-500">
                                            <option value="true">True</option>
                                            <option value="false">False</option>
                                        </select>
                                    </div> 
                                </div>
                                <button type="submit" className="inline-flex item-center my-4 text-white bg-blue-700 hover:bg-blue-800 focus:ring-4 focus:outline-none focus:ring-blue-300 font-medium rounded-lg text-sm w-full sm:w-auto px-5 py-2.5 text-center dark:bg-blue-600 dark:hover:bg-blue-700 dark:focus:ring-blue-800">
                                    Add Menu
                                </button>
                            </form>
                        </div>
                    </section>
                </div>
            }
            { role !== 'Admin' && 
                <div className="grid grid-cols-3 gap-1">
                    <div className="col-span-1 w-full max-w-md p-4 bg-stone-200 border border-gray-200 rounded-lg shadow sm:p-8 dark:border-gray-700">
                        <div className="flex items-center justify-between mb-4">
                            <h5 className="text-3xl font-bold leading-none text-gray-900">Categories</h5>
                            {!viewMore && <button onClick={handleViewMore} className="text-sm font-medium text-blue-600 hover:no-underline dark:text-blue-500">View more</button>}
                        </div>
                        <div className="flow-root">
                            <ul role="list">
                                {categories.map((category, index) => (
                                    <li key={index} className="py-3 sm:py-4 hover:bg-gray-300 hover:rounded" onClick={() => setSelectedCategory(category)}>
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
                                {menuToDisplay.map((menuItem, index) => (
                                    <li key={index} className="p-4 border border-gray-200 rounded-lg shadow sm:p-8">
                                        {menuItem.name}
                                    </li>
                                ))}
                            </ul>
                        </div>
                    </div>
                </div>
            }
        </div>
    );
}