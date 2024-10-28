import React, { useEffect, useState , Suspense  } from 'react';
import Navbar from '../components/Navbar';
// import Article from '../components/Article';
import Dropdowns from '../components/Dropdowns';
import Footer from '../components/Footer';
import Loading from '../components/Loading';

const Article = React.lazy(() => import('../components/Article'));

const Home = () => {
    return (
        <div className="flex flex-col min-h-screen">
            <header>
                <Navbar />
            </header>
            <body className="flex-1 py-5 px-1 mb-auto">
                <section className="mb-4">
                    <div className="max-w-7xl flex-1 mx-auto p-4 mt-6">
                        <div className="rounded-xl p-8 bg-gray-100">
                            <div className="flex items-center justify-between">
                                <div className="space-y-4">
                                    <h2 className="text-3xl font-bold">Special Offer</h2>
                                    <p className="text-xl">Get Up to 50% Off<br />On Selected Gadgets</p>
                                    <button className="bg-blue-600 text-white px-6 py-2 rounded-lg hover:bg-blue-700">
                                        Shop Now
                                    </button>
                                </div>
                                <img
                                    src="../assets/Gadget Horizon logo.png"
                                    alt="Featured Product"
                                    className="rounded-lg"
                                />
                            </div>
                        </div>
                    </div>

                </section>
                <section className="mb-4">
                    <Dropdowns />
                </section>
                <section className='flex flex-row flex-wrap justify-center w-full mb-4'>
                    <h6 className='text-3xl font-bold w-full ml-10 my-[0.67em] '> Phones for you</h6>
                    <Suspense fallback={<Loading />}>
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    <Article />
                    </Suspense>
                    

                </section>
            </body>
            <footer>
                <Footer ></Footer>
            </footer>
        </div >
    )

};

export default Home