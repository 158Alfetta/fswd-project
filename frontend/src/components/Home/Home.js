const Home = () => {
    return (
    <>

    {/* HEADER IN LANDING PAGE */}

    <div className="text-gray-700 body-font">
        <div className="container flex flex-col px-5 py-12 mx-auto lg:items-center">
            <div className="flex flex-col w-full mb-7 text-left lg:text-center">
                <h2 className="mb-1 text-xs font-semibold tracking-widest text-yellow-900 uppercase title-font">
                    WELCOME TO
                </h2>
                <h1 className="mb-6 text-2xl font-semibold tracking-tighter text-black sm:text-5xl title-font">
                    N E T T Y'S GARDEN
                </h1>
                <p className="mx-auto text-base font-medium leading-relaxed text-gray-700 lg:w-2/3">
                    If you are about to find a finest plant for your place, check this out!
                </p>
            </div>
            <div className="flex lg:justify-center">
                <button
                    className="inline-flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-yellow-900 border rounded-lg shadow-xl hover:border-gray-600 hover:bg-gray-600 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">EXPLORE SHOP</button>
            </div>
        </div>
    </div>

    {/* two of boxes */}

    <div className="m-4 mt-0">
        <div className="md:flex mt-8 md:-mx-4">
            <div className="w-full h-64 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:w-1/2" style={{backgroundImage: `url('/img/homepage_lb_2.jpg')`}}>
                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                    <h2 className="text-2xl text-white font-serif font-bold">Plants</h2>
                        <p className="mt-2 text-gray-200">Green plants obtain most of their energy from sunlight via photosynthesis by primary chloroplasts that are derived from endosymbiosis with cyanobacteria.</p>
                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                            <span>Shop Now</span>
                            <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
            <div className="w-full h-64 mt-8 md:mx-4 rounded-md overflow-hidden bg-cover bg-center md:mt-0 md:w-1/2" style={{backgroundImage: `url('/img/homepage_rb_2.jpg')`}}>
                <div className="bg-gray-900 bg-opacity-50 flex items-center h-full">
                    <div className="px-10 max-w-xl">
                        <h2 className="text-2xl text-white font-serif font-bold">Flower</h2>
                        <p className="mt-2 text-gray-200">A flower, sometimes known as a bloom or blossom, is the reproductive structure found in flowering plants.</p>
                        <button className="flex items-center mt-4 text-white text-sm uppercase font-medium rounded hover:underline focus:outline-none">
                            <span>Shop Now</span>
                            <svg className="h-5 w-5 mx-2" fill="none" stroke-linecap="round" stroke-linejoin="round" stroke-width="2" viewBox="0 0 24 24" stroke="currentColor"><path d="M17 8l4 4m0 0l-4 4m4-4H3"></path></svg>
                        </button>
                    </div>
                </div>
            </div>
        </div>
    </div>
    
    {/* <img src={'/img/homepage_lb_2.jpg'}/> */}

    </>
    )}

export default Home