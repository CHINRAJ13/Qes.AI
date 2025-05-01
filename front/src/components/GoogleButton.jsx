import { FaGoogle } from "react-icons/fa"; // Import Google icon from react-icons

const GoogleButton = () => {
  const handleLogin = () => {
    // Handle Google login logic here (you can integrate it with Firebase, OAuth, etc.)
    console.log("Google login clicked");
  };

  return (
    <button
      onClick={handleLogin}
      className="flex items-center justify-start gap-5 w-full p-3 rounded-lg border-2 border-gray-300 bg-white hover:bg-gray-100"
    >
      <img src="../google.png" alt="" className="h-7" />
      <span className="text-lg text-gray-700 font-semibold">Sign in with Google</span>
    </button>
  );
};

export default GoogleButton;
