// import React, { useState } from 'react'
// import axios from 'axios';
// import Navbar from '../components/Navbar';
// import Footer from '../components/Footer';
// const LoginPage = () => {
//     const [isLogin, setIsLogin] = useState(true);
//     const [formData, setFormData] = useState({
//         email: '',
//         password: '',
//         firstName: '',
//         lastName: '',
//     });
//     const handInputChange = (e) => {
//         setFormData({ ...formData, [e.target.lastName]: e.target.value });
//     };

//     const handleSubmit = async (e) => {
//         e.preventDefault();

//         try {
//             const response = await axios.post(`http://localhost:5555/api/${isLogin ? 'users/login' : 'users/register'}`, formData, {
//                 headers: {
//                     'Content-Type': 'application/json'
//                 }
//             });

//             localStorage.setItem('userToken', response.data.token)

//             window.location.href = "/client/src/pages/Home.jsx";

//         } catch (error) {
//             console.error('Error:', error.response.data);
//         }
//     }

//     return (
//         <div className='flex flex-col h-screen justify-center '>
//             <header>
//                 <Navbar />
//             </header>
//             <body className='mb-auto'>
//                 <div>
//                     <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
//                         <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
//                         <form onSubmit={handleSubmit}>
//                             {!isLogin && (
//                                 <>
//                                     <div className="mb-4">
//                                         <label htmlFor="firstName" className="block font-medium mb-2">
//                                             First Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="firstName"
//                                             name="firstName"
//                                             value={formData.firstName}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
//                                             required
//                                         />
//                                     </div>
//                                     <div className="mb-4">
//                                         <label htmlFor="lastName" className="block font-medium mb-2">
//                                             Last Name
//                                         </label>
//                                         <input
//                                             type="text"
//                                             id="lastName"
//                                             name="lastName"
//                                             value={formData.lastName}
//                                             onChange={handleInputChange}
//                                             className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
//                                             required
//                                         />
//                                     </div>
//                                 </>
//                             )}
//                             <div className="mb-4">
//                                 <label htmlFor="email" className="block font-medium mb-2">
//                                     Email
//                                 </label>
//                                 <input
//                                     type="email"
//                                     id="email"
//                                     name="email"
//                                     value={formData.email}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
//                                     required
//                                 />
//                             </div>
//                             <div className="mb-4">
//                                 <label htmlFor="password" className="block font-medium mb-2">
//                                     Password
//                                 </label>
//                                 <input
//                                     type="password"
//                                     id="password"
//                                     name="password"
//                                     value={formData.password}
//                                     onChange={handleInputChange}
//                                     className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
//                                     required
//                                 />
//                             </div>
//                             <button
//                                 type="submit"
//                                 className="w-full bg-[#1B4332] text-white py-2 px-4 rounded-md hover:bg-[#2A5941] focus:outline-none focus:ring focus:ring-[#1B4332]"
//                             >
//                                 {isLogin ? 'Login' : 'Register'}
//                             </button>
//                         </form>
//                         <div className="mt-4 text-center">
//                             <button
//                                 type="button"
//                                 onClick={() => setIsLogin(!isLogin)}
//                                 className="text-[#1B4332] hover:underline focus:outline-none"
//                             >
//                                 {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
//                             </button>
//                         </div>
//                     </div>

//                 </div>
//             </body>
//             <footer >
//                 <Footer></Footer>
//             </footer>
//         </div>
//     )
// }

// export default LoginPage

import React, { useState } from 'react'
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

const LoginPage = () => {
    const [isLogin, setIsLogin] = useState(true);
    const [formData, setFormData] = useState({
        email: '',
        password: '',
        firstName: '',
        lastName: '',
    });

    // Fixed function name and property accessor
    const handleInputChange = (e) => {
        setFormData({ ...formData, [e.target.name]: e.target.value });
    };

    const handleSubmit = async (e) => {
        e.preventDefault();

        try {
            const response = await axios.post(
                `http://localhost:5555/api/${isLogin ? 'users/login' : 'users/register'}`,
                formData,
                {
                    headers: {
                        'Content-Type': 'application/json'
                    }
                }
            );

            localStorage.setItem('userToken', response.data.token);
            
            // Fixed redirect URL - should be a route path, not a file path
            window.location.href = "/";

        } catch (error) {
            console.error('Error:', error.response?.data || error.message);
        }
    }

    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar />
            
            {/* Changed body tag to div and added proper centering classes */}
            <div className='flex-grow flex items-center justify-center px-4'>
                <div className="bg-white p-8 rounded-lg shadow w-full max-w-md">
                    <h2 className="text-2xl font-bold mb-4">{isLogin ? 'Login' : 'Register'}</h2>
                    <form onSubmit={handleSubmit}>
                        {!isLogin && (
                            <>
                                <div className="mb-4">
                                    <label htmlFor="firstName" className="block font-medium mb-2">
                                        First Name
                                    </label>
                                    <input
                                        type="text"
                                        id="firstName"
                                        name="firstName"
                                        value={formData.firstName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
                                        required
                                    />
                                </div>
                                <div className="mb-4">
                                    <label htmlFor="lastName" className="block font-medium mb-2">
                                        Last Name
                                    </label>
                                    <input
                                        type="text"
                                        id="lastName"
                                        name="lastName"
                                        value={formData.lastName}
                                        onChange={handleInputChange}
                                        className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
                                        required
                                    />
                                </div>
                            </>
                        )}
                        <div className="mb-4">
                            <label htmlFor="email" className="block font-medium mb-2">
                                Email
                            </label>
                            <input
                                type="email"
                                id="email"
                                name="email"
                                value={formData.email}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
                                required
                            />
                        </div>
                        <div className="mb-4">
                            <label htmlFor="password" className="block font-medium mb-2">
                                Password
                            </label>
                            <input
                                type="password"
                                id="password"
                                name="password"
                                value={formData.password}
                                onChange={handleInputChange}
                                className="w-full border border-gray-300 p-2 rounded-md focus:outline-none focus:ring focus:ring-[#1B4332]"
                                required
                            />
                        </div>
                        <button
                            type="submit"
                            className="w-full bg-[#1B4332] text-white py-2 px-4 rounded-md hover:bg-[#2A5941] focus:outline-none focus:ring focus:ring-[#1B4332]"
                        >
                            {isLogin ? 'Login' : 'Register'}
                        </button>
                    </form>
                    <div className="mt-4 text-center">
                        <button
                            type="button"
                            onClick={() => setIsLogin(!isLogin)}
                            className="text-[#1B4332] hover:underline focus:outline-none"
                        >
                            {isLogin ? 'Don\'t have an account? Register' : 'Already have an account? Login'}
                        </button>
                    </div>
                </div>
            </div>
            
            <Footer />
        </div>
    )
}

export default LoginPage

