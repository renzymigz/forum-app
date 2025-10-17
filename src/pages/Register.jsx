import { useRef, useState } from "react";
import { useNavigate, Link } from "react-router-dom";
import { registerUser } from "../utils/api";

export default function Register() {
  const newUser = useRef();
  const newPass = useRef();
  const [error, setError] = useState("");
  const navigate = useNavigate();

  const handleRegister = async () => {
  if (!newUser.current.value || !newPass.current.value) {
    setError("Enter username and password");
    return;
  }
  try {
    const res = await registerUser(
      newUser.current.value,
      newPass.current.value
    );
    console.log("REGISTER RESPONSE:", res.data);
    
    if (res.data?.id) {  
      alert("User created! Please log in.");
      navigate("/");
    } else {
      setError("Registration failed");
    }
  } catch {
    setError("Something went wrong");
  }
};


  return (
    <div className="flex flex-col items-center justify-center h-screen bg-black text-white">
        <div class = "py-5 font-semibold">
            Register with a new account
        </div>
      <div className="p-6 rounded-lg shadow-2xl shadow-[#2c2d2d] bg-[#181818]  w-80 border border-[#2c2d2d]">
        <h1 className="text-2xl font-bold mb-4 text-center">Register</h1>
        <div className="relative w-full mb-2">
          <i className="fa-solid fa-user absolute left-3 top-1/2 -translate-y-1/2 text-[#474949]"></i>
          <input
            className="w-full border p-2 pl-10 rounded placeholder:text-[#484948] border-[#2c2d2d]"
            type="text"
            placeholder="Username"
            ref={newUser}
          />
        </div>

        <div className="relative w-full mb-2">
          <i className="fa-solid fa-lock absolute left-3 top-1/2 -translate-y-1/2 text-[#474949]"></i>
          <input
            className="w-full border p-2 pl-10 rounded placeholder:text-[#484948] border-[#2c2d2d]"
            type="password"
            placeholder="Password"
            ref={newPass}
          />
        </div>
        <button
          className="w-full bg-white text-black p-2 mt-2 rounded hover:bg-gray-300 font-bold cursor-pointer"
          onClick={handleRegister}
        >
          Register
        </button>
        {error && <p className="text-red-500 mt-2 text-center">{error}</p>}
        <p className="text-sm mt-3 text-center text-[#6e6e6e]">
          Already have an account?{" "}
          <Link
            to="/"
            className="text-white font-semibold hover:underline"
          >
            Login here
          </Link>
        </p>
      </div>
    </div>
  );
}
