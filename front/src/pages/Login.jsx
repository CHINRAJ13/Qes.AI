import { useState } from "react";
import { Link, useNavigate } from "react-router-dom"
import { useDispatch } from 'react-redux'
import { loginUser } from "../action/userAction";
import loginPic from '../../public/loginPic.png'
import GoogleButton from "../components/GoogleButton";

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('');
    const navigate = useNavigate();
    const dispatch = useDispatch();

    const handleLogin = async (e) => {
        try {
            e.preventDefault();
            dispatch(loginUser({ email, password }));
            navigate('/');
        } catch (error) {
            console.log(error)
        }
    }

    return (
        <>
            <div className="grid grid-cols-3">
                <div
                    className="col-span-2 h-[100vh] bg-cover bg-center"
                    style={{
                        background: `linear-gradient(to left, #C854FF, #3A0B63), url(${loginPic})`,
                    }}
                >
                    <img src="./queslogo.png" className="h-[57.38px] w-[270.64px] mt-[78.85px] ml-[101.33px]" alt="" />
                    <div className="ml-[101.33px] mt-15">
                        <p className="text-6xl font-[400] text-white">Your podcast <br />will no longer <br />be just a hobby. </p>
                    </div>
                    <div className="ml-[101.33px] mt-10">
                        <p className="text-white text-xl font-[400]">Supercharge Your Distribution <br />using our AI assistent!</p>
                    </div>
                </div>
                <div className="bg-gray-100 flex flex-col items-center ">
                    <div className="mt-5">
                        <img src="./logo.png" className="h-[96.2px]" alt="" />
                        <p className="mt-5 text-center text-2xl text-[#7E22CE]">Welcome to <br /><span className="font-bold">Ques.AI</span></p>
                    </div>
                    <div className="flex w-100 p-4">
                        <form
                            className="flex flex-col p-6 rounded-lg w-full"
                            onSubmit={handleLogin}
                        >
                            <input
                                type="text"
                                className="mb-4 bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c6c6c6]"
                                placeholder="Email"
                                onChange={(e) => setEmail(e.target.value)}
                            />
                            <input
                                type="password"
                                className="mb-3 bg-white border border-gray-300 rounded p-2 focus:outline-none focus:ring-2 focus:ring-[#c6c6c6]"
                                placeholder="Password"
                                onChange={(e) => setPassword(e.target.value)}
                            />
                            <div className="mb-4 flex justify-between">
                                <p className="text-sm">
                                    <input type="checkbox" />
                                    &nbsp;Remember me</p>
                                <p className="text-sm text-blue-500 hover:cursor-pointer">Forget Password?</p>
                            </div>
                            <button
                                type="submit"
                                className="bg-[#8a18ed] text-white py-2 rounded hover:opacity-90"
                            >
                                Login
                            </button>

                            <div className="flex justify-center items-center my-8 relative">
                                <span className="absolute left-1/2 transform -translate-x-1/2 bg-gray-100 px-2 text-md">or</span>
                                <div className="flex-grow border-t border-gray-300"></div>
                            </div>

                            <GoogleButton />

                            <div className="mt-4 flex justify-center">
                                <p className="text-sm">Don't have an Account? <Link className=" text-blue-500 font-bold hover:cursor-pointer" to={'/register'}> &nbsp;Create Account</Link></p>
                            </div>
                        </form>
                    </div>

                </div>
            </div>
        </>
    )
}