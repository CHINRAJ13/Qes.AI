import { FaArrowLeft } from "react-icons/fa";
import BreadCrumbs from "../components/BreadCrumbs";
import SideMenu from "../components/SideMenu";
import { useSelector } from "react-redux";


export default function Account() {
    const { user } = useSelector(state=>state.userState);
    return (
        <>
            <div className="grid grid-cols-5 bg-[#f8f8f8]">
                {/* Menu bar */}
                <SideMenu />

                {/* Add Post Section */}
                <div className="col-span-4 pt-10 mx-10">
                    <BreadCrumbs />

                    <h1 className="text-4xl font-bold my-3 flex gap-2 items-center"><FaArrowLeft /> Account Settings</h1>

                    <div className="flex my-20">
                        <img src="./vite.svg" className="h-30 w-30 rounded-full" alt="" />
                        <div className="flex justify-around w-full">
                            <div>
                                <h1 className="text-xl font-bold mb-3">Name:</h1>
                                <p className="bg-white border border-gray-400 px-3 py-1 rounded w-md ">{user.name}</p>
                            </div>
                            <div>
                                <h1 className="text-xl font-bold mb-3">Email:</h1>
                                <p className="bg-white border border-gray-400 px-3 py-1 rounded w-md ">{user.email}</p>
                            </div>
                        </div>
                    </div>
                    <div>
                        <h1 className="text-3xl font-bold my-3 flex gap-2 items-center">Subscription</h1>
                        <div className="subcription">
                            <p>Oops! You don't have any active plans. <span>Upgrade now!</span></p>
                            <button className="bg-[#8a18ed] text-white py-1 rounded px-3">Upgrade</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}