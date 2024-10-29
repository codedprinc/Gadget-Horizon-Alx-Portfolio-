import React from 'react'
import Navbar from '../components/Navbar';
import Article from '../components/Article';
import Dropdowns from '../components/Dropdowns';
import Footer from '../components/Footer';
const AboutUs = () => {
    return (
        <div className='flex flex-col min-h-screen'>
            <Navbar></Navbar>
            <div className='mb-auto'>
                <div className="flex flex-col items-center bg-gray-50 p-6">
                    <div className="max-w-4xl text-center">
                        <h1 className="text-4xl font-bold text-blue-600 mb-4">About Gadget Horizon</h1>
                        <p className="text-lg text-gray-700 leading-relaxed mb-6">
                            Gadget Horizon is a Nairobi-based online store dedicated to providing top-quality gadgets to the Kenyan market.
                            We specialize in the latest smartphones, audio devices, and other tech accessories, making it easy for our
                            customers to stay connected and enjoy their digital lifestyle. Our mission is to bring global technology trends to
                            Kenya while offering the best in local customer support and service.
                        </p>
                        <p className="text-lg text-gray-700 leading-relaxed">
                            Since our founding, Gadget Horizon has been committed to offering quality gadgets at affordable prices,
                            with a focus on customer satisfaction. We believe that everyone deserves access to the latest technology,
                            and we’re here to make that possible for all Kenyans. Join us as we continue to innovate and lead in
                            Kenya's tech retail landscape.
                        </p>
                    </div>
                    <div className="mt-8">
                        <img src="../assets/Gadget Horizon logo.png" alt="Gadget Horizon" className="rounded-lg shadow-lg" />
                    </div>
                </div>
            </div>
            <Footer></Footer>
        </div>
    )
}

export default AboutUs