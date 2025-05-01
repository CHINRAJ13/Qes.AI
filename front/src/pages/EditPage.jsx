import { useEffect, useState } from "react";
import BreadCrumbs from "../components/BreadCrumbs";
import SideMenu from "../components/SideMenu";
import { FaArrowLeft } from "react-icons/fa6";
import { useDispatch, useSelector } from "react-redux";
import { useParams } from "react-router-dom";
import { getPost } from "../action/postAction";
import Loading from "../components/Loading";


export default function EditPage() {
    const [isEdit, setIsEdit] = useState(false);
    const {id} = useParams();
    const {post, loading} = useSelector(state=>state.postState)
    const dispatch = useDispatch();

    useEffect(() => {
        if(id){
            dispatch(getPost({postId: id}))
        }
    }, [dispatch, id])

    if(loading) return <Loading/>
    
    return (
        <>
            <div className="grid grid-cols-5 bg-[#f8f8f8]">
                {/* Menu bar */}
                <SideMenu />

                {/* Add Post Section */}
                <div className="col-span-4 pt-10 mx-10">
                    <BreadCrumbs />

                    <div className="flex justify-between items-center my-4">
                        <h1 className="text-4xl font-bold my-3 flex gap-2 items-center"><FaArrowLeft/> Edit Transcript</h1>
                        {!isEdit ? <div>
                            <button onClick={()=>setIsEdit(true)} className="bg-[#2f0057] text-white px-3 py-1 rounded-lg w-[120px]">Edit</button>
                        </div> :
                        <div className="flex gap-3">
                            <button onClick={()=>setIsEdit(false)} className="border border-red-500 text-red-500 hover:bg-red-500 hover:text-white px-3 py-1 rounded-lg w-[120px]">Discard</button>
                            <button onClick={()=>setIsEdit(false)} className="bg-[#2f0057] text-white px-3 py-1 rounded-lg w-[120px]">Save</button>
                        </div>}
                    </div>
                    
                    <div className="bg-white shadow-xl p-15">
                        <h2 className="text-lg text-[#6806bd] font-bold mb-4">{post?.topic}</h2>
                        <p className="text-justify">{post?.content}</p>
                    </div>
                </div>
            </div>
        </>
    )
}