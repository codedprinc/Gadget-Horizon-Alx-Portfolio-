import React, { useState, useEffect } from 'react';
import { Routes, Route } from 'react-router-dom';
import Home from './pages/Home';
import LoginPage from './pages/LoginPage';
import AboutUs from './pages/AboutUs';
import Loading from './components/Loading';
import { AuthProvider } from './context/AuthContext';

const App = () => {
  const [isLoading, setIsLoading] = useState(true);

  // Use useEffect to set a loading timeout only on the initial render
  // useEffect(() => {
  //   const timer = setTimeout(() => {
  //     setIsLoading(false);
  //   }, 2000);

  //   // Cleanup timer if the component unmounts before the timeout completes
  //   return () => clearTimeout(timer);
  // }, []);

  return (
    <>
    <AuthProvider>
      {/* {isLoading ? (
        <div className="w-full mt-8 pt-8 flex flex-col justify-center items-center">
          <div className='mb-3 rounded-lg border'>
          <img src="../assets/Gadget Horizon logo.png" alt="logo" />
          </div>
          <Loading />
        </div>
      ) : ( */}
        <Routes>
          <Route path='/home' element={<Home />} />
          <Route path='/login' element={<LoginPage />} />
          <Route path='/about-us' element={<AboutUs />} />
        </Routes>
      {/* )} */}
      </AuthProvider>
    </>
  );
};

export default App;
