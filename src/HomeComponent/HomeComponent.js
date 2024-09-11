import React, { useEffect, useState } from "react";
import axios from "axios";

const Home = () => {
    const [data, setData] = useState([]);

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

    return (
        <>
            <section className="bg-gray-200 p-5">
                <div className="container mx-auto my-12">
                    <h1 className="text-xl font-bold">Find your data that you need!</h1>
                </div>
                <div className="container mx-auto flex-wrap flex gap-x-10 items-center justify-center">
                    {data.map((item) => (
                        <div key={item.id} className="mb-10 h-72 flex max-w-xl bg-white shadow-lg rounded-lg overflow-hidden">
                            <img
                                src={item.image_url}
                                alt={item.name}
                                className="w-1/3 bg-cover bg-center"
                            />
                            <div className="w-2/3 p-4">
                                <h1 className="text-gray-900 font-bold text-2xl">{item.name}</h1>
                                <small>{item.release_year}</small>
                                <div className="mt-2 text-gray-600 text-sm overflow-y-auto h-24">
                                    {item.description}
                                </div>
                                <div className="item-center mt-2 text-gray-500">
                                    <span>{item.category}</span>
                                    <span>, {item.size} MB</span>
                                    <span>, {item.is_android_app === 1 ? "Android" : ""} {item.is_ios_app === 1 ? "iOS" : ""}</span>
                                </div>
                                <div className="flex item-center justify-between mt-3">
                                    <h1 className="text-gray-700 font-bold text-xl">
                                        {item.price === 0 ? "FREE" : `Rp ${item.price}`}
                                    </h1>
                                    <button className="px-3 py-2 bg-gray-800 text-white text-xs font-bold uppercase rounded">
                                        {item.rating} Ratings
                                    </button>
                                </div>
                            </div>
                        </div>
                    ))}
                </div>
            </section>
        </>
    );
};

export default Home;