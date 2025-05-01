import { FaRegBell } from "react-icons/fa";
import { IoSettingsOutline } from "react-icons/io5";
import { IoIosAddCircle } from "react-icons/io";
import { useEffect, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useDispatch, useSelector } from "react-redux";
import { createProject } from "../action/projectAction";
import Loading from "../components/Loading";
import dayjs from 'dayjs';
import relativeTime from 'dayjs/plugin/relativeTime';
import isSameOrAfter from 'dayjs/plugin/isSameOrAfter';
dayjs.extend(relativeTime);
dayjs.extend(isSameOrAfter);


export default function Home() {
    const [title, setTitle] = useState('');
    const [isOpen, setIsOpen] = useState(false);
    const [projects, setProjects] = useState([]);
    const navigate = useNavigate();
    const { user, loading } = useSelector(state => state.userState)
    const dispatch = useDispatch();

    const handleCreateProject = () => {
        try {
            if (title != '' && title.trim()) {
                dispatch(createProject({ title }));
                setIsOpen(false)
                setTitle('');
            }
        } catch (error) {
            console.log(error)
        }
    }

    const handleProjectNavigate = (id) => {
        try {
            navigate(`/upload/${id}`)
        } catch (error) {
            console.log(error)
        }
    }

    useEffect(() => {
        if (user) {
            setProjects(user.projects);
        }
    }, [user]);

    if (loading) return <Loading />
    return (
        <>
            <nav className="flex justify-between mx-20 mt-10">
                <img src="./pingLogo.png" className="w-[268px] h-[57px]" alt="" />
                <div className="flex gap-5">
                    <IoSettingsOutline size={30} />
                    <FaRegBell size={30} />
                </div>
            </nav>

            {projects?.length == 0 ?
                <div className="flex flex-col items-center gap-10">
                    <h1 className="text-4xl font-bold text-[#6806bd]">Create a New Project</h1>
                    <img src="./homeImage.png" className="h-[270.9px] w-[422.49px]" alt="" />
                    <p className="w-4xl text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod cum nobis tenetur, nisi sequi inventore consequatur molestias neque reprehenderit corporis
                        culpa pariatur quos ipsa provident laudantium, placeat laboriosam accusamus obcaecati quo, dolor modi voluptatibus unde porro! Esse velit consequuntur voluptate illo, debitis
                        nulla molestiae numquam facere at laboriosam a.</p>

                    <button
                        className="flex gap-1 text-lg bg-[#33015e] text-white py-2 px-3 rounded"
                        onClick={() => setIsOpen(true)}
                    >
                        <IoIosAddCircle size={30} />
                        Create New Project
                    </button>
                </div> :
                <div className="mx-20 mt-10">
                    <div className="flex justify-between">
                        <h1 className="text-4xl font-bold text-[#6806bd]">Projects</h1>
                        <button
                            className="flex gap-1 text-lg bg-[#33015e] text-white py-2 px-3 rounded"
                            onClick={() => setIsOpen(true)}
                        >
                            <IoIosAddCircle size={30} />
                            Create New Project
                        </button>
                    </div>

                    <div className="grid grid-cols-4 mt-5 gap-5">
                        {projects?.map((project) =>
                            <div key={project._id} className="grid grid-cols-2 border-2 border-gray-400 rounded-lg gap-5 hover:cursor-pointer" onClick={() => handleProjectNavigate(project._id)}>
                                <div className="bg-amber-400 rounded m-1 py-4">
                                    <h1 className="text-6xl text-center font-bold text-white">
                                        {project.title?.split(" ").map(word => word.charAt(0)).join("").toUpperCase()}
                                    </h1>
                                </div>
                                <div>
                                    <h2 className="text-lg font-bold text-[#6806bd]">{project.title}</h2>
                                    <p className="text-sm">{project.posts?.length} file(s)</p>
                                    {(() => {
                                        const updatedAt = dayjs(project.updatedAt); // Make sure this key exists
                                        const oneWeekAgo = dayjs().subtract(7, 'day');
                                        const displayTime = updatedAt.isAfter(oneWeekAgo)
                                            ? updatedAt.fromNow()
                                            : updatedAt.format('MMMM D, YYYY h:mm A');

                                        return (
                                            <p className="text-sm mt-5 text-gray-400">Last edited: {displayTime}</p>
                                        );
                                    })()}
                                </div>
                            </div>)}
                    </div>
                </div>
            }

            {/* Home Section - No project created */}
            {/* <div className="flex flex-col items-center gap-10">
                <h1 className="text-4xl font-bold text-[#6806bd]">Create a New Project</h1>
                <img src="./homeImage.png" className="h-[270.9px] w-[422.49px]" alt="" />
                <p className="w-4xl text-center">Lorem ipsum dolor sit, amet consectetur adipisicing elit. Optio quod cum nobis tenetur, nisi sequi inventore consequatur molestias neque reprehenderit corporis
                    culpa pariatur quos ipsa provident laudantium, placeat laboriosam accusamus obcaecati quo, dolor modi voluptatibus unde porro! Esse velit consequuntur voluptate illo, debitis
                    nulla molestiae numquam facere at laboriosam a.</p>

                <button
                    className="flex gap-1 text-lg bg-[#33015e] text-white py-2 px-3 rounded"
                    onClick={() => setIsOpen(true)}
                >
                    <IoIosAddCircle size={30} />
                    Create New Project
                </button>
            </div> */}

            {/* Home Section - Project created */}
            {/* <div className="mx-20 mt-10">
                <div className="flex justify-between">
                    <h1 className="text-4xl font-bold text-[#6806bd]">Projects</h1>
                    <button
                        className="flex gap-1 text-lg bg-[#33015e] text-white py-2 px-3 rounded"
                        onClick={() => setIsOpen(true)}
                    >
                        <IoIosAddCircle size={30} />
                        Create New Project
                    </button>
                </div>

                <div className="grid grid-cols-4 mt-5 gap-5">
                    <div className="grid grid-cols-2 border-2 border-gray-400 rounded-lg gap-5" onClick={() => navigate('/upload')}>
                        <div className="bg-amber-400 rounded m-1 py-4">
                            <h1 className="text-6xl text-center font-bold text-white">SP</h1>
                        </div>
                        <div>
                            <h2 className="text-lg font-bold text-[#6806bd]">Sample Project</h2>
                            <p className="text-sm">4 files</p>
                            <p className="text-sm mt-5 text-gray-400">Last edited a week ago</p>
                        </div>
                    </div>
                </div>
            </div> */}

            {/* Modal  */}
            {isOpen && (
                <div className="fixed inset-0 bg-black/30 backdrop-blur-sm flex items-center justify-center z-50">
                    <div className="bg-white p-6 rounded-lg shadow-lg w-xl relative">
                        <h2 className="text-xl font-bold mb-4">Create Project</h2>
                        <p className="mb-4">Enter Project Name:</p>
                        <input
                            className="mb-3 w-full bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c6c6c6]"
                            type="text"
                            onChange={(e) => setTitle(e.target.value)}
                        />
                        <div className="flex justify-end gap-3">

                            <button
                                onClick={() => setIsOpen(false)}
                                className="mt-4 text-red-500 font-bold p-2 rounded"
                            >
                                Cancel
                            </button>
                            <button
                                className="mt-4 bg-[#6806bd] text-white font-bold p-2 rounded"
                                onClick={handleCreateProject}
                            >
                                Create
                            </button>
                        </div>
                    </div>
                </div>
            )}
        </>
    )
}