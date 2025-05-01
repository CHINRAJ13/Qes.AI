import { FaRegBell } from "react-icons/fa";
import { GoHome } from "react-icons/go";
import { IoExitOutline } from "react-icons/io5";
import { useDispatch, useSelector } from "react-redux";
import { Link, useNavigate } from "react-router-dom";
import { logoutUser } from "../action/userAction";

export default function BreadCrumbs() {
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogout = () => {
        dispatch(logoutUser())
        navigate('/login')
    }
    return (
        <>
            <div className="flex justify-between">
                <div>
                    <p className="flex text-sm text-gray-400 font-bold gap-2"><GoHome size={20} />
                        <Link to={'/'}>Home Page </Link> / <Link> Sample Project </Link>  / <Link className="text-[#6806bd]"> Add your Podcast </Link>
                    </p>
                </div>
                <div className="flex gap-4">
                    <FaRegBell size={30} className="border-1 border-gray-400 bg-white p-1 rounded-full" />
                    <IoExitOutline size={30} onClick={handleLogout} className="border-1 border-gray-400 bg-white p-1 rounded-full text-red-500 hover:cursor-pointer" />
                </div>
            </div>
        </>
    )
}