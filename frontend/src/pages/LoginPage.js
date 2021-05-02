import { useQuery } from "@apollo/client";
import { Fragment, useMemo, useState } from "react";

import LoginForm from "../components/Login/LoginForm";
import AddressForm from "../components/Login/AddressForm";
import { useSession } from "../contexts/SessionContext";
import { CUSTOMER_QUERY } from "../graphql/meQuery";

const LoginPage = () => {
  const { loading, user, logout: handleLogout } = useSession();
  const { data: CustomerData } = useQuery(CUSTOMER_QUERY);

  const [address, setAddress] = useState({
    name: "",
    telephone: "",
    street: "",
    district: "",
    postal: "",
    province: "",
  });

  const userBox = useMemo(() => {
    if (loading) {
      return <span className="Navbar-user">Loading ...</span>;
    }
    if (user) {
      return (
        <Fragment>
        
            <div className="flex flex-col justify-center">
              <div class="rounded rounded-t-lg overflow-hidden shadow max-w-xs my-3 bg-white">
                <img
                  src="https://treerevolution.in/wp-content/uploads/2019/06/oak-tree-sunset-iStock-477164218.jpg"
                  class="w-56"
                />
                <div class="flex justify-center -mt-8">
                  <img
                    src="https://www.linkmansioncm.com/wp-content/uploads/2019/06/user-icon.jpg"
                    className="w-20 rounded-full border-solid border-white border-2 -mt-3"
                  />
                </div>
                <div class="text-center px-3 pb-6 pt-2">
                  <h3 class="text-black text-sm bold font-sans">
                    {CustomerData?.customerInfo?.firstName +
                      " " +
                      CustomerData?.customerInfo?.lastName}
                  </h3>
                  <p class="mt-2 font-sans font-light text-grey-dark">
                    {user?.type}
                  </p>
                </div>
                <div class="flex justify-center pb-3 text-grey-dark">
                <button
                  className="mx-auto bg-red-500 hover:bg-red-700 text-gray-50 py-1 px-4 border border-gray-400 rounded-lg"
                  type="button"
                  onClick={handleLogout}
                >
                  Logout
                </button>
                </div>
              </div>
            </div>

            <div className="col-span-3 p-3">
              <AddressForm address={address} setAddress={setAddress} />
            </div>
        </Fragment>
      );
    }
    return <LoginForm />;
  }, [handleLogout, loading, user, address, setAddress]);

  return (
    <div className="min-h-screen bg-gray-100">
      <div className="flex justify-center items-center p-4">{userBox}</div>
    </div>
  );
};

export default LoginPage;
