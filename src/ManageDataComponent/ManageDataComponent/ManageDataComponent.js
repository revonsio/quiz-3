import React, { useState, useEffect } from "react";
import axios from "axios";

const ManageData = () => {
    const [data, setData] = useState([]);
    const [formData, setFormData] = useState({
        name: "",
        description: "",
        category: "",
        release_year: 2009,
        size: 0,
        price: 0,
        rating: 0,
        image_url: "",
        is_android_app: 0,
        is_ios_app: 0,
    });
    const [editMode, setEditMode] = useState(false);
    const [editId, setEditId] = useState(null);

    useEffect(() => {
        fetchData();
    }, []);

    const fetchData = async () => {
        try {
            const response = await axios.get("https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps");
            setData(response.data);
        } catch (error) {
            console.error("Error fetching data:", error);
        }
    };

    const handleInputChange = (e) => {
        const { name, value } = e.target;
        setFormData({
            ...formData,
            [name]: value,
        });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();
        try {
            if (editMode) {
                const response = await axios.put(`https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/${editId}`, formData);
                const updatedData = data.map((item) =>
                    item.id === editId ? response.data : item
                );
                setData(updatedData);
                setEditMode(false);
                setEditId(null);
            } else {
                const response = await axios.post("https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps", formData);
                setData([...data, response.data]);
            }

            setFormData({
                name: "",
                description: "",
                category: "",
                release_year: 2009,
                size: 0,
                price: 0,
                rating: 0,
                image_url: "",
                is_android_app: 0,
                is_ios_app: 0,
            });
        } catch (error) {
            console.error("Error saving data:", error);
        }
    };

    const handleEdit = async (id) => {
        try {
            const response = await axios.get(`https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/${id}`);
            setFormData(response.data);
            setEditId(id);
            setEditMode(true);
        } catch (error) {
            console.error("Error fetching data for edit:", error);
        }
    };

    const handleDelete = async (id) => {
        try {
            await axios.delete(`https://6678f9f40bd45250562081d9.mockapi.io/api/mobile-apps/${id}`);
            fetchData();
        } catch (error) {
            console.error("Error deleting data:", error);
        }
    };

    return (
        <div className="p-8">
            <h2 className="text-2xl font-bold mb-6">Manage Data</h2>
            <div className="shadow-lg rounded-lg overflow-hidden">
                <table className="min-w-full table-auto">
                    <thead className="bg-purple-600 text-white">
                        <tr>
                            <th className="px-4 py-2">NO</th>
                            <th className="px-4 py-2">Name</th>
                            <th className="px-4 py-2">Category</th>
                            <th className="px-4 py-2">Description</th>
                            <th className="px-4 py-2">Price</th>
                            <th className="px-4 py-2">Rating</th>
                            <th className="px-4 py-2">Release Year</th>
                            <th className="px-4 py-2">Size</th>
                            <th className="px-4 py-2">Android App</th>
                            <th className="px-4 py-2">iOS App</th>
                            <th className="px-4 py-2">Action</th>
                        </tr>
                    </thead>
                    <tbody>
                        {data.map((item, index) => (
                            <tr key={item.id} className="text-center">
                                <td className="px-4 py-2">{index + 1}</td>
                                <td className="px-4 py-2">{item.name}</td>
                                <td className="px-4 py-2">{item.category}</td>
                                <td className="px-4 py-2">{item.description}</td>
                                <td className="px-4 py-2">{item.price}</td>
                                <td className="px-4 py-2">{item.rating}</td>
                                <td className="px-4 py-2">{item.release_year}</td>
                                <td className="px-4 py-2">{item.size}</td>
                                <td className="px-4 py-2">{item.is_android_app === 1 ? "Yes" : "No"}</td>
                                <td className="px-4 py-2">{item.is_ios_app === 1 ? "Yes" : "No"}</td>
                                <td className="px-4 py-2">
                                    <div className="inline-flex space-x-2">
                                        <button
                                            className="bg-yellow-500 text-white px-4 py-1 rounded-full"
                                            onClick={() => handleEdit(item.id)}
                                        >
                                            Edit
                                        </button>
                                        <button
                                            className="bg-red-500 text-white px-4 py-1 rounded-full"
                                            onClick={() => handleDelete(item.id)}
                                        >
                                            Delete
                                        </button>
                                    </div>
                                </td>
                            </tr>
                        ))}
                    </tbody>
                </table>
            </div>

            <h2 className="text-2xl font-bold mt-10 mb-4">{editMode ? "Edit Data" : "Create Data"}</h2>
            <form onSubmit={handleSubmit} className="space-y-4">
                <div>
                    <label className="block text-lg font-semibold">Image URL:</label>
                    <input
                        type="text"
                        name="image_url"
                        value={formData.image_url}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Name:</label>
                    <input
                        type="text"
                        name="name"
                        value={formData.name}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Category:</label>
                    <input
                        type="text"
                        name="category"
                        value={formData.category}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Description:</label>
                    <textarea
                        name="description"
                        value={formData.description}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Price:</label>
                    <input
                        type="number"
                        name="price"
                        value={formData.price}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Rating:</label>
                    <input
                        type="number"
                        name="rating"
                        value={formData.rating}
                        onChange={handleInputChange}
                        min="0"
                        max="5"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Release Year:</label>
                    <input
                        type="number"
                        name="release_year"
                        value={formData.release_year}
                        onChange={handleInputChange}
                        min="2009"
                        max="2024"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Size (MB):</label>
                    <input
                        type="number"
                        name="size"
                        value={formData.size}
                        onChange={handleInputChange}
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">Android App:</label>
                    <input
                        type="number"
                        name="is_android_app"
                        value={formData.is_android_app}
                        onChange={handleInputChange}
                        min="0"
                        max="1"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <div>
                    <label className="block text-lg font-semibold">iOS App:</label>
                    <input
                        type="number"
                        name="is_ios_app"
                        value={formData.is_ios_app}
                        onChange={handleInputChange}
                        min="0"
                        max="1"
                        required
                        className="w-full px-4 py-2 border rounded-lg"
                    />
                </div>
                <button type="submit" className="bg-blue-500 text-white px-6 py-2 rounded-lg">
                    {editMode ? "Update Data" : "Submit"}
                </button>
            </form>
        </div>
    );
};

export default ManageData;
