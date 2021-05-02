const Home = () => {
  return (
    <>
      <div className="h-screen w-screen">
        {/* Landing Section */}

        <div className="grid grid-cols-12 md:h-2/5 h-full pl-1">
          <div className="col-span-12 p-10 md:col-span-5">
            <div className="flex flex-col justify-center h-full ">
              <h2 className="text-xs font-semibold tracking-widest text-yellow-900 uppercase title-font">
                WELCOME TO
              </h2>
              <h1 className="mt-2 text-5xl font-semibold title-font">
                N E T T Y'S GARDEN
              </h1>
              <p className="mt-3">
                If you are about to find a finest plant for your place, check
                this out!
              </p>
              <div className="mt-3">
                <button className="inline-flex items-center px-6 py-2 font-semibold text-white transition duration-500 ease-in-out transform bg-yellow-900 border rounded-lg shadow-xl hover:border-gray-600 hover:bg-gray-600 hover:text-white focus:shadow-outline focus:outline-none focus:ring-2 ring-offset-current ring-offset-2">EXPLORE SHOP</button>
              </div>
            </div>
          </div>
          <div className="col-span-12 md:col-span-7">
            <div
              className="h-full bg-cover bg-center"
              style={{ backgroundImage: `url('/img/homepage_promotion_1.jpg')` }}
            >
            </div>
          </div>
        </div>

        {/* Next Section */}

        <div className="grid grid-cols-10 gap-6 px-10 mt-7">
          {/* Box 1 */}
          <div className="col-span-10 md:col-span-5">
            <div className="w-full h-64 ">
              <div
                className="h-full rounded-xl text-white bg-cover bg-center bg-opacity-50"
                style={{ backgroundImage: `url('/img/homepage_lb_2.jpg')` }}
              >
                <div className="bg-gray-900 bg-opacity-60 h-full p-5 rounded-xl">
                  <h2 className="font-semibold font-serif text-2xl mt-3">
                    Plant
                  </h2>
                  <p className="mt-2 text-lg">
                    Green plants obtain most of their energy from sunlight via
                    photosynthesis by primary chloroplasts that are derived from
                    endosymbiosis with cyanobacteria.
                  </p>
                  <button className="flex items-center mt-4 text-white text-sm uppercase font-medium p-2 pl-0 hover:underline focus:outline-none">
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Box 2 */}
          <div className="col-span-10 md:col-span-5">
            <div className="w-full h-64 ">
              <div
                className="h-full rounded-xl text-white bg-cover bg-center bg-opacity-50"
                style={{ backgroundImage: `url('/img/homepage_rb_2.jpg')` }}
              >
                <div className="bg-gray-900 bg-opacity-60 h-full p-5 rounded-xl">
                  <h2 className="font-semibold font-serif text-2xl mt-3 ">
                    Flowers
                  </h2>
                  <p className="mt-2 text-lg">
                    A flower, sometimes known as a bloom or blossom, is the
                    reproductive structure found in flowering plants.
                  </p>
                  <button className="flex items-center mt-4 text-white text-sm uppercase font-medium p-2 pl-0 hover:underline focus:outline-none">
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/* Box 3 */}

          <div className="col-span-10 md:col-span-5">
            <div className="w-full h-64">
              <div
                className="h-full rounded-xl text-white bg-cover bg-center bg-opacity-50"
                style={{ backgroundImage: `url('/img/homepage_lb_3.jpg')` }}
              >
                <div className="bg-gray-900 bg-opacity-60 h-full p-5 rounded-xl">
                  <h2 className="font-semibold font-serif text-2xl mt-3 ">
                    Gardening
                  </h2>
                  <p className="mt-2 text-lg">
                    Time to cultivate some happiness this summer. This range of
                    gardening products has all you need to decorate your living
                    space with plant pots and plants, both inside and out.
                  </p>
                  <button className="flex items-center mt-4 text-white text-sm uppercase font-medium p-2 pl-0 hover:underline focus:outline-none">
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

          {/*Box 4 */}

          <div className="col-span-10 md:col-span-5">
            <div className="w-full h-64 ">
              <div
                className="h-full rounded-xl text-white bg-cover bg-center bg-opacity-50"
                style={{ backgroundImage: `url('/img/homepage_rb_3.jpg')` }}
              >
                <div className="bg-gray-900 bg-opacity-60 h-full p-5 rounded-xl">
                  <h2 className="font-semibold font-serif text-2xl mt-3 ">
                    Fertilizer
                  </h2>
                  <p className="mt-2 text-lg">
                    Material of natural or synthetic origin that is applied to
                    soil or to plant tissues to supply yours plant nutrients.
                  </p>
                  <button className="flex items-center mt-4 text-white text-sm uppercase font-medium p-2 pl-0 hover:underline focus:outline-none">
                    <span>Shop Now</span>
                    <svg
                      className="h-5 w-5 mx-2"
                      fill="none"
                      strokeLinecap="round"
                      strokeLinejoin="round"
                      strokeWidth="2"
                      viewBox="0 0 24 24"
                      stroke="currentColor"
                    >
                      <path d="M17 8l4 4m0 0l-4 4m4-4H3"></path>
                    </svg>
                  </button>
                </div>
              </div>
            </div>
          </div>

        </div>

                {/* Footer */}

        <div className="col-span-10 h-36 w-full mt-16 bg-yellow-800 bg-opacity-80 ">
          <p className="flex justify-center pt-20 text-white ">2021 Netty's TM, Project on Full-Stack Web Developer Content</p>
        </div>
      </div>
    </>
  );
};

export default Home;
