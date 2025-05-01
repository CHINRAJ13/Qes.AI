import { IoIosAdd } from "react-icons/io";
import { GoPencil, GoHome } from "react-icons/go";
import { BsCopy } from "react-icons/bs";
import { RiVipDiamondLine } from "react-icons/ri";
import { IoSettingsOutline, IoExitOutline } from "react-icons/io5";
import { FaRegBell } from "react-icons/fa";
import { Link, useNavigate, useParams } from "react-router-dom";
import { useEffect, useState } from "react";
import SideMenu from "../components/SideMenu";
import BreadCrumbs from "../components/BreadCrumbs";
import { useDispatch, useSelector } from "react-redux";
import { getProject } from "../action/projectAction";
import { addPost } from "../action/postAction";
import Loading from "../components/Loading";

export default function UploadPage() {

    const [topic, setTopic] = useState('');
    const [content, setContent] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const navigate = useNavigate();
    const { id } = useParams();
    const dispatch = useDispatch();
    const { posts, loading } = useSelector(state => state.projectState)

    const handleAddPost = async () => {
        try {

            if (id && topic != '' && content != '' && topic.trim()) {
                dispatch(addPost({ projectId: id, topic, content }))
                setContent('');
                setTopic('')
                setIsOpen(false)
            }

        } catch (error) {
            console.log(error)
        }
    }

    const formatDate = (dateStr) => {
        const date = new Date(dateStr);
        const options = { day: '2-digit', month: 'short', year: '2-digit' };
        const datePart = date.toLocaleDateString('en-GB', options); // "25 Oct 23"
        const timePart = date.toLocaleTimeString('en-GB', {
            hour: '2-digit',
            minute: '2-digit',
            hour12: false
        }); // "09:04"
        return `${datePart} | ${timePart}`;
    };

    useEffect(() => {
        if (id) {
            dispatch(getProject({ projectId: id }))
        }
    }, [dispatch, id])

    if (loading) return <Loading />

    return (
        <>
            <div className="grid grid-cols-5 bg-[#f8f8f8]">
                {/* Menu bar */}
                <SideMenu />

                {/* Add Post Section */}
                <div className="col-span-4 pt-10 mx-10">
                    <BreadCrumbs />

                    <h1 className="text-4xl font-bold my-3">Add Post</h1>

                    {/* Add Post Preview */}
                    <div className="grid grid-cols-3 gap-5 mx-5">
                        <div
                            className="bg-white flex items-center shadow-xl p-4 rounded-xl py-10 hover:cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <div>
                                <h1 className="font-bold text-lg">RSS Feed</h1>
                                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, vel.</p>
                            </div>
                            <img src="../rssLogo.png" className="h-20" alt="" />
                        </div>

                        <div
                            className="bg-white flex items-center shadow-xl p-4 rounded-xl py-10 hover:cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <div>
                                <h1 className="font-bold text-lg">Youtube Video</h1>
                                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, vel.</p>
                            </div>
                            <img src="../ytLogo.png" className="h-20" alt="" />
                        </div>

                        <div
                            className="bg-white flex items-center shadow-xl p-4 rounded-xl py-10 hover:cursor-pointer"
                            onClick={() => setIsOpen(true)}
                        >
                            <div>
                                <h1 className="font-bold text-lg">Upload Files</h1>
                                <p className="text-gray-500">Lorem ipsum dolor sit amet consectetur adipisicing elit. Placeat, vel.</p>
                            </div>
                            <img src="../uploadLogo.png" className="h-20 bg-[#ebdcf8] rounded-xl" alt="" />
                        </div>
                    </div>

                    {posts.length == 0 ?
                        <div className="bg-white shadow-2xl py-4 mx-5 rounded-xl mt-5 flex flex-col items-center">
                            <img src="../download.png" alt="" className="h-40" />
                            <h1 className="text-xl">Select a file drag or drop here(Podcast Media or Transcript Text)</h1>
                            <p className="text-sm text-gray-400 my-3">MP4, MOV, MP3, WAV, PDF, DOCX or TXT file</p>
                            <button className="text-xl px-3 py-2 mt-4 rounded-full text-[#6806bd] border-2 border-[#6806bd] hover:cursor-pointer">Select File</button>
                        </div>
                        :
                        <div className="bg-white shadow-2xl py-4 mx-5 rounded-xl mt-5 px-5">
                            <h1>Your Files</h1>
                            <table className="min-w-full bg-white rounded-lg mt-3">
                                <thead className="bg-[#f2dafd] rounded-xl">
                                    <tr>
                                        <th className="py-3 px-4 text-left">No.</th>
                                        <th className="py-3 px-4 text-left">Name</th>
                                        <th className="py-3 px-4 text-left">Update Date & Time</th>
                                        <th className="py-3 px-4 text-left">Action</th>
                                    </tr>
                                </thead>
                                <tbody>
                                    {posts.map((post, i) =>
                                        <tr className="hover:bg-gray-100" key={post._id}>
                                            <td className="py-3 px-4">{i + 1}</td>
                                            <td className="py-3 px-4">{post.topic}</td>
                                            <td className="py-3 px-4">{formatDate(post.createdAt)}</td>
                                            <td className="py-3 px-4">
                                                <button onClick={() => navigate(`/editpage/${post._id}`)}
                                                    className="px-3 py-1 border border-gray-500 text-gray-500 hover:text-white rounded-l hover:bg-gray-600"
                                                >View</button>
                                                <button className="px-3 py-1 border border-gray-500 hover:border-red-600 text-red-500 rounded-r hover:bg-red-600 hover:text-white">Delete</button>
                                            </td>
                                        </tr>
                                    )}
                                </tbody>
                            </table>

                        </div>
                    }

                    {/* Drag or Drop */}

                    {/* Tablabled the created file */}
                </div>
            </div>


            {/* Modal  */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-xl relative">
                        <button
                            onClick={() => setIsOpen(false)}
                            className="absolute top-2 right-2 text-gray-400 hover:text-gray-700 text-2xl"
                        >
                            &times;
                        </button>
                        <h2 className="flex text-3xl font-bold mb-4 gap-3">
                            <img src="./ytLogo.png" className="h-10 rounded-full" alt="" />
                            Upload from Youtube
                        </h2>
                        <p className="mb-4">Name:</p>
                        <input
                            className="mb-3 w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c6c6c6]"
                            type="text"
                            onChange={(e) => setTopic(e.target.value)}
                        />
                        <p className="mb-4">Tanscript:</p>
                        <input
                            className="mb-3 w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c6c6c6]"
                            type="text"
                            onChange={(e) => setContent(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">
                            <button
                                className="mt-4 bg-[#2b0150] text-white font-bold p-2 rounded"
                                onClick={handleAddPost}
                            >
                                Upload
                            </button>
                        </div>
                    </div>
                </div>
            )}

        </>
    )
}