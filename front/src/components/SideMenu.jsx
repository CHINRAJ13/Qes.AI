import { BsCopy } from "react-icons/bs";
import { GoPencil } from "react-icons/go";
import { IoIosAdd } from "react-icons/io";
import { IoSettingsOutline } from "react-icons/io5";
import { RiVipDiamondLine } from "react-icons/ri";
import { useSelector } from "react-redux";
import { useNavigate } from "react-router-dom";
import Loading from "./Loading";

export default function SideMenu() {
    const navigate = useNavigate();
    const { user, loading } = useSelector(state=>state.userState);

    if(loading) return <Loading />

    return (
        <>
            {/* Menu bar */}
            <div className=" flex flex-col justify-between pt-10 bg-white h-[100vh]">
                <div>
                    <img src="../pingLogo.png" className="h-[39.57px] w-[186.67px] ms-10" alt="" />
                    <ul className="menu-bar mt-10 me-4 border-b-2 border-gray-400">
                        <li className="bg-[#deb8ff]"><IoIosAdd size={20} />Add your Podcast(s)</li>
                        <li><GoPencil /> Create & Repurpose</li>
                        <li><BsCopy /> Podcast Widget</li>
                        <li><RiVipDiamondLine />Upgrade</li>
                    </ul>
                </div>

                <div>
                    <div className="flex items-baseline border-b-2 border-gray-400">
                        <ul className="menu-bar ">
                            <li><IoSettingsOutline />Help</li>
                        </ul>
                    </div>
                    <div className="flex gap-3 ms-10 my-5 hover:cursor-pointer" onClick={() => navigate('/account')}>
                        <div>
                            <img src="../vite.svg" className="" alt="" />
                        </div>
                        <div className="">
                            <h1>{user.name}</h1>
                            <p className="text-sm">{user.email}</p>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}