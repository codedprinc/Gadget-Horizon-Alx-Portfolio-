import React, { useState } from "react";
import { FaShoppingCart } from 'react-icons/fa';
import { MdAccountCircle } from 'react-icons/md';
import { MdAddShoppingCart } from "react-icons/md";

const Navbar = () => {
    const [isOpen, setIsOpen] = useState(false);
    return (
        // <>
        //     <nav className="bg-blue-500 p-4">
        //         <div className="container mx-auto flex justify-between items-center">
        //         <div className="flex items-center space-x-4">
        //             <img src="../assets/Gadget Horizon logo.png" alt="Gadget_Horizon" width={100} height={100} />
        //             <a href="#" className="text-white font-bold text-xl">Gadget Horizon</a>

        //         </div>
        //                 <div className=" md:flex space-x-4">
        //                     <a href="#">
        //                         <select className="bg-blue-500 text-white hover:text-gray-300" name="categories" id="categories">
        //                             <option value="phones"><a href="http://" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">Phones</a></option>
        //                             <option value="audio"><a href="http://" target="_blank" rel="noopener noreferrer" className="text-white hover:text-gray-300">Audio</a></option>
        //                         </select></a>
        //                     <a href="#" className="text-white hover:text-gray-300"> Deals </a>
        //                     <a href="#" className="text-white hover:text-gray-300"> What's New </a>
        //                     <a href="#" className="text-white hover:text-gray-300"> Delivery </a>
        //                 </div>
        //                 <div className=" rounded border  md:flex space-x-4">
        //                     <search>
        //                         <form>
        //                             <input className="bg-white-500 text-white rounded border" type="text" name='search_bar' id='search_bar' placeholder=' Search ' />
        //                         </form>
        //                     </search>
        //                 </div>
        //                 <div className=" rounded border  md:flex space-x-4">
        //                     <h6> Account </h6>
        //                     <div>&#9678;</div>
        //                 </div>
        //                 <div><img src="" alt="logo/button" /><h6> Cart </h6></div>
                    
        //         </div>
        //     </nav>
        // </>
        <>
            <nav className="bg-blue-600 p-4 ">
                <div className="container mx-auto flex justify-between items-center">
                    {/* Logo */}
                    <div className="text-white font-bold text-lg">Gadget Horizon</div>

                    {/* Links - shown as a dropdown on small screens */}
                    <div className="hidden md:flex space-x-4">
                        <a href="#" className="text-white hover:text-gray-300">Home</a>
                        <a href="#" className="text-white bg-blue-500 hover:text-gray-300">About us</a>
                        
                    </div>

                    {/* Search bar */}
                    <div className="hidden md:hidden">
                        <input
                            type="text"
                            placeholder="Search Product"
                            className="p-2 rounded border w-48 focus:outline-none focus:ring-2 focus:ring-blue-400"
                        />
                    </div>

                    {/* Account and Cart icons */}
                    <div className="hidden md:flex space-x-4 text-white">
                        
                        <a href="#" className="hover:text-gray-300"><FaShoppingCart className="text-xl" /></a>
                        <a href="#" target="_blank" rel="noopener noreferrer"><MdAccountCircle className="text-xl"/></a>
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
                        <a href="#" target="_blank" rel="noopener noreferrer" className="text-white"><MdAccountCircle className="text-xl my-2"/></a>
                        
                    </div>
                )}
            </nav>
        </>
    )
}

export default Navbar;