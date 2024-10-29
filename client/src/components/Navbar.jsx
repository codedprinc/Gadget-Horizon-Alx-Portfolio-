import React, { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { MdAddShoppingCart } from "react-icons/md";
import { Link } from 'react-router-dom';
import { useAuth } from '../context/AuthContext';

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    const { user, logout } = useAuth();
    return (

        <>
            <nav className="bg-blue-600 p-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-white font-bold text-lg">Gadget Horizon</div>

                    {/* Links - shown as a dropdown on small screens */}
                    <div className="hidden md:flex space-x-4 items-center gap-4">
                        <a href="/home" className="text-white hover:text-gray-300">Home</a>
                        <a href="/about-us" className="text-white  hover:text-gray-300">About us</a>

                    {/* </div>

                    <div className="flex items-center gap-4"> */}
                        {user ? (
                            <>
                                <div className="flex items-center gap-2">
                                    <div className="w-8 h-8 rounded-full bg-blue-500 flex items-center justify-center text-white">
                                        {user.firstName[0]}
                                    </div>
                                    <span>{user.firstName}</span>
                                </div>
                                <button
                                    onClick={logout}
                                    className="px-4 py-2 bg-red-500 text-white rounded hover:bg-red-600"
                                >
                                    Logout
                                </button>
                            </>
                        ) : (
                            <Link
                                to="/login"
                                className="px-4 py-2 bg-blue-500 text-white rounded hover:bg-blue-600  hover:text-gray-300"
                            >
                                Login
                            </Link>
                        )}

                    </div>

                    {/* Search bar
                    <div className="hidden md:hidden">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="p-2 rounded border w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div> */}

                    {/* Account and Cart icons */}
                    <div className="hidden md:flex space-x-4 text-white">
                        <Link to="/cart" className="relative">
                            {/* <span className="material-icons text-white hover:text-gray-300">shopping_cart</span> */}
                            <FaShoppingCart className="text-xl" />
                            {/* Add cart items count here when we implement cart */}
                        </Link>
                        
                        <a href="#" target="_blank" rel="noopener noreferrer"><MdAccountCircle className="text-xl" /></a>
                    </div>

                    {/* Mobile Menu Button */}
                    <button
                        className="md:hidden text-white"
                        onClick={() => setIsOpen(!isOpen)}
                    >
                        ☰
                    </button>
                </div>

                {/* Mobile Menu */}
                {isOpen && (
                    <div className="md:hidden bg-blue-500 rounded space-y-2 p-4">
                        <a href="#" className="block text-white hover:text-gray-300">Home</a>
                        <a href="#" className="block text-white hover:text-gray-300">About us</a>
                        <a href="#" className="hover:text-gray-300 text-white "><FaShoppingCart className="text-xl my-2" /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white"><MdAccountCircle className="text-xl my-2" /></a>

                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar;